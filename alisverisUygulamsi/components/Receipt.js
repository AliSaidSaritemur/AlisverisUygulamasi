import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getOrderedProductListWithUserId} from '../Services/OrderedProductService';
import { scale } from 'react-native-size-matters';
import { getProductWithId } from '../Services/ProductService';
import ProductImage from './ProductImage';
import { getSessionsRole } from '../Services/SessionsService';

export default  function Receipt({visible,onCancel,user,date}) {
    const [list, setList] = useState([]);
    const [role, setRole] = useState("user");
    const [Isloading,setIsLoading]=useState(false);
    useEffect(() => {
      const fetchOrders = async () => {
        setRole(await getSessionsRole());
        setIsLoading(true);
        const orderProductData = await getOrderedProductListWithUserId(user.UserId,date);
        const productDetails = await Promise.all(orderProductData.map(item => getProductWithId(item.ProductId)));
        const mergedProducts = orderProductData.map((orderProduct, index) => {
          const matchingProduct = productDetails[index];
          console.log(user)
          return { ...matchingProduct, ...orderProduct };
        });
        setList(mergedProducts);
      };
    if(visible==true)
      fetchOrders();
    }, [date,visible]);

  return (
  <Modal
        animationType="slide"
        visible={visible}>
<Text style={styles.userMailText}>
  {(user!=null && role == "admin") ?"Kullanıcı Maili :  " + user.Email : null}
</Text>
        <FlatList
        data={list}
        renderItem={( {item} ) => (
          <View style={styles.container}>

          <ProductImage productName={item.Name} height={scale(70)} width={scale(70)} />

         <View style={styles.productInfoContainer}>
             <Text style={styles.productInfo} >Ürün Adı:  {item.Name}</Text>
            <Text style={styles.productInfo} >Ürün Fiyat:  {item.Price}</Text>
            <Text style={styles.productInfo} >Ürün Adedi:  {item.Count}</Text>
            <Text style={styles.productInfo} >İşlem Ücreti:  {item.Price*item.Count}₺</Text> 
  
            </View>
    
          </View>
        )}
      />
      <Button title="Kapat" onPress={()=>{
        setList([]);
        setIsLoading(false);       
        onCancel();}} />
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

  userMailText:{
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    alignSelf:'center'
  }
})