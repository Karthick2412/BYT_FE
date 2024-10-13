import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const handleChangeText = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input box if a digit is entered
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // If all digits are entered, check OTP
    if (newOtp.every((digit) => digit !== '')) {
        verifyOtp(newOtp.join('')); // Join the array into a single string and verify
      }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus(); // Move to the previous input box if backspace is pressed
    }
  };

  const verifyOtp = async (enteredOtp) => {
    try {
        const mockAxiosResponse = {
            data: {
              success: true,
              message: 'OTP verified successfully',
              token: 'sample-jwt-token-123456', // Could be something like an authentication token
            },
            status: 200,
            statusText: 'OK',
            headers: {
              'content-type': 'application/json',
            },
            config: {}, // The request configuration that was used
          };
          const response = mockAxiosResponse;

    //   const response = await axios.post('https://example.com/api/verify-otp', {
    //     otp: enteredOtp,
    //   });

      if (response.data.success) {
        // If OTP is correct, navigate to Home screen
        router.replace("/home");
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
        <Text className="text-2xl font-semibold text-white px-4 mt-8 font-psemibold">
        Enter OTP
        </Text>
      <View className='justify-center flex-row space-x-6 mt-8 items-center'>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)} // Store references to TextInput components
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            maxLength={1} // Limit each input to a single digit
            keyboardType="numeric" // Numeric keyboard for digits
            className={`text-white font-psemibold text-base border-2 p-2 m-1 text-center text-lg w-12 h-12 rounded-md ${
                focusedIndex === index ? 'border-secondary' : 'border-black-200'
              } `}
            onFocus={() => setFocusedIndex(index)} // Track focused input
            onBlur={() => setFocusedIndex(null)} // Reset when out of focus
          />
        ))}
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8, // Reduced padding for smaller boxes
    margin: 5,
    textAlign: 'center',
    fontSize: 18,
    width: 40, // Smaller width for compact boxes
    height: 40, // Set height to make it a square
    borderRadius: 5,
    backgroundColor: '#f9f9f9', // Slight background color
  },
});

export default OtpInput;
