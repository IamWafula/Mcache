import React, { useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import firebase from "firebase"
import { auth, db } from '../firebase'

const PaymentScreen = ({navigation, route}) => {

    const [institution, setInstitution] = useState("")
    const [bank, setBank] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [studentId, setStudentId] = useState("")
    const [password, setPassword] = useState("")
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)

    const pay=()=>{
        setLoading(true)
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        )
        user.reauthenticateWithCredential(credential).then((authUser)=>{
            if(authUser){
                db.collection("cardOwners").doc(user.email).collection("payments").add({
                    category: route.params.category,
                    institution: institution,
                    bank: bank,
                    accountNumber: accountNumber,
                    studentId: studentId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    amount: parseInt(amount)
                }).then(()=>{
                    setInstitution("")
                    setBank("")
                    setAmount("")
                    setAccountNumber("")
                    setStudentId("")
                    setPassword("")
                    navigation.navigate("home")
                    setLoading(false)
                    alert(route.params.category +" payment made successfully!")
                }).catch((e)=>{
                    alert(e)
                })
            }else{
                alert("wrong password provided")
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
                <TextInput value={institution } onChangeText={(text)=>{setInstitution(text)}} autoFocus type="text" placeholder="Institution Name" style={styles.inputContainer} />
                <TextInput value={bank} onChangeText={(text)=>{setBank(text)}} placeholder="Enter Bank Name" style={styles.inputContainer} />
                <TextInput value={amount} onChangeText={(text)=>{setAmount(text)}} placeholder="Enter Amount" style={styles.inputContainer} />
                <TextInput value={accountNumber} onChangeText={(text)=>{setAccountNumber(text)}}  placeholder="Enter Account Number" style={styles.inputContainer} />
                <TextInput value={studentId} onChangeText={(text)=>{setStudentId(text)}} placeholder="Enter Student's ID" style={styles.inputContainer} />
                <TextInput value={password} onChangeText={(text)=>{setPassword(text)}}  type="password" secureTextEntry placeholder="Password"  style={styles.inputContainer} />
                </View>
            </KeyboardAvoidingView>
            <View style={{height: 50}}></View>
            <Pressable onPress={pay} android_ripple={{color: "white"}}  style={styles.pay} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Pay
                    </Text>
            </Pressable>
            </>}
        </SafeAreaView>
    )
}

export default PaymentScreen

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
