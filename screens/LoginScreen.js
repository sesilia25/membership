import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response.user);
      } catch (error) {
        console.log(error.message);

        // Menambahkan pesan jika gagal masuk
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
        ) {
          alert("Email atau kata sandi salah. Silakan coba lagi.");
        } else {
          alert(
            "Gagal masuk. Silakan coba lagi atau periksa koneksi internet Anda."
          );
        }
      }
    }
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 ml-4 bg-yellow-400 rounded-tr-2xl rounded-bl-2xl"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-4">
          <Image
            source={require("../assets/icons/ic_get_started.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 px-8 pt-8 bg-white"
      >
        <View className="space-y-2 form">
          <Text className="text-gray-700 ">Email</Text>
          <TextInput
            className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
            placeholder="sesilia@gmail.com"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text className="text-gray-700 ">Kata Sandi</Text>
          <TextInput
            className="p-4 mb-5 text-gray-700 bg-gray-100 rounded-2xl"
            secureTextEntry
            placeholder="*****"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700 uppercase">
              Masuk
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="font-semibold text-gray-500">Belum punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-yellow-500"> Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
