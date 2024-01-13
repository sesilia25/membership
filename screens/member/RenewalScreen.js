import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { themeColors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  InformationCircleIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "react-native-input-select";

export default function RenewalScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [proofOfTransfer, setProofOfTransfer] = useState("");

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start p-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 bg-yellow-400 rounded-tr-2xl rounded-bl-2xl"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 px-8 pt-8 overflow-y-scroll bg-white"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <ScrollView>
          <View className="space-y-1 form">
            <Text className="ml-4 text-gray-700">Perpanjangan</Text>
            <Text className="mb-3 ml-4 text-gray-700">Pilihan Paket</Text>
            <Dropdown
              className="p-4 text-gray-700 bg-gray-100 rounded-2xl mb-7"
              placeholder="Silihkan pilih paket"
              options={[
                { label: "Transfer", value: "TRANSFER" },
                { label: "Cash", value: "CASH" },
              ]}
              primaryColor={"green"}
              onValueChange={(itemValue) => setSelectedPackage(itemValue)}
              selectedValue={selectedPackage}
            />
            <Text className="mb-3 ml-4 text-gray-700">Metode Pembayaran</Text>
            <Dropdown
              className="p-4 text-gray-700 bg-gray-100 rounded-2xl mb-7"
              placeholder="Silihkan pilih paket"
              options={[
                { label: "Transfer", value: "TRANSFER" },
                { label: "Cash", value: "CASH" },
              ]}
              primaryColor={"green"}
              onValueChange={(itemValue) => setSelectedPackage(itemValue)}
              selectedValue={selectedPackage}
            />
            {selectedPackage === "TRANSFER" && (
              <>
                <Image
                  source={require("../../assets/images/signup.png")}
                  style={{ width: 165, height: 110 }}
                />
                <Text className="ml-4 text-gray-700">Bukti Transfer</Text>
                <TextInput
                  className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                  value="sesil@gmail.com"
                  placeholder="Enter Email"
                />
              </>
            )}
            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl">
              <Text className="font-bold text-center text-gray-700 uppercase font-xl">
                Perpanjang
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
