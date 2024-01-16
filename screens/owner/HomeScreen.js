import { View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { users } from "../../utils/data";

export default function HomeScreen() {
  // const [se]
  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Beranda</Text>
        <View className="mt-6">
          <Text className="mb-4 font-semibold text-gray-800">Cari</Text>
          <TextInput
            className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
            placeholder="sesilia@gmail.com"
            // value={email}
            // onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View className="flex mt-2 space-y-2">
          {users.map((item) => (
            <View
              className="p-2 border-[1px] border-gray-600 rounded-md"
              key={item.id}
            >
              <Text>{item.name}</Text>
              <Text>{item.date}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
