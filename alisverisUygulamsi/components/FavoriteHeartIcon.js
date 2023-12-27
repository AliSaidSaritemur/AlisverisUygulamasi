import { TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import {changeFavoriteStatus,getFavoriteStatus} from '../Services/FavoriteProductService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { getSession } from '../Services/SessionsService'; 

const FavoriteHeartIcon=({ProductId}) => {
    const[heartColor,setHeartColor]=useState();
    const [user, setUser] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
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
    if(heartColor!="red"){
        setHeartColor("red");
    }
    else{
        setHeartColor("black");
    }
}

    const changeFavourite=async ()=>{
      setIsProcessing(true);
      changeHeartColor()
      await  changeFavoriteStatus(user.UserId,ProductId);
        setIsProcessing(false);
    }
  return (
    <TouchableOpacity style={styles.container} onPress={changeFavourite}>
    <Ionicons name="heart-circle-outline" size={scale(30)} color={heartColor} disabled={isProcessing} />
    </TouchableOpacity>
  )
}
export default FavoriteHeartIcon;
const styles = ScaledSheet.create({
    container:{
        flex:1,
    }
})