import { Button, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react'
import ProductImage from './ProductImage'
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useState } from 'react';
import { updateProduct, productOutFromMarket } from '../Services/ProductService';
import{removeBasketProductWithProductId} from '../Services/BasketProductService';


export default function AdminProductDetail({ product, visible, onCancel }) {
  if (product == null) {
    return null
  }

  useEffect(() => {
    setPrice(product.Price);
  }
    , [product]);
  const [price, setPrice] = useState(product.Price);


  return (
    visible ?
      <Modal
        animationType="slide"
        visible={visible}>
        <View style={styles.container}>
          <View style={styles.borderContainer}>
            <ProductImage productName={product.Name} width={300} height={300} />
            <Text style={styles.text}>Ürün Adı:  {product.Name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.text}>Ürün Fiyatı: </Text>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                maxLength={10}
                value={price.toString()}
                onChangeText={(text) => {
                  setPrice(parseFloat(text)?parseFloat(text):0)
                }}
                placeholder='Ürün Fiyatını Giriniz!'
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => updateProduct(product.ProductId, product.Name, price)}>
                <Text style={styles.buttonText}>Güncelle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBttn} onPress={() => { productOutFromMarket(product.ProductId);removeBasketProductWithProductId(product.ProductId); onCancel(); }}>
                <Text style={styles.delButtonText} >Satışını Durdur</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 10 }}>
              <TouchableOpacity style={styles.closeBttn} onPress={onCancel}>
                <Ionicons name='close-circle-outline' size={scale(50)} color='#000' />
              </TouchableOpacity>
            </View>
          </View>


        </View>

      </Modal>
      : <Text></Text>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#E0FFFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderContainer: {
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginVertical: 20,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden',
    width: '50%',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00fa9a',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  deleteBttn: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  closeBttn: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  delButtonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  input: {
    fontSize: 18,
    width: '10%',
    fontWeight: 'bold',
  }
})