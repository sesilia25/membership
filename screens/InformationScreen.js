import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { facilities, operationalHour } from "../utils/data";
import { app } from "../config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// subscribe for more videos like this :)
export default function InformationScreen() {
  const navigation = useNavigation();
  const firestore = getFirestore(app);
  const [packages, setPackages] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "packages"));
      const packagesData = [];

      querySnapshot.forEach((doc) => {
        // Include the document ID in the data
        packagesData.push({ id: doc.id, ...doc.data() });
      });

      setPackages(packagesData);
      setPrice("");
    } catch (error) {
      console.error("Error fetching users: ", error);
      // Handle error accordingly
    }
  };

  useEffect(() => {
    fetchData();
  }, [firestore]);

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
      </SafeAreaView>
      <View
        className="flex-1 px-8 pt-8 overflow-y-scroll bg-white"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <ScrollView>
          <View className="">
            <Text className="ml-4 text-2xl font-bold">Fasilitas Gym</Text>
            {facilities &&
              facilities.map((item) => (
                <Text
                  key={item.id}
                  className="ml-4 font-semibold text-justify text-gray-700"
                >
                  {item.id}. {item.description}
                </Text>
              ))}
          </View>
          <View className="">
            <Text className="ml-4 text-2xl font-bold">Jam Operasional</Text>
            {operationalHour &&
              operationalHour.map((item) => (
                <Text
                  key={item.id}
                  className="ml-4 font-semibold text-justify text-gray-700"
                >
                  {item.day} : {item.start} - {item.end} {item.timezone}
                </Text>
              ))}
          </View>
          <View className="">
            <Text className="ml-4 text-2xl font-bold">Daftar Harga Member</Text>
            {packages &&
              packages.map((item) => (
                <Text
                  key={item.id}
                  className="ml-4 font-semibold text-justify text-gray-700"
                >
                  {item.type} : {item.price}
                </Text>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
