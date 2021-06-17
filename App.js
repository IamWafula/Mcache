import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Screens/Welcome';
import LogIn from './Screens/LogIn';
import Register from './Screens/Register';
import AccountScreen from './Screens/AccountScreen';
import { auth } from './firebase';

export default function App() {
  const [user, setUser] = useState(false)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(true)
      }else{
        setUser(false)
      }
    })
  }, [])
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`${user ? "AccountScreen" : "Welcome" }`} screenOptions={{headerShown: false}} >
        <Stack.Screen name="Welcome"  component={Welcome} />
        <Stack.Screen  name="LogIn" component={LogIn} />
        <Stack.Screen name="Register"  component={Register} />
        <Stack.Screen name="AccountScreen"  component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
