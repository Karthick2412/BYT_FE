import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import React from 'react'
import { router } from 'expo-router';
import CustomButton from "@/components/CustomButton"

const Home = () => {
    const handleQrScan = () => {
        // Navigate to the QR Scanner screen
        router.push('/QRScanner');
      };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
            <Text className="text-2xl font-semibold text-white mt-8 font-psemibold">
            Welcome to Home
            </Text>

            <CustomButton
            title="Scan QR Code"
            handlePress={handleQrScan}
            containerStyles="mt-7"
            
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})