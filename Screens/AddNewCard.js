import React, { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../firebase'
import firebase from "firebase"

const AddNewCard = ({navigation}) => {

    let [fName, setFName] = useState("")
    let [Institution, setInstitution] = useState("")
    const [loading,setLoading] = useState(false)
    const [pin, setPin] = useState("")
    const [card, setCard] = useState("MasterCard")
    const [viewCards, setViewCards] = useState(true)
    const chooseProvider =(provider)=>{
        setCard(provider);
        setViewCards(false)
    }

    const createCard =() =>{
        setLoading(true)
        const userEmail = auth.currentUser.email;
        var rand = JSON.stringify(Math.random()*1000000000000)
        const dot = rand.indexOf(".")
        rand = rand.slice(0, dot)

        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, pin);
        user.reauthenticateWithCredential(credential).then((authUser)=>{
            if(authUser && fName && Institution ){
                db.collection("cardOwners").doc(userEmail).collection("cards").add({
                    fullName: fName,
                    Institution: Institution,
                    Number: rand,
                    Balance: 0,
                    provider: card,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                    navigation.goBack()
                    setLoading(false)
                    alert("Card created successfully")
                }).catch((e)=>{
                    alert(e.message)
                })
            }else{
                alert("Fields cannot be left blank if You want to continue")
            }
        }).catch((e)=>{
            alert(e)
        })

        
    }


    return (
        <SafeAreaView style={{justifyContent: "center", alignItems: "center", height:"100%", backgroundColor: "white"}}>
            {loading && <ActivityIndicator color="#ff6600" size="large" />}
            {!loading &&  <>
            <Text style={{color: "#868686", fontSize: 20,marginBottom:40, fontWeight: "bold", textAlign: "center", maxWidth: 300}}>Enter the Individual you would like to get a card for.</Text>
            <KeyboardAvoidingView>
                <View >
                    {viewCards && <View style={{flexDirection:"row", marginBottom: 15, justifyContent: "space-around"}} >
                    <Pressable onPress={()=>{chooseProvider("MasterCard")}} android_ripple={{color: "white"}} style={styles.mcard} >
                        <Text style={{fontSize: 20, color: "white"}}>
                        MasterCard
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=>{chooseProvider("Visa")}} android_ripple={{color:"white"}} style={styles.vcard} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Visa
                        </Text>
                    </Pressable>
                    </View>}
                <TextInput value={fName} onChangeText={(text)=>{setFName(text)}} autoFocus type="text" placeholder="Full Name" style={styles.inputContainer} />
                <TextInput value={Institution} onChangeText={(text)=>{setInstitution(text)}}  type="text" placeholder="Institution" style={styles.inputContainer} />
                <TextInput type="password" value={pin} onChangeText={(text)=>{setPin(text)}} secureTextEntry placeholder="Password" label="Enter Your password" style={styles.inputContainer} />
                </View>
            </KeyboardAvoidingView>
            <Pressable onPress={createCard} android_ripple  style={styles.pay} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Create New Card
                    </Text>
            </Pressable>
            </>}
        </SafeAreaView>
    )
}

export default AddNewCard

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
    mcard:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff6600",
        borderRadius: 20
    },
    vcard:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6400ff",
        borderRadius: 20
    }
})
