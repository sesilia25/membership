import React, { useState } from "react";
import { TouchableOpacity, Modal } from "react-native";
import { View, Text } from "react-native";
import { app } from "../../config/firebase";
import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore";

const Cash = ({ fullName, price, package_, id, userId }) => {
  const [isValidation, setIsValidation] = useState(false);
  const toggleValidation = () => {
    setIsValidation(!isValidation);
  };
  const firestore = getFirestore(app);
  const handleValidation = async () => {
    try {
      // Update Firestore document
      await updateDoc(doc(firestore, "transactions", id), {
        isValid: "CORRECT", // Change 'validated' to the appropriate field in your document
      });

      const userDocRef = doc(firestore, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      let month;
      if ("MEMBER 1 BULAN") {
        month = 1;
      } else if ("MEMBER 3 BULAN") {
        month = 3;
      } else if ("MEMBER 6 BULAN") {
        month = 6;
      } else if ("MEMBER 12 BULAN") {
        month = 12;
      }

      const timestamp = userDocSnap.data().dateMember;
      const dateMember = timestamp ? timestamp.toDate() : null;

      let newDateMember;

      if (dateMember !== null) {
        newDateMember = addMonths(dateMember, month);
      } else {
        newDateMember = addMonths(new Date(), month);
      }

      await updateDoc(userDocRef, {
        dateMember: newDateMember,
      });

      // Close the validation modal
      toggleValidation();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Function to add 6 months to a given date (formatted as "YYYY-MM-DD")
  function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);

    // Handle cases where the new month value is out of bounds
    if (isNaN(newDate.getTime())) {
      // Adjust the date to the last day of the previous month
      newDate.setDate(0);
    }

    return newDate;
  }

  return (
    <View className="flex flex-row items-center justify-between p-4 m-2 space-x-4 bg-white rounded shadow-md">
      <View>
        <Text className="mb-2 text-lg font-bold">{fullName}</Text>
        <Text className="mb-1 text-base">Total: {price}</Text>
        <Text className="mb-1 text-base">Paket: {package_}</Text>
      </View>
      <TouchableOpacity
        onPress={toggleValidation}
        className="px-4 py-2 bg-yellow-400 rounded-md"
      >
        <Text className="font-semibold text-white">Validasi</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isValidation}
        onRequestClose={toggleValidation}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here
          }}
        >
          <View
            style={{ backgroundColor: "#FFF", padding: 20, borderRadius: 10 }}
          >
            <Text className="text-xl font-semibold">Apakah ini valid?</Text>
            <View className="flex flex-row mt-4">
              <TouchableOpacity
                onPress={toggleValidation}
                className="mx-auto bg-yellow-400 rounded-md "
              >
                <Text className="w-16 p-2 font-semibold text-center text-white uppercase">
                  Tidak
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleValidation}
                className="mx-auto bg-yellow-400 rounded-md "
              >
                <Text className="w-16 p-2 font-semibold text-center text-white uppercase">
                  Ya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cash;
