import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import CategoryList from "@/components/CategoryList"
import ItemList from "@/components/ItemList"

const menu = () => {
  // const { qrData } = params;
  const { qrData } = useLocalSearchParams();

  const categories = ['Coffee', 'Tea', 'Snacks'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const items = {
    Coffee: [
      { name: 'Espresso', price: 100 },
      { name: 'Cappuccino', price: 150 },
    ],
    Tea: [
      { name: 'Green Tea', price: 80 },
      { name: 'Masala Tea', price: 90 },
    ],
    Snacks: [
      { name: 'Sandwich', price: 120 },
      { name: 'Muffin', price: 50 },
    ],
  };

  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);


  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      {/* <View className="w-full justify-center min-h-[80vh] px-4 my-6">
      <Text className="text-2xl font-semibold text-white mt-8 font-psemibold">
          Scanned QR Data: {qrData}
          </Text>
      {/* <Text className="text-2xl font-semibold text-white mt-8 font-psemibold">
            Menu
          </Text> */}

          
      {/* </View> */}
      <View className="flex-1 bg-gray-100">
      {/* Shop Name */}
      <View className="p-4 bg-primary">
        <Text className="text-white text-xl font-bold">Your Shop Name</Text>
      </View>

      {/* CategoryList Component */}
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ItemList Component */}
      <ItemList
        items={items[selectedCategory]}
        cart={cart}
        setCart={setCart}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
      />

      {/* Total Amount and Place Order Button */}
      <View className="p-8 bg-white shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Total Amount</Text>
          <Text className="text-lg">₹{totalAmount}</Text>
        </View>
        <TouchableOpacity className="bg-secondary py-2 rounded-lg">
          <Text className="text-center text-white text-lg">Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default menu

const styles = StyleSheet.create({})