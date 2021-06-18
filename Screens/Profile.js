import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import { auth, storageRef } from '../firebase';
import firebase from "firebase"

const Profile = ({navigation}) => {
    const signout = ()=>{
        auth.signOut();
        navigation.popToTop()
    }
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [editPhone, setEditPhone] = useState(false)
    const [editEmail, setEditEmail] = useState(false)

    const [image, setImage] = useState(auth.currentUser.photoURL)

    useEffect(()=>{
        setUser(auth.currentUser)
        setEmail(auth.currentUser.email)
        setPhoneNumber(auth.currentUser.phoneNumber)
    }, [navigation])

    const resetPassword = ()=>{
        auth.sendPasswordResetEmail(user.email).then(()=>{
            alert("A password Reset Email has been sent to "+user.email)
        }).catch((e)=>{
            alert(e)
        })
    }

    const updateUser = () =>{
        auth.currentUser.updateProfile({
            email: email,
            phoneNumber: phoneNumber
        }).then(()=>{
            alert("The user was successfully updated")
        }).catch((e)=>{
            alert(e)
        })
    }


    const pickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[3, 3],
            quality: 1
        })
        if(!result.cancelled){
            setImage(result.uri)
            var response = await fetch(result.uri)
            const blob = await response.blob()
            var imageRef = storageRef.child(auth.currentUser.email)

            imageRef.put(blob).then((snapshot)=>{
                imageRef.getDownloadURL().then((url)=>{
                    auth.currentUser.updateProfile({
                        photoURL: url
                    }).then(()=>{
                        setImage(url)
                    }).catch((e)=>{
                        alert(e)
                    })
                    
                }).catch((e)=>{
                    alert(e)
                })
            }).catch((e)=>{
                alert(e)
            })

            
            
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", color:"#ff6600"}} >Profile</Text>
            <View style={{width: 300}}>
                <View style={{alignItems: "center", justifyContent:"center", marginBottom: 30}}>
                    {!image && <MaterialCommunityIcons onPress={pickImage} name="camera-plus-outline" size={50} color="#ff6600" />}
                    {image && <Avatar.Image size={75} rounded source={{uri: image || auth.currentUser.photoURL }}  />}
                    <View>
                        <Text style={{color: "black", textAlign:"center", fontSize:30, fontWeight:"bold"}}>
                            {user.displayName}
                        </Text>
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
                                {!editEmail && <TextInput style={{fontSize:18}} editable={false} value={email}/>}
                                {editEmail &&  <TextInput style={{fontSize:18}} onChangeText={()=>{setEmail(text)}} editable={true} value={email}/>}
                                <Pressable onPress={()=>{setEditEmail(!editEmail)}} >
                                    <AntDesign name="edit" size={24} color="#ff6600" />
                                </Pressable>
                            </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            <Text style={{textAlign:"left", color:"#868686", fontSize:12}}>
                                Phone Number
                            </Text>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                               {!editPhone && <TextInput style={{fontSize:18}} editable={false} value={phoneNumber !== null? phoneNumber : "Add"}/>}
                               {editPhone && <TextInput style={{fontSize:18}} editable={true} onChangeText={(text)=>{setPhoneNumber(text)}} value={phoneNumber} />}
                                <Pressable onPress={()=>{setEditPhone(!editPhone)}} >
                                    <AntDesign name="edit" size={24} color="#ff6600" />
                                </Pressable>
                            </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            <Text style={{textAlign:"left", color:"#868686", fontSize:12}}>
                                Password
                            </Text>
                            <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"center", paddingRight: 10}}>
                                <TextInput style={{fontSize:18}} secureTextEntry editable={false} value={"mandalorian@starwars.space"}/>
                                <Pressable onPress={resetPassword} style={{width: 60, padding: 5, backgroundColor: "red", marginRight: 10, borderRadius: 5}}>
                                    <Text style={{fontSize: 18, color: "white"}}>Reset</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
                <Pressable onPress={updateUser} android_ripple  style={styles.register} >
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
