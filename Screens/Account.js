import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {StyleSheet, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack';
import MainAccountScreen from './MainAccountScreen';
import PaymentDetails from './PaymentDetails';
import PaymentReceipt from './PaymentReceipt';
import PaymentScreen from './PaymentScreen';
import TransferDetails from './TransferDetails';
import TransferAction from './TransferAction';


const Account = () => {
    

    const Stack = createStackNavigator()
    return (
            <NavigationContainer independent={true} >
                <Stack.Navigator >
                   
                    <Stack.Screen name="home" component={MainAccountScreen} options={{headerShown: false}} />
                    <Stack.Screen name="payment" component={PaymentDetails}/>
                    <Stack.Screen name="receipt" component={PaymentReceipt}/>
                    <Stack.Screen name="pay" component={PaymentScreen}/>
                    <Stack.Screen name="transferDetails" component={TransferDetails}/>
                    <Stack.Screen name="transfer" component={TransferAction}/>
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default Account

const styles = StyleSheet.create({

})
