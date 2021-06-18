import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../firebase';

const Register = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("AccountScreen")
            }
        })
        return unsubscribe;
    }, [navigation])

    const register = ()=>{

        auth.createUserWithEmailAndPassword(email, password).then((authUser)=>{
            authUser.user.updateProfile({
                displayName: fName,
                phoneNumber: phoneNumber
            })
        }).then(()=>{
            db.collection("cardOwners").add({owner: email}).then(()=>{
                navigation.navigate("AccountScreen")
            }).catch((e)=>{
                alert(e.message)
            })
            
        }).catch((e)=>{
            alert(e.message)
        })
        
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={{marginBottom: 20, alignSelf: "center"}}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: "#ff6600", textAlign: "center"}} > Register </Text>
            </View>
            <Image style={styles.logo} source={require("../assets/icon.png")} />
            <KeyboardAvoidingView>
                <View >
                <TextInput value={fName} onChangeText={(text)=>setFName(text)} autoFocus type="text" placeholder="Full Name" label="Enter Full Name" style={styles.inputContainer} />
                <TextInput value={email} onChangeText={(text)=>setEmail(text)}  type="email" placeholder="Email" label="Enter your Email" style={styles.inputContainer} />
                <TextInput value={phoneNumber} onChangeText={(text)=>setPhoneNumber(text)}  type="text" placeholder="Phone Number" label="Enter Your Phone Number" style={styles.inputContainer} />
                <TextInput value={password} onChangeText={(text)=>setPassword(text)}  type="password" secureTextEntry placeholder="Password" label="Enter Your password" style={styles.inputContainer} />
                </View>
            </KeyboardAvoidingView>
            <View style={{height: 50}}></View>
            <Pressable android_ripple={{color:"white"}} onPress={register}  style={styles.register} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Register
                    </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    logo:{
        width: 90,
        height: 90,
        marginBottom: 30
    },
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    register:{
        color: "white",
        width: 300,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff6600",
        marginTop: 30,
        borderRadius: 20
    },
    inputContainer:{
        height: 50, 
        width: 300,
        fontSize: 20, 
        borderWidth: 2, 
        borderRadius: 20, 
        borderColor: "#ff6600", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: 10,
        paddingLeft: 20
    },
        
})
