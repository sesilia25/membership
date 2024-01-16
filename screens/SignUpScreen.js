import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  InformationCircleIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "react-native-input-select";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const addUserDataToFirestore = async (uid, userData) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);

  try {
    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error adding user data to Firestore:", error.message);
  }
};

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [proofOfTransfer, setProofOfTransfer] = useState("");

  const handleRegister = async () => {
    if (email && password) {
      try {
        // Create a new user with email and password
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = response.user;

        await updateProfile(user, {
          displayName: fullName,
        });

        await addUserDataToFirestore(user.uid, {
          role: "member",
          fullName: fullName,
        });

        console.log("Registration successful:", user);
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex pb-4">
        <View className="flex-row justify-between p-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 bg-yellow-400 rounded-tr-2xl rounded-bl-2xl"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Information")}
            className="p-2 bg-yellow-400 rounded-tr-2xl rounded-bl-2xl"
          >
            <InformationCircleIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/signup.png")}
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
            <Text className="text-gray-700 ">Nama Lengkap</Text>
            <TextInput
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              value={fullName}
              onChangeText={(value) => setFullName(value)}
              placeholder="Sesilia Turambi"
            />
            <Text className="text-gray-700 ">Email</Text>
            <TextInput
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              value={email}
              onChangeText={(value) => setEmail(value)}
              placeholder="sesiliaturambi@gmail.com"
            />
            <Text className="text-gray-700 ">Kata Sandi</Text>
            <TextInput
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
              placeholder="*****"
            />
            <Text className="mb-3 text-gray-700">Pilihan Paket</Text>
            <Dropdown
              className="p-4 text-gray-700 bg-gray-100 rounded-2xl mb-7"
              placeholder="Silihkan pilih paket"
              options={[
                { label: "Visit Gym", value: "VISIT GYM" },
                { label: "Visit Gym + Kolam", value: "VISIT GYM + KOLAM" },
                { label: "Visit Sauna", value: "VISIT SAUNA" },
                { label: "Member 1 bulan", value: "MEMBER 1 BULAN" },
                { label: "Member 3 bulan", value: "MEMBER 3 BULAN" },
                { label: "Member 6 bulan", value: "MEMBER 6 BULAN" },
                { label: "Member 12 bulan", value: "MEMBER 12 BULAN" },
                {
                  label: "Member 1 bulan Gym + Sauna",
                  value: "MEMBER 1 BULAN GYM + SAUNA",
                },
              ]}
              primaryColor={"green"}
              onValueChange={(itemValue) => setSelectedPackage(itemValue)}
              selectedValue={selectedPackage}
            />
            <Text className="mb-3 text-gray-700">Metode Pembayaran</Text>
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
            {proofOfTransfer === "TRANSFER" && (
              <>
                <Text className="mb-3 text-gray-700">Bukti Transfer</Text>
                <TextInput
                  className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                  value="sesil@gmail.com"
                  placeholder="Enter Email"
                />
              </>
            )}
            <TouchableOpacity
              onPress={handleRegister}
              className="py-3 bg-yellow-400 rounded-xl"
            >
              <Text className="font-bold text-center text-gray-700 uppercase font-xl">
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center pb-4 mt-7">
            <Text className="font-semibold text-gray-500">
              Sudah punya akun?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-500"> Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
