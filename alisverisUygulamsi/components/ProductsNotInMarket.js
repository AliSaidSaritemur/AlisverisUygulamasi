import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {getProductsNotInMarket,productAddMarket} from '../Services/ProductService';
import ProductImage from './ProductImage';
import { scale } from 'react-native-size-matters';

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
  }, [refreshPage,visible,selectedProduct]);

  return (
    <Modal
    animationType="slide"
    visible={visible}>

        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Markete Çıkarılacak Ürünü Seçiniz</Text>
    <FlatList
    data={products}
    numColumns={3}
    renderItem={( {item} ) => (
      <View style={styles.container}>
              <TouchableOpacity style={[styles.button,{backgroundColor:(selectedProduct && item.Name===selectedProduct.Name)? "green":"white"}]} onPress={() =>{setSelectedProduct(item);  setRefreshPage(!refreshPage);}} >
                <Text style={styles.buttonText}>{item.Name}</Text>
            </TouchableOpacity>
      </View>
    )}
  />
  <View style={styles.imageWrapper}> 
    {selectedProduct != null ? <ProductImage  productName={selectedProduct.Name} width={scale(150)} height={scale(150)} /> : null}
    </View>
  

      <Button title="Markete Çıkar" onPress={async ()=>{
        await  productAddMarket(selectedProduct.ProductId);
        setRefreshPage(!refreshPage);
        setSelectedProduct(null);
      }} />
        <Button title="Kapat" onPress={()=>{    
      setSelectedProduct(null);
    onCancel();}} />
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
},
imageWrapper:{
  alignItems:'center',
  justifyContent:'center',
  borderWidth: 2, 
  borderColor: 'black',
  backgroundColor: '#E0FFFF',
},

})