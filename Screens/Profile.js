import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import { auth } from '../firebase';

const Profile = ({navigation}) => {

    const signout = ()=>{
        auth.signOut();
        navigation.navigate("Welcome")
    }

    const [image, setImage] = useState(null)

    const pickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[3, 3],
            quality: 1
        })
        if(!result.cancelled){
            setImage(result.uri)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", color:"#ff6600"}} >Profile</Text>
            <View style={{width: 300}}>
                <View style={{alignItems: "center", justifyContent:"center", marginBottom: 30}}>
                    {!image && <MaterialCommunityIcons onPress={pickImage} name="camera-plus-outline" size={50} color="#ff6600" />}
                    {image && <Avatar.Image size={75} rounded source={{uri: image}}  />}
                    <View>
                        <Text style={{color: "black", textAlign:"center", fontSize:30, fontWeight:"bold"}}>
                            The freekin Mandalorian
                        </Text>
                        <Text style={{color:"gray", textAlign:"center", fontSize:20}}> You have 3 cards under your account </Text>
                    </View>
                </View>
                <View>
                    <Text style={{color:"black", fontSize:20,marginBottom: 10}}>Your Account Details</Text>
                    <View>
                        <View style={{marginBottom:10}}>
                            <Text style={{textAlign:"left", color:"#868686", fontSize:12}}>
                                Email Address
                            </Text>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <TextInput style={{fontSize:18}} editable={false} value={"mandalorian@starwars.space"}/>
                                <AntDesign name="edit" size={24} color="#ff6600" />
                            </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            <Text style={{textAlign:"left", color:"#868686", fontSize:12}}>
                                Phone Number
                            </Text>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <TextInput style={{fontSize:18}} editable={false} value={"+254767899783930"}/>
                                <AntDesign name="edit" size={24} color="#ff6600" />
                            </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            <Text style={{textAlign:"left", color:"#868686", fontSize:12}}>
                                Password
                            </Text>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <TextInput style={{fontSize:18}} secureTextEntry editable={false} value={"mandalorian@starwars.space"}/>
                                <AntDesign name="edit" size={24} color="#ff6600" />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
                <Pressable android_ripple  style={styles.register} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Save Changes
                        </Text>
                </Pressable>
                <Pressable onPress={()=>{signout()}} android_ripple  style={styles.signOut} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Sign Out
                        </Text>
                </Pressable>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "white",
        height:"100%"

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
    signOut:{
        color: "white",
        width: 300,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1d1c1c",
        marginTop: 30,
        borderRadius: 20
    }
})
