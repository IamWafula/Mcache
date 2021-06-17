import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Pressable} from 'react-native'
import { Avatar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddNewCard from './AddNewCard'
import AddToCard from './AddToCard'
import AllCardsDisplay from './AllCardsDisplay'
import CardsDisplay from './CardsDisplay'

const HomeTab = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator  initialRouteName="home" >
                <Stack.Screen options={{headerShown: false}} name="home" component={AllCardsDisplay} />
                <Stack.Screen options={{headerShown: false}} name="card" component={CardsDisplay} />
                <Stack.Screen options={{headerShown: false}} name="deposit" component={AddToCard} />
                <Stack.Screen options={{headerShown: false}} name="newCard" component={AddNewCard} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HomeTab

const styles = StyleSheet.create({
    container:{
        height: "100%",
        backgroundColor: "white"
    },
    headerText:{
        fontWeight: "900",
        fontSize: 30,
        color: "#6410ff",
        textAlign: "center",
        marginBottom: 20
    },
    cardHolder:{
        marginBottom: 20,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: 200
    },
    card:{
        width: 300,
        height: 200,
        borderRadius: 20,
        borderColor: "#ff6600",
        borderWidth: 0.5,
        marginLeft: 30,
        display: "flex",
        padding: 10
    },
    history:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1d1c1c",
        borderRadius: 20
    },
    actions:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#868686",
        borderRadius: 20
    }
})
