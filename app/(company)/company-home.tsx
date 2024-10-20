import { View, Text, ScrollView, Image,Alert } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const CompanyHome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
        <Text className="text-2xl font-semibold text-white mt-8 font-psemibold">
            WELCOME to Company HOME
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CompanyHome

// const styles = StyleSheet.create({})