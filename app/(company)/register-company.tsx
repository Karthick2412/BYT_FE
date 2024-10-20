import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert,ScrollView, Image } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

import axios from 'axios';
import env from '@/env';

export default function RegisterCompany() {
    const apiBaseUrl = env.API_BASE_URL;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCompanyLogin = async () => {
    setIsLoading(true);
setLoading(true);
setSubmitting(true);
    // Call your backend API to check if the company exists
    try {
        const response = await axios.post(`${apiBaseUrl}/otp/send`, {
            phoneNumber:`+91${phoneNumber}`
          });
          router.push({ pathname: "/otp", params: { phoneNumber: phoneNumber,validateType:"company" } });
    //   const data = await response.json();

    //   if (data.exists) {
    //     // If company exists, navigate to company home page
    //     await AsyncStorage.setItem("companyToken", data.token); // Store company token
    //     router.replace("/company-home"); // Navigate to company home page
    //   } else {
    //     // If no company found, navigate to the form page for company registration
    //     router.push({
    //       pathname: "/register-company-details",
    //       params: { phoneNumber },
    //     });
    //   }
    } catch (error) {
      Alert.alert("Error", "Failed to check company details");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
        <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[50px]"
          />
      <Text className="text-2xl font-semibold text-white mt-8 font-psemibold">Company's phone number</Text>
      <View className="w-full mt-7">
      <FormField
            title="PhoneNumber"
            value={phoneNumber}
            handleChangeText={setPhoneNumber}
            otherStyles="mt-7"
            keyboardType="numeric"
          />
          </View>

      {/* <TextInput
        className="border rounded p-2 w-64 mt-4"
        placeholder="Phone Number"
        value={phoneNumber}
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
      /> */}

          <CustomButton
            title="Get OTP"
            handlePress={handleCompanyLogin}
            containerStyles="mt-10"
            isLoading={isSubmitting}
            loading={loading} 
          />
      {/* {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        
        // <Button title="Submit" onPress={handleCompanyLogin} />
      )} */}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
