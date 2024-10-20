import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const CompanyLayout = () => {
  return (
    <>
    <Stack>
      <Stack.Screen name="register-company" options={{headerShown: false}} />
      <Stack.Screen name="company-home" options={{headerShown: false}} />
      <Stack.Screen name="company-details" options={{headerShown: false}} />
    </Stack>
    <StatusBar 
    backgroundColor="#161622"
    style='light'
    />
    </>
  )
}

export default CompanyLayout

// const styles = StyleSheet.create({})