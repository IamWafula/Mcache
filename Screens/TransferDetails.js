import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

const TransferDetails = ({navigation, route}) => {
    var g = Date(route.params.data?.timestamp.seconds).indexOf("G")
    var date = Date(route.params?.data.timestamp.seconds).slice(0,g)
    const data = route.params.data
    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: 150, width: "100%", alignItems: "center", marginTop: 0, justifyContent:"center"}}>
                <Image style={{height: 90, width: 90}} source={require("../assets/icon.png")} />
            </View>
            <View style={{alignItems: "center", justifyContent:"center"}}>
                <Text style={{color:"#868686", fontSize: 20, fontWeight: "bold", textAlign:"center", marginBottom: 10}}>Mcache Transfer</Text>
                <View style={{flexDirection:"row", justifyContent: "space-between", borderBottomWidth: 2, borderBottomColor:"lightgray", paddingBottom: 10}}>
                    <View style={{marginRight: 100}}>
                        <MaterialCommunityIcons name="bank-outline" size={60} color="#ff6600" />
                        
                    </View>
                    <View style={{alignItems:"flex-start"}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", color:"black"}}>Transaction Type</Text>
                        <Text style={{fontSize: 16, fontWeight: "bold", color:"#ff6600"}}>Peer transfer</Text>
                        <Text style={{fontSize: 18, fontWeight: "bold", color:"black"}}>Transaction ID</Text>
                        <Text style={{fontSize: 16, fontWeight: "bold", color:"#ff6600"}}>{route.params.id}</Text>

                    </View>
                </View>
                <View style={{paddingTop: 20, width: 300}}>
                    <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-evenly", marginBottom:10}}>
                        <MaterialCommunityIcons name="account-cash" size={24} color="#868686" />
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#868686"}} > Email. : </Text>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize:18, fontWeight:"bold", color:"#6400ff"}}>{data.receiversEmail}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-evenly", marginBottom:10}}>
                        <FontAwesome5 name="money-check" size={24} color="#868686" />
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#868686"}} > Amount Transacted: </Text>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#6400ff"}}>KES {data.amount}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-evenly", marginBottom:10}}>
                        <MaterialCommunityIcons name="calendar" size={24} color="#ff6600" />
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#6400ff"}}>{date}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TransferDetails

const styles = StyleSheet.create({
    container:{
        height: "100%",
        backgroundColor: "white",
        justifyContent: "flex-start"
    }
})
