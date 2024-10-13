import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
      <ScrollView horizontal className="flex-row my-2 px-4">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-secondary' : 'bg-gray-300'}`}
            onPress={() => setSelectedCategory(category)}
          >
            <Text className={`${selectedCategory === category ? 'text-white' : 'text-black'} text-lg`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

export default CategoryList

const styles = StyleSheet.create({})