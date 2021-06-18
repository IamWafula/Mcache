import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View ,Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { auth, db } from '../firebase';
import { useIsFocused } from '@react-navigation/core';

const PaymentDetails = ({navigation, route}) => {

    const isFocused = useIsFocused()

    const [paymentHistory, setPaymentHistory] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.title,
            headerTitleStyle:{color: "#868686", fontSize: 20, fontWeight: "bold", marginLeft: 90 }
        })
    }, [navigation])

    useEffect(() => {
        let unsubscribe;
        const getData= async ()=>{
            unsubscribe = await db.collection("cardOwners")
            .doc(auth.currentUser.email)
            .collection("payments")
            .orderBy("timestamp", "desc").onSnapshot((snapshot)=>{
                setPaymentHistory(
                    snapshot.docs.map((doc)=>{
                            return({
                                id: doc.id,
                                data: doc.data()
                            })                        
                    })
                )
            })
            return unsubscribe;
        }
        getData().then(()=>{
            //alert(paymentHistory.length)
        }).catch((e)=>{
            alert(e)
        })
    }, [navigation])

    const toReceipt =(history)=>{
        navigation.navigate("receipt", history)
    }

    const historyItem = (history) =>{
        var g =  typeof(paymentHistory[0]) =="object" ? Date(history?.data.timestamp.seconds).indexOf("G") : "empty";
        var date = typeof(paymentHistory[0]) =="object" ? Date(history?.data.timestamp.seconds).slice(0,g) : "empty";
        
            return(
                <Pressable key={history?.id} onPress={()=>toReceipt(history)} style={{width: 300, height: 80, flexDirection: "row", alignItems: "center", justifyContent:"space-between", marginBottom: 20}} >
                <View style={{maxWidth: 200, flexDirection:"row", alignItems:"center"}}>
                    <MaterialCommunityIcons name="bank-outline" size={60} color="#ff6600" />
                    <View style={{justifyContent: "flex-start", alignItems: "center", marginLeft:10}}>
                        <Text style={{color: "black", fontSize:18, fontWeight: "bold", textAlign:"center"}} >
                            {history.data.bank}
                        </Text>
                        <Text style={{color: "#868686",fontSize: 14, fontWeight: "bold"}} >
                            KES {history.data.amount}
                        </Text>
                        <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center"}} >
                            <AntDesign name="calendar" size={24} color="#ff6600" />
                            <Text style={{color: "#6400ff"}}> {date} </Text> 
                        </View>
                    </View>
                </View>
                <Feather name="arrow-right" size={24} color="black" />
            </Pressable>
        )   
    }

    return (
        <SafeAreaView style={styles.container}> 
        {isFocused && <View style={styles.container}>
            <Text style={{fontSize: 20, textAlign: "center", color: "gray"}}>History</Text>
            <ScrollView style={{height: 200}}>
                {paymentHistory.map((history)=>{
                    if(history?.data.category == route.params.title){
                        return historyItem(history)
                    }
                })}
            </ScrollView>
            <View style={{flexDirection:"row", marginBottom: 30, alignItems:"center",justifyContent: "space-around"}} >
            <Pressable onPress={()=>{navigation.navigate("pay", {category: route.params.title})}} android_ripple={true}  style={styles.register} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Make new payment
                        </Text>
                </Pressable>
            </View>
            </View>}
        </SafeAreaView >
    )
    }

export default PaymentDetails

const styles = StyleSheet.create({
    container:{
        height:"100%",
        backgroundColor: "white",
        alignItems:"center"
    },
    register:{
        color: "white",
        width: 300,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#868686",
        marginTop: 30,
        borderRadius: 20,
    }
})
