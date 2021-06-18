import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './HomeTab';
import Account from './Account';
import Profile from './Profile';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {auth } from "../firebase"
import {NavigationActions} from "react-navigation"

const AccountScreen = ({navigation}) => {
    const changeScreen = (screenName) =>{
        navigation.reset({
            index: 0,
            routes: [{ name: screenName }],
          });
    }

    auth.onAuthStateChanged((authUser)=>{
        if(!authUser){
            navigation.navigate("Welcome")
        }
    })




    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer independent={true} >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      if(route.name === "Home"){
                        return <AntDesign name="home" size={24} color="black" />
                      }else if(route.name === "Account"){
                          return (
                            <View >
                                <Image style={{width: 40, height: 40, top: -20}} source={require("../assets/icon.png")} />
                            </View>
                      )}else if(route.name === "Profile"){
                          return <Ionicons name="person-outline" size={24} color="black" />
                      }
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: '#6400ff',
                    inactiveTintColor: 'gray',
                  }}
            >
                <Tab.Screen name="Home" component={HomeTab}/>
                <Tab.Screen name="Account" component={Account}/>
                <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AccountScreen

const styles = StyleSheet.create({})
