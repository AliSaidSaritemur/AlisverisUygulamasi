import React, { useState, useEffect } from 'react';
import { StyleSheet,StatusBar,FlatList, Text, View,Image, Button,TouchableOpacity } from 'react-native';
import AdminProductDetail from '../components/AdminProductDetail'
import ProductList from '../components/ProductList'
import AddProduct from '../components/AddProduct'

export default function AdminProductsScreen({ navigation }) {
  const [product, setProduct] = useState(null);
  const [modalAdminProductDetailVisible,setModalProductDetailVisible]=useState(false);
  const[refreshPage,setRefreshPage]=useState(false);
  const[modalAddProductIsVisible,setModalAddProductVisible]=useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setRefreshPage(!refreshPage);
    };
     navigation.addListener('focus', () => {
      fetchProducts();
    });
  
  }, [navigation,refreshPage]);

  const startModalAdminProductDetail=(product)=>{
    setProduct(product);
    console.log(product);
    setModalProductDetailVisible(true);
  };
  const endModalAdminProductDetail=()=>{
    setRefreshPage(!refreshPage);
    setModalProductDetailVisible(false);
  };
  const startModalAddProduct=()=>{
    setModalAddProductVisible(true);
  };
  const endModalAddProduct=()=>{
    setRefreshPage(!refreshPage);
    setModalAddProductVisible(false);
  };



  return (
    <View style={styles.container}>
      <ProductList onPressProduct={startModalAdminProductDetail} onRefreshPage={refreshPage}/>
      <AdminProductDetail visible={modalAdminProductDetailVisible} product={product} onCancel={endModalAdminProductDetail}/>
     
      <TouchableOpacity style={styles.button} onPress={()=>startModalAddProduct()}>
        <Text style={styles.buttonText}>Ürün Ekle</Text>
      </TouchableOpacity>  
      <AddProduct visible={modalAddProductIsVisible} onCancel={endModalAddProduct}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent:'center',
    justifyContent:'center'
  },
  button: {
    backgroundColor: '#0085CA',
    padding: 10,
    margin: 10,
    alignContent:'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignContent:'center',
    justifyContent:'center',
  }
})