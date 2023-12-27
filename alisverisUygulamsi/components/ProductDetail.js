import { Button, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import ProductImage from './ProductImage'
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
export default function ProductDetail({ product, visible, onBuyProduct, onCancel,onAddProdutToBasket }) {
  return (
    visible ?
      <Modal
        animationType="slide"
        visible={visible}>
        <View style={styles.container}>
          <View style={styles.addBasketContainer}>
        <TouchableOpacity style={styles.addBasket }onPress={() => onAddProdutToBasket(product)} >
            <Ionicons name="basket-outline" size={scale(30)}  />
              <Text style={styles.basketButtonText}>Sepete Ekle</Text>
            </TouchableOpacity>
            </View>
          <ProductImage productName={product.Name} width={300} height={300} />
          <Text style={styles.text}>Ürün Adı: {product.Name}</Text>
          <Text style={styles.text}>Ürün Fiyatı: {product.Price}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => onBuyProduct(product)}>
              <Text style={styles.buttonText}>Satın Al</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
  
        </View>
      </Modal>
      :null
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#808000',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  addBasket: {
    flexDirection: 'row',
    marginRgiht: 2000,
  },
  basketButtonText: {
    fontSize: 23,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addBasketContainer: {
    position: 'absolute',
    zIndex: 1,
     left: 230,
     marginTop: 20,
     width: 150,
  },

})