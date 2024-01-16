import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cash from "../../components/validation/Cash";
import Transfer from "../../components/validation/Transfer";
import { cash } from "../../utils/data";

export default function ValidationScreen() {
  const [isCash, setIsCash] = useState(false);
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
                {cash.map((item) => (
                  <Cash
                    date={item.amount}
                    status={item.status}
                    amount={item.date}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <View>
                {cash.map((item) => (
                  <Transfer
                    date={item.amount}
                    status={item.status}
                    amount={item.date}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
