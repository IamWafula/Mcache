import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase';

const CardsDisplay = ({navigation, route}) => {
    const [cardHistory, setCardHistory] = useState([])
    

    useEffect(() => {
        let unsubscribe;
        let user = auth.currentUser
        console.log(user)
        const getHistory = async()=>{
            unsubscribe = await db.collection("cardOwners")
            .doc(user.email).collection("cards")
            .doc(`${route.params.card.Number}`).collection("transactions").orderBy("timestamp", "desc").onSnapshot((snapshot)=>{
                setCardHistory(
                    snapshot.docs.map((doc)=>{
                        return(
                            {
                                id: doc.id,
                                data: doc.data()
                            }
                        )
                        
                    })
                )
            })
            
            return unsubscribe;
        }
        getHistory().then(()=>{
            //empty
        }).catch((e)=>{
            alert(e)
        })
    }, [navigation])


    const historyItemIn = (amount, id)=>{
        return(
            <View key={id} style={{height: 40, flexDirection: "row",width:300, alignItems:"center", justifyContent: "space-around"}} >
                <MaterialIcons name="call-received" size={24} color="#6400ff" />
                <Text style={{color:"#6400ff", fontSize: 20, fontWeight: "400"}}> Deposit </Text>
                <Text style={{color:"#868686", fontSize: 20, fontWeight: "400"}}>+ {amount} USD</Text>
            </View>
        )
    }
    const historyItemOut = (amount, id)=>{
        return(
            <View key={id} style={{height: 40, flexDirection: "row",width:300, alignItems:"center", justifyContent: "space-around"}} >
                <MaterialCommunityIcons name="call-made" size={24} color="#ff6600" />
                <Text style={{color:"#6400ff", fontSize: 20, fontWeight: "400"}}> Spent </Text>
                <Text style={{color:"#868686", fontSize: 20, fontWeight: "400"}}>- {amount} USD</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginBottom: 20, alignItems:"center", justifyContent:"center"}}>
            <Ionicons name="person-outline" size={50} color="#ff6600" />
                <Text style={{color: "#6400ff", fontSize: 20, textAlign: "center"}}> {route.params.card.fullName} </Text>
                <Text style={{color: "gray", fontSize: 18, textAlign:"center"}}> Student at {route.params.card.Institution}</Text>
            </View>
            <View style={styles.card}>
            {route.params.card.provider == "MasterCard" && <Image source={{uri: "https://banner2.cleanpng.com/20180812/gcv/kisspng-mastercard-foundation-logo-vector-graphics-yttyouth-engagement-self-assessment-tool-survey-5b6fec07b57060.2687662215340615757432.jpg"}} style={{width: 60, height:60, marginRight: 10}}/>}
            {route.params.card.provider == "Visa" && <Image source={{uri: "https://banner2.cleanpng.com/20180705/auy/kisspng-visa-debit-card-credit-card-logo-mastercard-supermercado-5b3daa406f9d67.4063706315307679364572.jpg"}} style={{width: 80, height:60, marginRight: 10}}/>}
            
                <View>
                    <View style={styles.dataRow}>
                        <Text style={styles.key}>Balance: </Text>
                        <Text style={styles.value} >${ route.params.card.Balance}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.key}>Card Number: </Text>
                        <Text style={styles.value} >{route.params.card.Number}</Text>
                    </View>
                    {/* <View style={styles.dataRow}>
                        <Text style={{fontSize: 12, fontWeight: "bold", color:"red"}}>Created On:</Text>
                        <Text style={{fontSize: 12, fontWeight: "bold", color:"red"}}> {toString(route.params.timestamp)}  </Text>
                    </View> */} 
                </View>
            </View>
            <View style={{height: 300}} >
                <Text style={{color:"gray", fontSize: 20, textAlign:"center"}} >History</Text>
            <ScrollView >
                {
                    cardHistory.map((card)=>{
                
                            if(card.data.type === "Deposit"){
                                return(
                                    historyItemIn(card.data.amount, card.id)
                                )
                            }
                            if(card.data.type === "Spend"){
                                return(
                                    historyItemOut(card.data.amount, card.id)
                                )
                            }
                        
                    })
                }
            </ScrollView>
            </View>
            <Pressable android_ripple={{color: "white"}} onPress={()=>navigation.navigate("deposit", {cardNumber: route.params.card.Number, Id: route.params.id})} style={styles.pay} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Add To Card
                    </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default CardsDisplay

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center"
    },
    card:{
        width: 320,
        height: 100,
        borderRadius: 20,
        borderColor: "#868686",
        padding: 20,
        flexDirection: "row",
        borderWidth: 2
    },
    cardImage:{
        height: 40,
        width: 80,
        alignSelf: "center"
    },
    dataRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 150
    },
    key:{
        color: "#1d1c1c",
        fontSize: 14
    },
    value:{
        color: "#6400ff",
        fontSize: 14
    },
    pay:{
        color: "white",
        width: 300,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#868686",
        marginTop: 30,
        borderRadius: 20
    },
})
