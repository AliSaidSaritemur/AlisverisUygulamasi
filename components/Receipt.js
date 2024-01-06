import { ActivityIndicator, Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getOrderedProductListWithUserId } from '../Services/OrderedProductService';
import { scale } from 'react-native-size-matters';
import { getProductWithId } from '../Services/ProductService';
import ProductImage from './ProductImage';
import { getSessionsRole } from '../Services/SessionsService';

export default function Receipt({ visible, onCancel, userId,userMail, date }) {
  const [list, setList] = useState([]);
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setRole(await getSessionsRole());
      setIsLoading(true);
      const mergedProducts = await getOrderedProductListWithUserId(userId, date);
      setList(mergedProducts);
      setIsLoading(false);
    };
    if (visible == true)
      fetchOrders();
  }, [date, visible]);



  return (

    <Modal
      animationType="slide"
      visible={visible}>
      <Text style={styles.userMailText}>
      {( role == "admin") ? "Kullanıcı Maili :  " + userMail : "Geçmiş Sipariş"}
      </Text>
      {isLoading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <ProductImage productName={item.ProductName} height={scale(70)} width={scale(70)} />
          <View style={styles.productInfoContainer}>
            <Text style={styles.productInfo} >Ürün Adı:  {item.ProductName}</Text>
            <Text style={styles.productInfo} >Ürün Fiyat:  {item.ProductPrice}</Text>
            <Text style={styles.productInfo} >Ürün Adedi:  {item.Count}</Text>
            <Text style={styles.productInfo} >İşlem Ücreti:  {item.ProductPrice * item.Count}₺</Text>
          </View>
        </View>
      )}
    />
  )}
      <TouchableOpacity onPress={() => {
        setList([]);
        setIsLoading(false);
        onCancel();
      }}
        style={styles.button}
      >
        <Text>Kapat</Text>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    padding: 10,
  },
  productInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfoContainer: {
    marginLeft: 10,
  },

  button: {
    width: '50%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 20,
    backgroundColor: '#00fa9a',
  },
  userMailText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center'
  }
})