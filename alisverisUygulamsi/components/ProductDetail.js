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
           <ScrollView    contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
          <View style={styles.addBasketContainer}>
            <TouchableOpacity style={styles.addBasket }onPress={() => onAddProdutToBasket(product)} >
              <Ionicons name="basket-outline" size={scale(30)}  />
              <Text style={styles.basketButtonText}>Sepete Ekle</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.container}>

          <View style={styles.image}>
          <ProductImage productName={product.Name} width={scale(250)} height={scale(250)} />
          <Text style={styles.text}>Ürün Adı: {product.Name}</Text>
          <Text style={styles.text}>Ürün Fiyatı: {product.Price}</Text>
          </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => onBuyProduct(product)}>
                <Text style={styles.buttonText}>Satın Al</Text>
                </TouchableOpacity>
              </View>
            
          <View style={{margin:10}}>
            <TouchableOpacity style={styles.closeBttn} onPress={onCancel}>
            <Ionicons name='close-circle-outline' size={scale(50)} color='#000' />
            </TouchableOpacity>
          </View>
          
  
        </View>
        </ScrollView>
      </Modal>
      :null
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20,
  },
  button: {
    width: '70%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#00fa9a',
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
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
  image:{
    marginStart: 10,
    paddingTop:150,
    marginTop: 20,
    marginBottom: 20,
  },
  closeBttn:{
    alignItems: 'center',
    padding: 50,
    margin: 10,
    borderRadius: 5,
  },
  addBasketContainer: {
    position: 'absolute',
    top: 0,
     zIndex: 1,
     left: 230,
     right: 10,
     marginTop: 20,
     width: 150,
  },

})