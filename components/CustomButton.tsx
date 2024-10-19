import { TouchableOpacity, Text,ActivityIndicator } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyles,textStyles,isLoading,loading = false}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
     className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50':''}`}
     disabled={isLoading}
     >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton