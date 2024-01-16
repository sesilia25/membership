import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../../config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function HomeScreen() {
  const firestore = getFirestore(app);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const usersData = [];

        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });

        // Filter users with role 'member'
        const members = usersData.filter((user) => user.role === "member");

        setUsers(members);
        console.log(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
        // Handle error accordingly
      }
    };

    fetchData();
  }, [firestore]);

  const handleSearch = (query) => {
    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Beranda</Text>
        <View className="mt-6">
          <Text className="mb-4 font-semibold text-gray-800">Cari</Text>
          <View>
            <TextInput
              className="p-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
              placeholder="Cari berdasarkan nama"
              value={searchQuery}
              onChangeText={(value) => {
                setSearchQuery(value);
                handleSearch(value);
              }}
            />
          </View>
        </View>
        <View className="flex mt-2 space-y-2">
          {users.map((item) => (
            <View
              className="p-2 border-[1px] border-gray-600 rounded-md"
              key={item.id}
            >
              <Text>{item.fullName}</Text>
              <Text>{item.role}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
