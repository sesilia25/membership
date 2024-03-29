import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cash from "../../components/validation/Cash";
import Transfer from "../../components/validation/Transfer";
import { cash } from "../../utils/data";
import { app } from "../../config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function ValidationScreen() {
  const [isCash, setIsCash] = useState(false);
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
      const filter = isCash ? "CASH" : "TRANSFER";
      const filteredData = data.filter(
        (item) => item.proofOfTransfer === filter && item.isValid === "PENDING"
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  console.log(data);
  useEffect(() => {
    fetchData();
  }, [firestore, isCash]);
  return (
    <View className="flex-1 p-4 bg-white">
      <SafeAreaView>
        <Text className="text-2xl font-bold">Validasi Pembayaran</Text>
        <View className="flex flex-row justify-center mt-6 space-x-4">
          <TouchableOpacity
            onPress={() => setIsCash(true)}
            className={`w-1/2 px-4 py-2 ${
              isCash
                ? "bg-yellow-400 text-white"
                : "bg-white text-yellow-400 border-2 border-yellow-400"
            } rounded-2xl`}
          >
            <Text
              className={`font-semibold ${
                isCash ? " text-white" : " text-yellow-400 "
              }  text-center`}
            >
              Cash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsCash(false)}
            className={`w-1/2 px-4 py-2 ${
              !isCash
                ? "bg-yellow-400 text-white"
                : "bg-white text-yellow-400 border-2 border-yellow-400"
            } rounded-2xl`}
          >
            <Text
              className={`font-semibold ${
                !isCash ? " text-white" : " text-yellow-400 "
              }  text-center`}
            >
              Transfer
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {isCash ? (
            <>
              <View>
                {data.length === 0 ? (
                  <Text className="font-bold text-center text-gray-500">
                    Belum ada pembayaran
                  </Text>
                ) : (
                  <>
                    {data.map((item) => (
                      <Cash
                        price={item?.price}
                        fullName={item?.fullName}
                        package_={item?.package}
                        id={item?.id}
                        userId={item?.userId}
                      />
                    ))}
                  </>
                )}
              </View>
            </>
          ) : (
            <>
              <View>
                {data.length === 0 ? (
                  <Text className="font-bold text-center text-gray-500">
                    Belum ada pembayaran
                  </Text>
                ) : (
                  <>
                    {data.map((item) => (
                      <Transfer
                        price={item?.price}
                        fullName={item?.fullName}
                        package_={item?.package}
                        proofOfTransferImage={item?.urlImage}
                        id={item?.id}
                        userId={item?.userId}
                      />
                    ))}
                  </>
                )}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
