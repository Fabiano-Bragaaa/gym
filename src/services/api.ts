import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";

import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void;

type PromiseType = {
  onSucess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.100.48:3333",
}) as APIInstanceProps;

let faildQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const InterceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              faildQueue.push({
                onSucess: (token: string) => {
                  originalRequestConfig.headers = {
                    authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("sessions/refresh-token", {
                refresh_token,
              });

              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                authorization: `Bearer ${data.token}`,
              };

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              faildQueue.forEach((request) => {
                request.onSucess(data.token);
              });

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              faildQueue.forEach((req) => {
                req.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              faildQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(InterceptTokenManager);
  };
};

export { api };
