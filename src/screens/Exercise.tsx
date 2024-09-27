import { useEffect, useState } from "react";

import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  set,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";

import { ArrowLeft } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionSvg from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToatMessage";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type RoutesParamsProps = {
  id: string;
};

export function Exercise() {
  const [details, setDetails] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [submittingRegister, setSubmittingRegister] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { id } = route.params as RoutesParamsProps;

  const toast = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSubmittingRegister(true);

      await api.post("/history", { exercise_id: id });

      toast.show({
        duration: 4000,
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            title="Parabéns! Exercício registrado no seu historico."
            id={id}
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

      toast.show({
        duration: 4000,
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            title={title}
            id={id}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setSubmittingRegister(false);
    }
  }

  async function fetchExerciseDetail() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/${id}`);
      setDetails(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      toast.show({
        duration: 4000,
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            title={title}
            id={id}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetail();
  }, [id]);

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={ArrowLeft} color="$green500" size="xl" />
          </TouchableOpacity>
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            {details.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {details.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8">
            <Box rounded="$lg" mb="$3" overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${details.demo}`,
                }}
                alt="exercicio"
                resizeMode="cover"
                rounded="$lg"
                w="$full"
                h="$80"
              />
            </Box>
            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="$gray200" ml="$2">
                    {details.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionSvg />
                  <Text color="$gray200" ml="$2">
                    {details.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={submittingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
