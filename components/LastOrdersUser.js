import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getSession} from '../Services/SessionsService';
import ProductImage from './ProductImage';
import {getOrderedProducPackagetListWithUserId} from '../Services/OrderedProductPackageService';
import { scale } from 'react-native-size-matters';
import Receipt from './Receipt';

export default  function LastOrdersUser({visible,onCancel,refreshPage}) {
    const [orders, setOrders] = useState([]);
    const [receiptVisible, setReceiptVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchOrders = async () => {
        const sessionUser = await getSession();
        if (sessionUser) {
          const userOrders = await getOrderedProducPackagetListWithUserId(sessionUser.UserId);
          userOrders.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setOrders(userOrders);
        }
        setLoading(false);
      };
    
      fetchOrders();
    }, [visible, refreshPage]);

const getReciepe=(date)=>{
  setDate(date);
  setReceiptVisible(true);
}

  return (
   <Modal
        animationType="slide"
        visible={visible}>
        <FlatList
        keyExtractor={(item) => item.Date}
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity onPress={()=>getReciepe(item.Date)}>
       <Ionicons name="newspaper-outline" size={scale(100)} color="orange" />
      </TouchableOpacity>
         <View style={styles.productInfoContainer}>
            <Text style={styles.productInfo} >İşlem Ücreti:  {item.TotalPrice}₺</Text>
            <Text style={styles.productInfo} >İşlem Tarihi:  {item.Date}</Text>
            <Text style={styles.productInfo} >Adress:  {item.Adress}</Text>
            </View>
    
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} 
        onPress={onCancel}>
        <Text>Kapat</Text>
      </TouchableOpacity> 
      {!loading && user && (
          <Receipt 
            visible={receiptVisible} 
            onCancel={()=>setReceiptVisible(false)} 
            userId={user.UserId} 
            userMail={user.Email} 
            refreshPage={refreshPage} 
            date={date}
          />
        )}
      </Modal>
     

  )
}

const styles = StyleSheet.create({
container:{
   flexDirection:'row', 
  alignItems:'center',
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    padding: 10,
    borderWidth:2,
    borderColor:'#000',
},
productInfo:{
    fontSize: 16,
    fontWeight: 'bold',
},
button:{
  width: '50%',
  height: 50,
  borderWidth: 0.5,
  borderRadius: 10,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
  marginLeft:20,
  backgroundColor: '#00fa9a',
},
productInfoContainer:{
  marginLeft: 10,},

})