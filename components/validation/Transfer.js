import React from "react";
import { View, Text } from "react-native";
import { EyeIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native";

const Transfer = ({ date, amount, status }) => {
  return (
    <View className="flex flex-row items-center justify-between p-4 m-2 space-x-4 bg-white rounded shadow-md">
      <View>
        <Text className="mb-2 text-lg font-bold">{date}</Text>
        <Text className="mb-1 text-base">Amount: {amount}</Text>
      </View>
      <View className="flex flex-row items-center space-x-4">
        <TouchableOpacity className="px-4 py-2 bg-yellow-400 rounded-md">
          <Text className="font-semibold text-white">Validasi</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 bg-yellow-400 rounded-md">
          <EyeIcon color={"#FFF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Transfer;
