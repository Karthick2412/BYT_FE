import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from "react";

const ItemList = ({ items, cart, setCart, totalAmount, setTotalAmount }) => {
  // State to track selected values for each item
  const [selectedValues, setSelectedValues] = useState({});

  const handleValueChange = (itemName, itemValue) => {
    // Update the state with the selected value for the specific item
    setSelectedValues(prevValues => ({
      ...prevValues,
      [itemName]: itemValue,
    }));
  };

  const handleAddItem = (itemName, price) => {
    const newCart = { ...cart };
    if (!newCart[itemName]) {
      newCart[itemName] = { quantity: 1, price };
    } else {
      newCart[itemName].quantity += 1;
    }
    setCart(newCart);
    setTotalAmount(totalAmount + price);
  };

  const handleRemoveItem = (itemName, price) => {
    const newCart = { ...cart };
    if (newCart[itemName] && newCart[itemName].quantity > 0) {
      newCart[itemName].quantity -= 1;
      if (newCart[itemName].quantity === 0) {
        delete newCart[itemName];
      }
      setCart(newCart);
      setTotalAmount(totalAmount - price);
    }
  };

  return (
    <ScrollView className="flex-1 px-4">
      {items.map((item, index) => (
        <View key={index} className="bg-white p-4 mb-4 rounded-lg shadow-md">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-lg text-gray-700">₹{item.price}</Text>
          </View>

          {/* Conditionally render the dropdown based on itemTypeList */}
          {item.itemTypeList && item.itemTypeList.length > 0 ? (
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-600">Type:</Text>
              <Picker
                selectedValue={selectedValues[item.name] || item.itemTypeList[0].value} // Default to first type if selected value is not set
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => handleValueChange(item.name, itemValue)}
              >
                {item.itemTypeList.map((type) => (
                  <Picker.Item key={type.value} label={type.label} value={type.value} />
                ))}
              </Picker>
            </View>
          ) : (
            <Text className="text-gray-600 mb-3"></Text> // Fallback text if no types are available
          )}

          {/* Quantity control */}
          <View className="flex-row justify-end items-center mt-4">
            <TouchableOpacity
              className="bg-gray-200 px-3 py-1 rounded"
              onPress={() => handleRemoveItem(item.name, item.price)}
            >
              <Text className="text-lg">-</Text>
            </TouchableOpacity>
            <Text className="mx-2 text-lg">{cart[item.name]?.quantity || 0}</Text>
            <TouchableOpacity
              className="bg-secondary px-3 py-1 rounded"
              onPress={() => handleAddItem(item.name, item.price)}
            >
              <Text className="text-lg text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
