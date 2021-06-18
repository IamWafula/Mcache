import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Button, TextInput, ActivityIndicator } from 'react-native'
import { useFonts, Staatliches_400Regular } from '@expo-google-fonts/staatliches';
import AppLoading from 'expo-app-loading';
import { auth } from '../firebase';

const Welcome = ({navigation}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("AccountScreen")
            }else{
                setLoading(false)
            }
        })
        return unsubscribe;
    }, [])

    let [fontsLoaded] = useFonts({
        Staatliches_400Regular
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <ActivityIndicator  visibility={loading} textContent={"loading..."} textStyle={{color:"#ff6600"}} size="large" color="#ff6600" />}
            {!loading && <>
                <Image style={styles.logo} source={require("../assets/icon.png")} />
                <View style={styles.textHolder}>
                    <Text style={{textAlign: "center", color: "#ff6600", marginBottom: 20, fontSize: 30 }}>Welcome</Text>
                    <Text style={styles.otherText} >
                        Pay with ease
                    </Text>
                </View>
                <View style={styles.buttonHolder}>
                    <Pressable android_ripple={{color: "white"}} onPress={()=>navigation.navigate("LogIn")}  style={styles.signIn} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Log In
                        </Text>
                    </Pressable>
                    <Pressable android_ripple={{color:"white"}} onPress={()=>navigation.navigate("Register")}  style={styles.register} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Register
                        </Text>
                    </Pressable>
                </View>
            </>}
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    logo:{
        width: 90,
        height: 90,
    },
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textHolder:{
        width: 300,
        paddingTop: 10,
        marginBottom: 10
    },
    title:{
        textAlign: "center"
    },
    otherText:{
        fontSize: 24,
        textAlign: "center"
    },
    buttonHolder:{

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
    }
})
