import { FlatList, StyleSheet, Text, Touchable, View, TouchableOpacity,ToastAndroid,Platform, ScrollView  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getSession } from '../Services/SessionsService';
import BasketProduct from '../components/BasketProduct';
import { getUserBasketTotalPrice, clearUserBasket, getBasketProductListWithUserId } from '../Services/BasketProductService';
import { addOrderedProducts } from '../Services/OrderedProductService';
import { incrementSalesCount, getProductWithId } from '../Services/ProductService';


export default function BasketScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isProductRemoved, setIsProductRemoved] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      const currentUser = await getSession();
      setUser(currentUser);
      setProducts(await getBasketProductListWithUserId(currentUser.UserId));
      const price = await getUserBasketTotalPrice(currentUser.UserId);
      setTotalPrice(price);
    };
    navigation.addListener('focus', () => {
      fetchProducts();
    });
    fetchProducts();
  }, [isProductRemoved, navigation]);

  const payBasket = async () => {

    if (products == null || products.length == 0) {
      if(Platform.OS === "android"){
        ToastAndroid.show("Sepetinizde Ürün Bulunmamaktadır.", ToastAndroid.SHORT); 
      }
      return;
    }

    addOrderedProducts(user, products, totalPrice);
    products.forEach(item => {
      productUpdateSalesCount(item);
    })
    clearUserBasket(user.UserId);
    setProducts([]);
    setTotalPrice(0);
    setIsProductRemoved(isProductRemoved + 1);
    if(Platform.OS === "android"){
      ToastAndroid.show("Ödeme Başarılı.", ToastAndroid.SHORT); 
    }
  }
  const productUpdateSalesCount = async (basketProduct) => {
    const product = await getProductWithId(basketProduct.ProductId);
    incrementSalesCount(product.Name, basketProduct.Count);
  }

  return (
    
    <View style={styles.container}>
      <FlatList 
        data={products}
        renderItem={({ item }) =>
        (
          <BasketProduct basketProduct={item} onIsProductRemoved={setIsProductRemoved} />
        )}
        scrollEnabled={true}
      />
      <View style={styles.paymentContainer}>
        <Text style={styles.totalPrice}>Toplam Fiyat: {totalPrice}</Text>

        <TouchableOpacity style={styles.button} onPress={() => { payBasket(); }}>
          <Text style={styles.buttonText} >Ödeme Yap</Text>
        </TouchableOpacity>

      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 10,
  },
  totalPrice: {
    flex: 13,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  button: {
    flex: 6,
    backgroundColor: '#AFE4DE',
    borderRadius: 30,
    padding: 10,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },



})