import React, { useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../firebase'
import firebase from "firebase"

const AddToCard = ({navigation, route}) => {
    const [amount, setAmount] = useState("0")
    const [password, setPassword] = useState("")
    const [loading, setLoading] =useState(false)
     const addToCard = () =>{
        setLoading(true)
        const user = auth.currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        )
        user.reauthenticateWithCredential(credential).then((authUser)=>{
            if(authUser){
                const increment = firebase.firestore.FieldValue.increment(parseInt(amount))
                const cardRef = db.collection("cardOwners").doc(user.email).collection("cards").doc(route.params.Id)
                cardRef.update({Balance: increment}).then(()=>{
                    alert("deposit made successfully")
                }).catch((e)=>{
                    alert(e)
                })
                db.collection("cardOwners").doc(user.email).collection("cards").doc(route.params.cardNumber).collection("transactions").add({
                    type: "Deposit",
                    amount: amount,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                    navigation.goBack()
                    setLoading(false)
                }).catch((e)=>{
                    alert(e)
                })
            }
            
        }).catch((e)=>{
            alert(e.message)
        })

    }
    return ( 
        <SafeAreaView style={{justifyContent: "center", alignItems: "center", height:"100%", backgroundColor: "white"}}>
            {loading && <ActivityIndicator size="large" color="#ff6600" />}
            {!loading && <>

            <Text style={{color: "#868686", fontSize: 20,marginBottom:40, fontWeight: "bold", textAlign: "center", maxWidth: 300}}>Enter The Amount You wish to Add</Text>
            <KeyboardAvoidingView>
                <View >
                <TextInput type="number" value={amount}  onChangeText={(text)=>{setAmount(text)}} placeholder="Enter Amount" style={styles.inputContainer} />
                <TextInput type="password" vaue={password} onChangeText={(text)=>{setPassword(text)}} secureTextEntry placeholder="Password" label="Enter Your password" style={styles.inputContainer} />
                </View>
            </KeyboardAvoidingView>
            <View style={{height: 50}}></View>
            <Pressable onPress={addToCard} android_ripple  style={styles.pay} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Add
                    </Text>
            </Pressable>
            </>}
        </SafeAreaView>
    )
}

export default AddToCard

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
        height: 50, 
        width: 300,
        fontSize: 20, 
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
