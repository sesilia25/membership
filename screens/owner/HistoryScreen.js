import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { users } from "../../utils/data";

export default function HistoryScreen() {
  const [isCash, setIsCash] = useState(false);
  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Riwayat Pembayaran</Text>
      </SafeAreaView>
      <View className="flex mt-2 space-y-2">
        {users.map((item) => (
          <View
            className="flex-row justify-between p-4 items-center border-[1px] border-gray-600 rounded-md"
            key={item.id}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>{item.date}</Text>
            </View>
            <Text>
              <Text className="font-semibold">Cash</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
