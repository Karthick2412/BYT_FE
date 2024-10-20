import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({title, value, placeHolder, handleChangeText, otherStyles,keyboardType, ...props}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View 
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center"
        >
        <TextInput 
        className="w-full h-full text-white font-psemibold text-base"
        value={value}
        placeholder={placeHolder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
        />
      </View>
    </View>
  )
}

export default FormField