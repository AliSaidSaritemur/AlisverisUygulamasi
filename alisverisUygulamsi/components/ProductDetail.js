import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductImage from './ProductImage'

export default function ProductDetail({product,visible,onBuyProduct,onCancel}) {
  return (
    visible ?
<Modal 
        animationType="slide"
        visible={visible}>
        <View style={styles.container}>
          <ProductImage productName={product.Name} width={300} height={300}/>
            <Text style={styles.text}>Ürün Adı: {product.Name}</Text>
            <Text style={styles.text}>Ürün Fiyatı: {product.Price}</Text>

            <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Satın Al" onPress={()=>onBuyProduct(product)} />
            <Button  style={styles.button} title="Kapat" onPress={onCancel} />
            </View>

        </View>
      </Modal>
      :  <Text></Text>  
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white',
        padding:15,
      },
      text:{
        fontSize:20,
        fontWeight:'bold',
        margin:10,
      },
      buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'50%',
        margin:10,
      },
      button:{
        width:'40%',
        
      }
      
})