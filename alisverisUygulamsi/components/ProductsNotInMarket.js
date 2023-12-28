import React, { useEffect, useState } from 'react'
import {getProductsNotInMarket} from '../Services/ProductService';
import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ProductsNotInMarket({visible,onCancel}) {
    const [products, setProducts] = useState([]);   
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refreshPage,setRefreshPage]=useState(false);
useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsNotInMarket();
      setProducts(products);
    };
    fetchProducts();
  }, [refreshPage]);

  return (
    <Modal
    animationType="slide"
    visible={visible}>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Markete Çıkarılacak Ürünü Seçiniz</Text>
    <FlatList
    data={products}
    renderItem={( {item} ) => (
      <View style={styles.container}>
            <TouchableOpacity style={[styles.button,{backgroundColor:(item==selectedProduct)? "green":"white"}]} onPress={() =>{setSelectedProduct(item);  setRefreshPage(!refreshPage);}} >
                <Text style={styles.buttonText}>{item.Name}</Text>
            </TouchableOpacity>

      </View>
    )}
  />
  <Button title="Kapat" onPress={()=>{    
    onCancel();}} />
      <Button title="Markete Çıkar" onPress={()=>{
        changeIsInMarketValue(selectedProduct);
        setRefreshPage(!refreshPage);
      }} />
  </Modal>
  )
}

const styles = StyleSheet.create({

    button: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f0f8ff',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

})