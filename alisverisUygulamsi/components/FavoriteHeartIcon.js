import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import FavoriteProductService from '../Services/FavoriteProductService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { getSession } from '../Services/SessionsService'; 

const FavoriteHeartIcon=({ProductId}) => {
    const  [changeFavoriteStatus,getFavoriteStatus]=FavoriteProductService();
    const[heartColor,setHeartColor]=useState();
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchProducts = async () => {
            const user = await getSession(); 
            setUser(user);
          const productStatue = await getFavoriteStatus(user.UserId,ProductId);
          if(productStatue){
            setHeartColor("red");
          }
        };
        fetchProducts();
      }, []);

const changeHeartColor=()=>{
    if(heartColor=="black"){
        setHeartColor("red");
    }
    else{
        setHeartColor("black");
    }
}

    const changeFavourite=()=>{
        changeFavoriteStatus(user.UserId,ProductId);
        changeHeartColor()
    }
  return (
    <TouchableOpacity style={styles.container} onPress={changeFavourite}>
    <Ionicons name="heart-circle-outline" size={scale(30)} color={heartColor} />
    </TouchableOpacity>
  )
}
export default FavoriteHeartIcon;
const styles = ScaledSheet.create({
    container:{
        flex:1,
    }
})