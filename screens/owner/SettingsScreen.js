import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [isCash, setIsCash] = useState(false);
  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Pengaturan</Text>
      </SafeAreaView>
    </View>
  );
}
