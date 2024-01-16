import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { packages } from "../../utils/data";

export default function SettingsScreen() {
  const [isCash, setIsCash] = useState(false);
  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Pengaturan</Text>
        <Text className="mt-4 text-xl font-semibold">Set Harga</Text>
      </SafeAreaView>
      <View className="flex-col p-4 space-y-2">
        {packages.map((item) => (
          <View className="flex flex-row items-center w-full space-x-2">
            <View
              key={item.id}
              className="border-[1px] p-3 w-2/3 border-gray-600 rounded-md"
            >
              <Text>{item.type}</Text>
            </View>
            <TouchableOpacity className="w-1/3">
              <Text className="p-2 font-semibold text-center text-white bg-yellow-400 rounded-md">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
