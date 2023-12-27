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
    useEffect(() => {
      const fetchOrders = async () => {
        const sessionUser = await getSession();
        setUser(sessionUser);
        if (sessionUser) {
          const userOrders = await getOrderedProducPackagetListWithUserId(sessionUser.UserId);
          userOrders.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setOrders(userOrders);
        }
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
      <Button title="Kapat" onPress={onCancel} />
      <Receipt visible={receiptVisible} onCancel={()=>setReceiptVisible(false)} 
      user={user} refreshPage={refreshPage} date={date}/>
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
},
productInfo:{
    fontSize: 16,
    fontWeight: 'bold',
},
productInfoContainer:{
  marginLeft: 10,},

})