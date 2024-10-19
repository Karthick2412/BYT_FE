import { View, Text, ScrollView, Image,Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import axios from 'axios';
import env from '@/env';

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton"

import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDetails = () => {
    const { phoneNumber } = useLocalSearchParams();
  const apiBaseUrl = env.API_BASE_URL;

  const [isSubmitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const submit = async () => {
    
    setSubmitting(true);
    setLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/user/save`, {
        firstName:`${form.firstName}`,
        lastName:`${form.lastName}`,
        phoneNumber:`+91${phoneNumber}`
      });

      if (response.data.userId != null) {
        await AsyncStorage.setItem("userToken", response.data.userId);
        router.replace("/home");
      }else {
        Alert.alert('Error', 'Account details not stored. Please try again.');
      }
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
            User Details
          </Text>

          <FormField
            title="First name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-7"
            keyboardType="text"
          />

          <FormField
            title="Last name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-7"
            keyboardType="text"
          />
          

        <CustomButton
            title="Save"
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

export default UserDetails