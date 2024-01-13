import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function HomeMemberScreen() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <View className="p-4 ">
          <Text className="mb-4 text-xl font-bold">Beranda</Text>
          <View className="flex flex-row justify-between p-4 border-2">
            <View>
              <Text className="text-lg">001</Text>
              <Text className="text-lg">Yohanes Wauran</Text>
              <Text className="text-lg">Aktif</Text>
              <Text className="text-lg">12/01/2024</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/icons/gym.png")}
                style={{ width: 165, height: 110 }}
              />
            </View>
          </View>
          <Text className="mt-4">
            Masa Aktif Keanggotaan sampai 12 Januari 2023
          </Text>
          <View className="flex flex-row justify-end mt-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Renewal")}
              className="w-32 px-4 py-2 bg-yellow-400 rounded-2xl"
            >
              <Text className="font-semibold text-center text-white">
                Perpanjangan
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-[2px] mt-6 bg-gray-500"></View>
          <View className="flex flex-row justify-center mt-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="w-32 px-4 py-2 bg-yellow-400 rounded-2xl"
            >
              <Text className="font-semibold text-center text-white">
                Keluar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
