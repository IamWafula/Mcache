import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'; 

const TransferDetails = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: 300, height: "80%",justifyContent: "center", borderWidth: 2, borderColor: "#868686", borderRadius: 20, padding: 20}}>
                <View style={{flexDirection: "row", justifyContent:"space-between", marginBottom: 10}}>
                    <Text style={{color: "#868686", fontWeight:"bold", fontSize: 20}}> Sent to :</Text>
                    <Text style={{color: "#ff6600", fontWeight:"bold", fontSize: 20}}> BigD the great</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between", marginBottom: 10}}>
                    <Text style={{color: "#868686", fontWeight:"bold", fontSize: 20}}> Status :</Text>
                    <Text style={{color: "#ff6600", fontWeight:"bold", fontSize: 20}}> Success</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between", marginBottom: 10}}>
                    <Text style={{color: "#868686", fontWeight:"bold", fontSize: 18}}> ID :</Text>
                    <Text style={{color: "#ff6600", fontWeight:"bold", fontSize: 18}}>BUYy576gbhbHGHgGGVu</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between", marginBottom: 10}}>
                    <Text style={{color: "#868686", fontWeight:"bold", fontSize: 16}}> Card Used :</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{color: "#ff6600", fontWeight:"bold", fontSize: 16}}> 4557728826789</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between", marginBottom: 10}}>
                    <Text style={{color: "#868686", fontWeight:"bold", fontSize: 16}}> Amount Used :</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{color: "#ff6600", fontWeight:"bold", fontSize: 16}}> $500.00</Text>
                </View>
                <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center"}} >
                        <AntDesign name="calendar" size={24} color="#ff6600" />
                        <Text style={{color: "#6400ff"}}> 2021-05-12 </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TransferDetails

const styles = StyleSheet.create({
    container:{height: "100%",
    alignItems: "center",
    backgroundColor: "white"}
})
