import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CameraView, Camera } from "expo-camera";
import { router } from 'expo-router';

const QRScanner = () => {

    const [hasPermission, setHasPermission] = useState(null);

    const [scanned, setScanned] = useState(false);

    const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setLoading(false);
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    if (scanned) return; // Prevent multiple scans
    setScanned(true);
    router.push({ pathname: "/menu", params: { qrData: data } });
    setTimeout(() => {
        setScanned(false); // Reset scanned state after a short delay (e.g., 2 seconds)
      }, 2000);
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4">Loading camera...</Text> 
      </SafeAreaView>
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  

    

//   const handleBarCodeScanned = ({ type, data }) => {
//     // Handle the scanned QR code data
//     console.log(`Scanned code type: ${type}, data: ${data}`);
    
//     // Navigate to Menu with scanned data (if needed)
//     navigation.push('menu', { qrData: data });
//   };

  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="relative w-full justify-center min-h-[80vh] px-4 my-6">
      <BarCodeScanner
        onBarCodeScanned={handleBarcodeScanned}
        // barcodeScannerSettings={{
        //     barcodeTypes: ["qr", "pdf417"],
        //   }}
        style={{ width: '100%', height: '100%' }}
      />

 
          <View className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500" />
          <View className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500" />
          <View className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500" />
          <View className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500" />

      {/* <View className="absolute inset-0 flex justify-center items-center">
          
          <Text className="text-white text-lg mb-4">Align the QR code within the frame</Text>
        </View> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default QRScanner

const styles = StyleSheet.create({})