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
    

    const TopStack = createStackNavigator()
    return (
            <NavigationContainer independent={true} >
                <TopStack.Navigator >
                   
                    <TopStack.Screen name="home" component={MainAccountScreen} options={{headerShown: false}} />
                    <TopStack.Screen name="payment" component={PaymentDetails}/>
                    <TopStack.Screen name="receipt" component={PaymentReceipt}/>
                    <TopStack.Screen name="pay" component={PaymentScreen}/>
                    <TopStack.Screen name="transferDetails" component={TransferDetails}/>
                    <TopStack.Screen name="transfer" component={TransferAction}/>
                </TopStack.Navigator>
            </NavigationContainer>
    )
}

export default Account

const styles = StyleSheet.create({

})
