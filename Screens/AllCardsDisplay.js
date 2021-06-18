import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator} from 'react-native'
import { Avatar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'; 
import { auth, db } from '../firebase'

const AllCardsDisplay = ({navigation}) => {

    const [cards, setCards] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        
        const getUser = async()=>{
            var user = {

            }
            const holder = await auth.currentUser
            
            user.email = holder.email
            user.displayName = holder.displayName
            user.photoURL = holder.photoURL
            user.phoneNumber = holder.phoneNumber

            if(user){
                setUser(user)
            }

        }
        getUser()
        let unsubscribe;
        const gD = async  ()=>{
            unsubscribe = await db.collection("cardOwners").doc(auth.currentUser.email).collection("cards").onSnapshot((snapshot)=>{
                
                setCards(
                    snapshot.docs.map((doc)=>({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
                
            })
        }          
        gD().then(()=>{
            setTimeout(()=>{
                setLoading(false)
            }, 3000)
            
        }).catch((e)=>{
            alert(e)
        }) 
    }, [])

    const toCard = (card,i) =>{
        navigation.navigate("card", {card: card, id: i})
    }

    const card = (cardData, i)=>{
        if(cardData){return(
            <Pressable  key={i} onPress={()=>toCard(cardData, i)} android_ripple={{color:`${cardData.provider == "MasterCard"? "#ff6600" :"#6400ff"}`}} style={{width: 300, height: 200, borderRadius: 20, borderColor: `${cardData.provider == "MasterCard" ? "#ff6600" :"#6400ff"}`, borderWidth: 0.5, marginLeft: 30, display: "flex", padding: 10}}>
                        {cardData.provider == "MasterCard" && <View style={{ flexDirection:"row", alignItems: "center", justifyContent:"space-around" }} >
                            <Image source={{uri: "https://banner2.cleanpng.com/20180812/gcv/kisspng-mastercard-foundation-logo-vector-graphics-yttyouth-engagement-self-assessment-tool-survey-5b6fec07b57060.2687662215340615757432.jpg"}} style={{width: 60, height:60}}/>
                            <Text style={{color:"#6400ff", fontSize:18, fontWeight:"800"}}> {cardData.Number} </Text>
                        </View>}
                        {cardData.provider == "Visa" && <View style={{ flexDirection:"row", alignItems: "center", justifyContent:"space-around" }} >
                            <Image source={{uri: "https://banner2.cleanpng.com/20180705/auy/kisspng-visa-debit-card-credit-card-logo-mastercard-supermercado-5b3daa406f9d67.4063706315307679364572.jpg"}} style={{width: 80, height:60}}/>
                            <Text style={{color:"#6400ff", fontSize:18, fontWeight:"800"}}> {cardData.Number} </Text>
                        </View>}
                        <View style={{alignItems: "center", justifyContent:"center"}}>
                            <Text style={{color:"black", fontSize:20,  fontWeight: "800"}}> Balance: </Text>
                            <Text style={{color:"#868686",fontSize:30,  fontWeight: "800"}}> KES. {cardData.Balance} </Text>
                        </View>
                        <View style={{position: "absolute", height:100, width:200, borderRadius: 10, padding:5, backgroundColor:"#868686", bottom: -50, left:-20, flexDirection:"row"}} >
                            <Ionicons name="person-outline" size={50} color="white" />
                            <View style={{marginLeft:20}}>
                                <Text style={{color: "white", fontSize:10}}>HOLDER</Text>
                                <Text style={{color: "white", fontSize:16}}>{cardData.fullName}</Text>
                                <Text style={{color: "white", fontSize:12}}>{cardData.Institution}</Text>
                            </View>
                        </View>
                </Pressable>
        )}
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardHolder}>
                <Avatar.Image size={75} rounded source={{uri: user.photoURL || "https://variety.com/wp-content/uploads/2020/07/huc-ff-000185.jpg"}}  />
                <Text style={{color: "black", fontSize: 18, textAlign:"center"}}>{user.displayName}</Text>
                <Text style={{color: "gray", fontSize: 12, textAlign:"center"}}>You have {cards.length} cards 🚀 </Text>
            </View>
            <Text style={styles.headerText} >My Cards</Text>
            {loading && <ActivityIndicator visibility={loading} textContent={"loading..."} textStyle={{color:"#ff6600"}} size="large" color="#ff6600" />}
            {!loading && <>
            {cards.length > 0 && <ScrollView contentContainerStyle={{paddingRight:20}} horizontal={true} fadingEdgeLength={0.8} >
                {cards.map((obj)=>{
                    return(
                        card(obj.data, obj.id)
                    )
                })}
            </ScrollView>}
            {cards.length < 1 &&
                <Pressable onPress={toCard} style={styles.card}>
                        <Text style={{fontSize: 24, fontWeight: "bold", color:"#ff6600", textAlign: "center", textAlignVertical:"center"}}>Looks like you have no cards linked to this account!</Text>
                </Pressable>
            }
            </>}
            <View style={{width: "100%", height: 200, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}} >
                <View style={{borderRadius: 20}}>
                    <Pressable onPress={()=>{navigation.navigate("newCard")}} android_ripple={{color:"lightgray"}} style={styles.actions} >
                        <Text style={{fontSize: 20, color: "white"}}>
                            Add New Card
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
        }
export default AllCardsDisplay

const styles = StyleSheet.create({
    container:{
        height: "100%",
        backgroundColor: "white"
    },
    headerText:{
        fontWeight: "900",
        fontSize: 30,
        color: "#6410ff",
        textAlign: "center",
        marginBottom: 20
    },
    cardHolder:{
        marginBottom: 20,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: 200
    },
    card:{
        width: 300,
        height: 200,
        borderRadius: 20,
        borderColor: "#ff6600",
        borderWidth: 0.5,
        marginLeft: 30,
        display: "flex",
        padding: 10
    },
    history:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1d1c1c",
        borderRadius: 20
    },
    actions:{
        color: "white",
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#868686",
        borderRadius: 20
    }
})

