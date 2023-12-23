import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import OrderedProducts, {getOrderedProductListWithUserId} from '../Services/OrderedProductService'
import SessionsService from '../Services/SessionsService';
import OrderedProductService from '../Services/OrderedProductService';
import ProductImage from './ProductImage';

export default  function LastOrdersUser({visible,onCancel,refreshPage}) {
    const [orders, setOrders] = useState([]);
    const [,, getSession] = SessionsService();
    const [,,getOrderedProductListWithUserId]=OrderedProductService();
   useEffect(() => {
    const fetchOrders = async () => {
        const user = await getSession();
      setOrders(await getOrderedProductListWithUserId( user.UserId));
      console.log("bizim orders: ",orders);
    };

    fetchOrders();
  }, [visible,refreshPage]);
  return (
   <Modal
        animationType="slide"
        visible={visible}>
        <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.container}>
         <ProductImage productName={item.ProductName} height={100} width={100} />
         <View>
            <Text style={styles.productInfo} >Ürün Adı:  {item.ProductName}</Text>
            <Text style={styles.productInfo} >Ürün Fiyatı:  {item.Price}₺</Text>
            <Text style={styles.productInfo} >İşlem Tarihi:  {item.Date}</Text>
            </View>
    
          </View>
        )}
      />
      <Button title="Kapat" onPress={onCancel} />
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
}

})