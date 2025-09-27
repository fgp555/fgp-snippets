import React, { View, Text, Pressable } from "react-native";

export default function TailwindTestComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="bg-white rounded-2xl p-6 shadow-md w-80">
        <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
          🚀 Hola Tailwind Native
        </Text>
        <Text className="text-gray-600 mb-4 text-center">
          Si esto se ve estilizado, ¡TailwindCSS está funcionando en React Native!
        </Text>
        <Pressable className="bg-blue-600 p-3 rounded-lg active:bg-blue-700">
          <Text className="text-white font-semibold text-center">
            Probar Botón
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
