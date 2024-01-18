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
import { auth, storage } from "../config/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const addUserDataToFirestore = async (uid, userData) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);

  try {
    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error adding user data to Firestore:", error.message);
  }
};

const addTransaction = async (transactionData) => {
  const db = getFirestore();
  const transactionRef = collection(db, "transactions");

  try {
    await addDoc(transactionRef, transactionData);
  } catch (error) {
    console.log(error);
  }
};

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [proofOfTransfer, setProofOfTransfer] = useState("");
  const [proofOfTransferImage, setProofOfTransferImage] = useState(null);

  const selectProofOfTransferImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProofOfTransferImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error launching image library:", error.message);
    }
  };

  const calculatePrice = (packageType) => {
    const prices = {
      "MEMBER 1 BULAN": "325000",
      "MEMBER 3 BULAN": "900000",
      "MEMBER 6 BULAN": "1700000",
      "MEMBER 12 BULAN": "3000000",
    };

    return prices[packageType] || "0";
  };

  const handleRegister = async () => {
    if (email && password) {
      try {
        // Create user with email and password
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = response.user;

        // Update user profile with display name
        await updateProfile(user, {
          displayName: fullName,
        });

        // Add user data to Firestore
        await addUserDataToFirestore(user.uid, {
          role: "member",
          fullName: fullName,
          email: email,
          selectedPackage: selectedPackage,
          dateMember: null,
        });

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

        // Add transaction to Firestore
        await addTransaction({
          userId: user.uid,
          fullName: fullName,
          price: calculatePrice(selectedPackage),
          package: selectedPackage,
          proofOfTransfer: proofOfTransfer,
          urlImage: downloadURL, // Set the downloadURL here
          isValid: "PENDING",
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
                { label: "Member 1 bulan", value: "MEMBER 1 BULAN" },
                { label: "Member 3 bulan", value: "MEMBER 3 BULAN" },
                { label: "Member 6 bulan", value: "MEMBER 6 BULAN" },
                { label: "Member 12 bulan", value: "MEMBER 12 BULAN" },
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
                <TouchableOpacity
                  onPress={() => selectProofOfTransferImage()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: "gray", marginRight: 10 }}>
                    {proofOfTransferImage
                      ? "Ubah Bukti Transfer"
                      : "Pilih Bukti Transfer"}
                  </Text>
                  <Image
                    // source={require("../assets/images/image_icon.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
                {proofOfTransferImage && (
                  <Image
                    source={{ uri: proofOfTransferImage }}
                    style={{ width: "100%", height: 200, resizeMode: "cover" }}
                  />
                )}
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
