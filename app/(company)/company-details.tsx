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

const CompanyDetails = () => {
    const { phoneNumber } = useLocalSearchParams();
    const apiBaseUrl = env.API_BASE_URL;
  
    const [isSubmitting, setSubmitting] = useState(false);
  
    const [loading, setLoading] = useState(false);
  
    const [form, setForm] = useState({
      companyName: "",
    //   lastName: "",
    });
  
    const submit = async () => {
      
      setSubmitting(true);
      setLoading(true);
      try {
        const response = await axios.post(`${apiBaseUrl}/company/save`, {
          companyName:`${form.companyName}`,
        //   lastName:`${form.lastName}`,
          phoneNumber:`+91${phoneNumber}`
        });
      //   {
      //     "status": "success",
      //     "message": "Company saved successfully",
      //     "data": {
      //         "companyId": "d1596fcf-eb0d-4648-948a-b75408a00bdf",
      //         "companyName": "Sathya's backery",
      //         "email": null,
      //         "phoneNumber": "+919344597998"
      //     }
      // }
        console.log(`/company/save resonse is ${response.data.data.companyId}`)
        if (response.data.data.companyId != null) {
            await AsyncStorage.setItem("companyToken", response.data.data.companyId); // Store company token
            router.replace("/company-home"); // Navigate to company home page
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
              title="Company Name"
              value={form.companyName}
              handleChangeText={(e) => setForm({ ...form, companyName: e })}
              otherStyles="mt-7"
              keyboardType="text"
            />
  
            {/* <FormField
              title="Last name"
              value={form.lastName}
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              otherStyles="mt-7"
              keyboardType="text"
            /> */}
            
  
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

export default CompanyDetails