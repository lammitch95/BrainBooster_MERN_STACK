import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {Stack, useRouter} from 'expo-router'



const Home = () =>{
  return(
  <SafeAreaView style={{backgroundColor: 'green',width: "100%", height: "100%", display: 'flex', justifyContent: "center", alignItems: "center"}}>
    <Text style={{color: 'white', fontSize: 50}}>Home</Text>
  </SafeAreaView>
  )
}

export default Home