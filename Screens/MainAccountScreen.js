import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Transfers from './Transfers';

const MainAccountScreen = ({navigation}) => {


    const [payments, setPayments] = useState(true)
    const [transfers, setTransfers] = useState(false)

    const toPayment =(title)=>{
        navigation.navigate("payment", {title:title})
    }

    const toDetails =()=>{
        navigation.navigate("transferDetails")
    }

    const togglePayment = ()=>{
        setTransfers(false); 
        setPayments(true);
    }
    const toggleTransfers=()=>{
        setPayments(false); 
        setTransfers(true)
    }
    const mTransfer = ()=>{
        navigation.navigate("transfer")
    }

    const item = (title, iconName, iconType) =>{
        return(
            <Pressable onPress={()=>{toPayment(title)}}  style={{borderRadius: 20,paddingRight: 10, paddingLeft:10, borderWidth: 2, borderColor:"#868686",width: 300, height:50, flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginBottom:30}}>
                {iconType === "ionicons" && <Ionicons name={iconName} size={20} color="#ff6600" />}
                {iconType === "FontAwesome5" && <FontAwesome5 name={iconName} size={20} color="#ff6600" />}
                    <View style={{width: 200, flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color:"#868686"}} >{title}</Text>
                        <Feather name="arrow-right" size={24} color="black" />
                    </View>
                
            </Pressable>
        )
    }
    const transfer = () =>{
        return(
            <Pressable onPress={toDetails} style={{width: 300, height: 80, flexDirection: "row", alignItems: "center", justifyContent:"space-between", marginBottom: 20}} >
                <View style={{maxWidth: 200, flexDirection:"row"}}>
                    <Avatar.Image size={75} rounded source={{uri: "https://variety.com/wp-content/uploads/2020/07/huc-ff-000185.jpg"}}  />
                    <View style={{justifyContent: "flex-start", alignItems: "center", marginLeft:10}}>
                        <Text style={{color: "black", fontSize:18, fontWeight: "bold"}} >
                            Big Boy Mando
                        </Text>
                        <Text style={{color: "#868686",fontSize: 14, fontWeight: "bold"}} >
                            Fees
                        </Text>
                        <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center"}} >
                            <AntDesign name="calendar" size={24} color="#ff6600" />
                            <Text style={{color: "#6400ff"}}> 2021-05-12 </Text>
                        </View>
                    </View>
                </View>
                <Feather name="arrow-right" size={24} color="black" />
            </Pressable>
        )
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginLeft: 20, marginRight:20}}>
                <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom: 20}}>
                    <Pressable android_ripple onPress={toggleTransfers} style={ transfers? styles.payments : styles.transfers} >
                        <Text style={{fontSize: 20, color: `${transfers ? "white" : "black" }`}}>
                            Transfers
                        </Text>
                    </Pressable>
                    <Pressable onPress={togglePayment}  android_ripple style={ payments? styles.payments : styles.transfers}  >
                        <Text style={{fontSize: 20,color: `${payments ? "white" : "black" }`}}>
                            Payments
                        </Text>
                    </Pressable>
                </View>
                {payments && <View>
                    {item("Fees", "school-outline", "ionicons")}
                    {item("Uniform", "shirt-outline", "ionicons")}
                    {item("Food", "fast-food-outline", "ionicons")}
                    {item("Stationary", "pencil-outline", "ionicons")}
                    {item("Trips", "md-bus-outline", "ionicons")}
                    {item("Loans", "money-bill", "FontAwesome5")}
                    {item("books", "book-outline", "ionicons")}
                </View>}
                {
                    transfers && <Transfers toTransfer={mTransfer} navigation={navigation}/>
                }
            </View>
        </SafeAreaView>
    )
}

export default MainAccountScreen

const styles = StyleSheet.create({
    container:{
        height: "100%",
        backgroundColor: "white",
        paddingTop: 20
    },
    transfers:{
        color: "black",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#6400ff"
    },
    payments:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6400ff",
        borderRadius: 20,
    },
})
