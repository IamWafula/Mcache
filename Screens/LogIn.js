import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Pressable } from 'react-native'
import { auth } from '../firebase';

const LogIn = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("AccountScreen")
            }
        })
        return unsubscribe;
    }, [navigation])


    const signIn = () =>{
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            navigation.navigate("AccountScreen")
        }).catch((e)=>{
            alert(e.message)
        })
        
    }


    return (
        <SafeAreaView style={styles.container} >
            <View style={{marginBottom: 20, alignSelf: "center"}}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: "#6400ff", textAlign: "center"}} > Log In </Text>
            </View>
            <Image style={styles.logo} source={require("../assets/icon.png")} />
            <KeyboardAvoidingView>
                <View >
                <TextInput value={email} onChangeText={(text)=>{setEmail(text)}} type="email" placeholder="Email" label="Enter your Email" style={styles.inputContainer} />
                <TextInput value={password} onChangeText={(text)=>{setPassword(text)}} type="password" secureTextEntry placeholder="Password" label="Enter Your password" style={styles.inputContainer} />
                </View>
            </KeyboardAvoidingView>
            <View style={{height: 50}}></View>
            <Pressable android_ripple onPress={signIn} style={styles.signIn} >
                    <Text style={{fontSize: 20, color: "white"}}>
                        Log In
                    </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default LogIn

const styles = StyleSheet.create({
    logo:{
        width: 90,
        height: 90,
        marginBottom: 10
    },
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    signIn:{
        color: "white",
        width: 300,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6400ff",
        marginTop: 30,
        borderRadius: 20
    },
    formContainer:{
        width: 400,
        justifyContent: "space-around"
    },
    inputContainer:{
        height: 50, 
        width: 300,
        fontSize: 20, 
        borderWidth: 2, 
        borderRadius: 20, 
        borderColor: "#6400ff", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: 10,
        paddingLeft: 50
    },
})
