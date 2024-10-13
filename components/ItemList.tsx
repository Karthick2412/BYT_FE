import { StyleSheet, Text, ScrollView, View,TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'

const ItemList = ({ items, cart, setCart, totalAmount, setTotalAmount }) => {
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
  
            {/* Dropdown for strength options */}
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-600">Strength:</Text>
              <Picker
                selectedValue="normal"
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => console.log(itemValue)}
              >
                <Picker.Item label="Lite" value="lite" />
                <Picker.Item label="Normal" value="normal" />
                <Picker.Item label="Strong" value="strong" />
              </Picker>
  
              {/* Quantity control */}
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="bg-gray-200 px-2 py-1 rounded"
                  onPress={() => handleRemoveItem(item.name, item.price)}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text className="mx-2">{cart[item.name]?.quantity || 0}</Text>
                <TouchableOpacity
                  className="bg-secondary px-2 py-1 rounded"
                  onPress={() => handleAddItem(item.name, item.price)}
                >
                  <Text className="text-white">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

export default ItemList

const styles = StyleSheet.create({})