import { View, Text, ScrollView, Image,Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import axios from 'axios';
import env from '@/env';

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton"

const SignIn = () => {
  const apiBaseUrl = env.API_BASE_URL;

  const [isSubmitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phoneNumber: "",
  });

  const submit = async () => {
    if (form.phoneNumber === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    if (form.phoneNumber.length!=10) {
      Alert.alert("Error", "Incorrect phonenumber");
    }

    setSubmitting(true);
    setLoading(true);
    try {
      // await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);

      // await sleep(60000); 

      // setIsLogged(true);

      // Alert.alert("Success", "User signed in successfully");
      const response = await axios.post(`${apiBaseUrl}/otp/send`, {
        phoneNumber:`+91${form.phoneNumber}`
      });
      router.push({ pathname: "/otp", params: { phoneNumber: form.phoneNumber,validateType:"user" } });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
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
          <Text className="text-2xl font-semibold text-white mt-8 font-psemibold">
            Log in to BYT
          </Text>
          
          <FormField
            title="PhoneNumber"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-7"
            keyboardType="numeric"
          />

        <CustomButton
            title="Get OTP"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            loading={loading} 
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn