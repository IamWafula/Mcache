import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import {db, auth} from "../firebase"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useIsFocused } from '@react-navigation/core';

const Transfers = ({toTransfer, navigation}) => {

    const isFocused = useIsFocused()


    const [transfers, setTransfers] = useState([])

    const toReceipt =(history)=>{
        navigation.navigate("transferDetails", history)
    }

    const transferItem = (history) =>{
        var g =  typeof(transfers[0]) =="object" ? Date(history?.data.timestamp.seconds).indexOf("G") : "empty";
        var date = typeof(transfers[0]) =="object" ? Date(history?.data.timestamp.seconds).slice(0,g) : "empty";
        
            return(
                <Pressable android_ripple={{color:"#ff6600"}} key={history?.id} onPress={()=>toReceipt(history)} style={{width: 300, height: 80, flexDirection: "row", alignItems: "center", justifyContent:"space-between", marginBottom: 20}} >
                <View style={{maxWidth: 200, flexDirection:"row", alignItems:"center"}}>
                <MaterialCommunityIcons name="bank-transfer" size={60} color="#ff6600" />
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

    useEffect(()=>{
        let unsubscribe;
        let user = auth.currentUser
        const getData = async ()=>{
            unsubscribe = await db.collection("cardOwners")
            .doc(user.email).collection("transactions")
            .orderBy("timestamp", "desc").onSnapshot((snapshot)=>{
                setTransfers(
                    snapshot.docs.map((doc)=>{
                        return({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                )
            })
        return unsubscribe
        }
        getData().then(()=>{
            //do nothing
        }).catch((e)=>{
            alert(e)
        })
    }, [navigation,isFocused])
    return (
        <View>
        {isFocused && <View style={{height: 550}} >
            <Text style={{fontSize: 20, textAlign: "center", color: "gray"}}>Transactions History</Text>
            <ScrollView style={{height: 200}}>
                {transfers.map((history)=>{
                        return transferItem(history)                    
                })}
            </ScrollView>
            <View style={{flexDirection:"row", marginBottom: 30, alignItems:"center",justifyContent: "space-around"}} >
            <Pressable android_ripple={{color:"white"}}    onPress={()=>{toTransfer()}} android_ripple={true}  style={styles.register} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Transfer Funds
                        </Text>
                </Pressable>
            </View>
        </View>}
        </View>
    )
}

export default Transfers

const styles = StyleSheet.create({
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
