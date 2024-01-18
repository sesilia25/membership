import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

const Cash = ({ fullName, price, package_ }) => {
  return (
    <View className="flex flex-row items-center justify-between p-4 m-2 space-x-4 bg-white rounded shadow-md">
      <View>
        <Text className="mb-2 text-lg font-bold">{fullName}</Text>
        <Text className="mb-1 text-base">Total: {price}</Text>
        <Text className="mb-1 text-base">Paket: {package_}</Text>
      </View>
      <TouchableOpacity className="px-4 py-2 bg-yellow-400 rounded-md">
        <Text className="font-semibold text-white">Validasi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cash;
