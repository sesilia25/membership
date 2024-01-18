import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuthContext } from "../../context/useContext";
import { useState, useEffect } from "react";
import { app } from "../../config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function HomeMemberScreen() {
  const navigation = useNavigation();
  const { user, clearUser } = useAuthContext();
  const [history, setHistory] = useState([]);
  const firestore = getFirestore(app);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "transactions")
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredData = data.filter((item) => item.userId === user.uid);
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching users: ", error);
      // Handle error accordingly
    }
  };

  useEffect(() => {
    fetchData();
  }, [firestore]);
  const handleLogout = async () => {
    try {
      clearUser();

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
          {user && (
            <View className="flex flex-row justify-between p-4 border-2">
              <View>
                <Text className="text-lg">{user?.fullName}</Text>
                <Text className="text-lg">
                  {user?.dateMember === null ? "Belum Aktif" : "Aktif"}
                </Text>
                <Text className="text-lg">
                  {" "}
                  {user?.dateMember === null ? "-" : user?.dateMember}
                </Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/icons/gym.png")}
                  style={{ width: 165, height: 110 }}
                />
              </View>
            </View>
          )}
          <View className="flex flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Renewal")}
              className="w-32 px-4 py-2 bg-white border-[1px] border-yellow-500 rounded-2xl"
            >
              <Text className="font-semibold text-center text-yellow-500">
                Perpanjangan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              className="w-32 px-4 py-2 bg-yellow-400 rounded-2xl"
            >
              <Text className="font-semibold text-center text-white">
                Keluar
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-[2px] mt-6 bg-gray-500"></View>
          <View className="flex mt-4 space-y-2">
            {data.map((item) => (
              <View className="flex-row justify-between p-4 items-center border-[1px] border-gray-600 rounded-md">
                <Text className="mt-2">{item.price}</Text>
                <Text>
                  <Text className="font-semibold">{item.proofOfTransfer}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
