import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import CategoryList from "@/components/CategoryList";
import ItemList from "@/components/ItemList";

const Menu = () => {
  const { qrData } = useLocalSearchParams();

  const categories = ['Coffee', 'Tea', 'Snacks'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const items = {
    Coffee: [
      { name: 'Espresso', price: 100, itemTypeList: [] },
      { name: 'Cappuccino', price: 150, itemTypeList: [] },
    ],
    Tea: [
      { name: 'Green Tea', price: 30, itemTypeList: [
          { label: "Lite", value: "lite" },
          { label: "Normal", value: "normal" },
          { label: "Strong", value: "strong" },
        ],
      },
      { name: 'Masala Tea', price: 25, itemTypeList: [
          { label: "Lite", value: "lite" },
          { label: "Normal", value: "normal" },
          { label: "Strong", value: "strong" },
        ],
      },
      { name: 'Lite Tea', price: 20, itemTypeList: [
        { label: "Lite", value: "lite" },
        { label: "Normal", value: "normal" },
        { label: "Strong", value: "strong" },
      ],
    },
    { name: 'Ginger Tea', price: 20, itemTypeList: [
      { label: "Lite", value: "lite" },
      { label: "Normal", value: "normal" },
      { label: "Strong", value: "strong" },
    ],
  },
  { name: 'Normal Tea', price: 15, itemTypeList: [
    { label: "Lite", value: "lite" },
    { label: "Normal", value: "normal" },
    { label: "Strong", value: "strong" },
  ],
},
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
      <View className="flex-1 bg-gray-100">
        <View className="p-4 bg-primary">
          <Text className="text-white text-xl font-bold">MDS - Eechanari</Text>
        </View>

        <View className="flex-row">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        </View>

        <ScrollView > 
          <ItemList
            items={items[selectedCategory]}
            cart={cart}
            setCart={setCart}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
          />
        </ScrollView>

        {/* Total Amount and Place Order Button */}
        <View className="p-8 bg-grey shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Total Amount</Text>
            <Text className="text-lg">₹{totalAmount}</Text>
          </View>
          <TouchableOpacity className="bg-secondary py-2 rounded-lg">
            <Text className="text-center text-white text-lg">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({});
