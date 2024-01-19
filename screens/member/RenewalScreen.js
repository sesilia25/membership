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
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "react-native-input-select";
import { useAuthContext } from "../../context/useContext";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const addTransaction = async (transactionData) => {
  const db = getFirestore();
  const transactionRef = collection(db, "transactions");

  try {
    await addDoc(transactionRef, transactionData);
  } catch (error) {
    console.log(error);
  }
};

export default function RenewalScreen() {
  const { user, clearUser } = useAuthContext();
  const navigation = useNavigation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [proofOfTransfer, setProofOfTransfer] = useState("");

  const calculatePrice = (packageType) => {
    const prices = {
      "MEMBER 1 BULAN": "325000",
      "MEMBER 3 BULAN": "900000",
      "MEMBER 6 BULAN": "1700000",
      "MEMBER 12 BULAN": "3000000",
    };

    return prices[packageType] || "0";
  };

  const handleRenewal = async () => {
    let downloadURL = null;

    if (proofOfTransfer === "TRANSFER" && proofOfTransferImage) {
      // Generate a unique identifier (timestamp in this case)
      const timestamp = new Date().getTime();

      const storageRef = ref(storage, `proofOfTransferImages/${timestamp}`);
      const response = await uploadBytes(storageRef, proofOfTransferImage);
      await getDownloadURL(response.ref).then((url) => {
        downloadURL = url;
      });
    }

    await addTransaction({
      userId: user.uid,
      fullName: user.fullName,
      price: calculatePrice(selectedPackage),
      package: selectedPackage,
      proofOfTransfer: proofOfTransfer,
      urlImage: downloadURL,
      isValid: "PENDING",
    });
  };
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
                { label: "Member 1 bulan", value: "MEMBER 1 BULAN" },
                { label: "Member 3 bulan", value: "MEMBER 3 BULAN" },
                { label: "Member 6 bulan", value: "MEMBER 6 BULAN" },
                { label: "Member 12 bulan", value: "MEMBER 12 BULAN" },
              ]}
              primaryColor={"green"}
              onValueChange={(itemValue) => setSelectedPackage(itemValue)}
              selectedValue={selectedPackage}
            />
            <Text className="mb-3 ml-4 text-gray-700">Metode Pembayaran</Text>
            <Dropdown
              className="p-4 text-gray-700 bg-gray-100 rounded-2xl mb-7"
              placeholder="Metode Pembayaran"
              options={[
                { label: "Transfer", value: "TRANSFER" },
                { label: "Cash", value: "CASH" },
              ]}
              primaryColor={"green"}
              onValueChange={(itemValue) => setProofOfTransfer(itemValue)}
              selectedValue={proofOfTransfer}
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
            <TouchableOpacity
              onPress={handleRenewal}
              className="py-3 bg-yellow-400 rounded-xl"
            >
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
