import { StyleSheet, Text, View } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'

const TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{headerShown: false}} />
      <Stack.Screen name="otp" options={{headerShown: false}} />
      <Stack.Screen name="QRScanner" options={{headerShown: false}} />
    </Stack>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})