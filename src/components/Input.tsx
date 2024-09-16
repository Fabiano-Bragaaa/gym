import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
  isReadyOnly?: boolean;
};

export function Input({ isReadyOnly = false, ...rest }: Props) {
  return (
    <GluestackInput
      h="$14"
      borderWidth="$0"
      borderRadius="$lg"
      $focus={{
        borderWidth: 1,
        borderColor: "$green500",
      }}
      isReadOnly={isReadyOnly}
      opacity={isReadyOnly ? 0.5 : 1}
    >
      <InputField
        px="$4"
        bg="$gray700"
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest}
      />
    </GluestackInput>
  );
}
