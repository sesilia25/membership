import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../../config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
export default function HistoryScreen() {
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
      const filteredData = data.filter((item) => item.isValid === "CORRECT");
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching users: ", error);
      // Handle error accordingly
    }
  };

  useEffect(() => {
    fetchData();
  }, [firestore]);
  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Riwayat Pembayaran</Text>
      </SafeAreaView>
      <View className="flex mt-2 space-y-2">
        {data.map((item) => (
          <View className="flex-row justify-between p-4 items-center border-[1px] border-gray-600 rounded-md">
            <View>
              <Text className="font-semibold">{item.fullName}</Text>
              <Text className="mt-2">{item.price}</Text>
            </View>
            <Text>
              <Text className="font-semibold">{item.proofOfTransfer}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
