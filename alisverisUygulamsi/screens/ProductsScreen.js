import { StyleSheet, View,Platform,ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import ProductDetail from '../components/ProductDetail'
import { addOrderedProduct } from '../Services/OrderedProductService'
import { addBasketProduct } from '../Services/BasketProductService'
import { getSession } from '../Services/SessionsService';
import { incrementSalesCount } from '../Services/ProductService';

export default function ProductsScreen({ navigation }) {
  const [modalProductDetailVisible, setModalProductDetailVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setRefreshPage(!refreshPage);
    };
    navigation.addListener('focus', () => {
      fetchProducts();
    });

  }, [navigation, refreshPage]);


  const startModalProductDetail = (product) => {
    setProduct(product);
    setModalProductDetailVisible(true)


  };
  const endModalProductDetail = () => {
    setRefreshPage(!refreshPage);
    setModalProductDetailVisible(false)
  }
  const buyPorduct = async (product) => {
    await incrementSalesCount(product.Name, 1);
    const user = await getSession();
    addOrderedProduct(user, product);
    setRefreshPage(!refreshPage);
    if(Platform.OS === "android"){
      ToastAndroid.show("Ürün satın alındı.", ToastAndroid.SHORT); 
    }
  }
  const addProductToBasket = async (product) => {
    const user = await getSession();
    addBasketProduct(user.UserId, product.ProductId);
    if(Platform.OS === "android"){
      ToastAndroid.show("Ürün sepete eklendi.", ToastAndroid.SHORT);
    }
  }

  return (
    <View>

      <ProductList onPressProduct={startModalProductDetail} onRefreshPage={refreshPage} />
      <ProductDetail visible={modalProductDetailVisible} product={product} onBuyProduct={buyPorduct} onCancel={endModalProductDetail}
        onAddProdutToBasket={addProductToBasket}
      />
    </View>
  )
}

const styles = StyleSheet.create({})