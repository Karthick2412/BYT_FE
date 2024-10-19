import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginState = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        router.replace("/home"); // Redirect to home screen if logged in
      }
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[90vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">BYT</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with BYT
          </Text>

          <CustomButton
            title="Continue with PhoneNumber"
            handlePress={() => router.push("/sign-in")} // Redirect to sign-in
            containerStyles="w-full mt-7"
          />

          {/* Add a clickable link for registering as a company */}
          <TouchableOpacity onPress={() => router.push("/register-company")}>
            <Text className="text-white text-lg mt-5">
              Register / Login as company
            </Text>
          </TouchableOpacity>

          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
