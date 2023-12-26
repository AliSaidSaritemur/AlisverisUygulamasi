import { Button, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react'
import ProductImage from './ProductImage'
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useState } from 'react';
import { updateProduct } from '../Services/ProductService';

export default function AdminProductDetail({product, visible,onDeleteProduct,onCancel}) {
  if(product==null){
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
                <ProductImage productName={product.Name} width={300} height={300} />
                <Text style={styles.text}>Ürün Adı:    {product.Name}</Text>
                <TextInput
                 style={styles.text}
                 value={price.toString()} 
                onChangeText={(text) => {
                setPrice(parseFloat(text)) 
                }}
                placeholder='Ürün Fiyatını Giriniz!'
                />

                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => updateProduct(product.ProductId,product.Name,price)}>
                    <Text style={styles.buttonText}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => onDeleteProduct(product)}>
                    <Text style={styles.buttonText}>Sil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onCancel}>
                    <Text style={styles.buttonText}>Kapat</Text>
                </TouchableOpacity>
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
})