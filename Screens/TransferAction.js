import React, { useState } from 'react'
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native'
import { auth, db } from '../firebase';
import firebase from "firebase"

const TransferAction = ({navigation}) => {

    const [email, setEmail ] = useState("");
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
 
    const makeTransfer = ()=>{
        setLoading(true)
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        user.reauthenticateWithCredential(credential).then((authUser)=>{
            if(authUser){
                db.collection("cardOwners").doc(user.email).collection("transactions").add({
                    receiversEmail: email,
                    amount: parseInt(amount),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                    setEmail("")
                    setPassword("")
                    setAmount("")
                    alert("transaction successfully made🎉")
                    setLoading(false)
                })
            }else{
                alert("Invalid password provided")
            }
        })
    }

    return (
        <SafeAreaView style={{justifyContent: "center", alignItems: "center", height:"100%", backgroundColor: "white"}}>
            {loading && <ActivityIndicator size="large" color="#ff6600" />}
            {!loading && <>
            <Text style={{color: "#868686", fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom:20}} >Make Payments With Ease</Text>
            <KeyboardAvoidingView>
                <View >
                <TextInput value={email} onChangeText={(text)=>{setEmail(text)}} placeholder="Enter Receiver's email" style={styles.inputContainer} />
                <TextInput value={amount} onChangeText={(text)=>{setAmount(text)}} placeholder="Enter Amount" style={styles.inputContainer} />
                <TextInput value={password} onChangeText={(text)=>{setPassword(text)}}  type="password" secureTextEntry placeholder="Password"  style={styles.inputContainer} />
                </View>
            </KeyboardAvoidingView>
            <View style={{height: 50}}></View>
            <Pressable onPress={makeTransfer} android_ripple  style={styles.pay} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Make Transfer
                    </Text>
            </Pressable>
            </>}
        </SafeAreaView>
    )
}

export default TransferAction

const styles = StyleSheet.create({
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
    inputContainer:{
        height: 40, 
        width: 300,
        fontSize: 18, 
        borderWidth: 2, 
        borderRadius: 20, 
        borderColor: "#868686", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: 10,
        paddingLeft: 50
    },
})