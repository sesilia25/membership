import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../../config/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { XCircleIcon } from "react-native-heroicons/solid";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function SettingsScreen() {
  const firestore = getFirestore(app);
  const [packages, setPackages] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [price, setPrice] = useState(0);
  const [editingPackageId, setEditingPackageId] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

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

  const openEditModal = (packageId) => {
    setEditingPackageId(packageId);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingPackageId(null);
    setEditModalVisible(false);
  };

  const handleEditPrice = async () => {
    try {
      if (editingPackageId) {
        // Use the editingPackageId to update the price in the database
        const packageRef = doc(
          collection(firestore, "packages"),
          editingPackageId
        );
        await setDoc(packageRef, { price: price }, { merge: true });

        // Close the modal after updating the price
        await fetchData();
        closeEditModal();
      } else {
        console.error("No package ID specified for updating price.");
      }
    } catch (error) {
      console.error("Error updating price: ", error);
      // Handle error accordingly
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="pb-10">
        <SafeAreaView>
          <Text className="text-2xl font-bold">Pengaturan</Text>
          <Text className="mt-4 text-xl font-semibold">Set Harga</Text>
        </SafeAreaView>
        <View className="flex-col mt-2 space-y-2">
          {packages.map((item) => (
            <View
              className="flex flex-row items-center w-full space-x-2"
              key={item.id}
            >
              <View className="border-[1px] p-3 w-2/3 border-gray-600 rounded-md">
                <Text className="text-gray-600">{item.type}</Text>
                <Text className="mt-1 font-medium">{item.price}</Text>
              </View>
              <TouchableOpacity
                className="w-1/3"
                onPress={() => openEditModal(item.id)}
              >
                <Text className="p-2 font-semibold text-center text-white bg-yellow-400 rounded-md">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={closeEditModal}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  width: "80%",
                  borderRadius: 10,
                }}
              >
                <View className="flex flex-row justify-end">
                  <TouchableOpacity>
                    <XCircleIcon
                      className="w-2"
                      color={"gray"}
                      onPress={closeEditModal}
                    />
                  </TouchableOpacity>
                </View>
                <Text className="text-lg font-semibold text-center">
                  Edit Harga
                </Text>
                <TextInput
                  className="px-4 py-2 mt-4 mb-3 text-gray-700 bg-gray-100 rounded-2xl"
                  value={price}
                  onChangeText={(value) => setPrice(value)}
                  placeholder="0"
                />
                <TouchableOpacity
                  className="p-3 mt-2 bg-yellow-500 rounded-lg"
                  onPress={handleEditPrice}
                >
                  <Text className="font-semibold text-center text-white uppercase">
                    Simpan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={handleLogout}
          className="w-full mt-3 rounded-lg p-3  text-yellow-500 border-[1px] border-yellow-500 bg-white"
        >
          <Text className="text-center text-yellow-500 uppercase">Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
