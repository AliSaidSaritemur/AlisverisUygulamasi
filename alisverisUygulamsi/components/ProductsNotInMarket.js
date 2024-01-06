import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getProductsNotInMarket, productAddMarket } from '../Services/ProductService';
import ProductImage from './ProductImage';
import { scale } from 'react-native-size-matters';

export default function ProductsNotInMarket({ visible, onCancel }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsNotInMarket();
      setProducts(products);
    };
    fetchProducts();
  }, [refreshPage, visible, selectedProduct]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      style={styles.container}
      >
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Markete Eklenecek Ürünü Seçiniz</Text>
      <FlatList
        data={products}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { backgroundColor: (selectedProduct && item.Name === selectedProduct.Name) ? "turquoise" : "white" }]} onPress={() => { setSelectedProduct(item); setRefreshPage(!refreshPage); }} >
              <Text style={styles.buttonText}>{item.Name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.imageWrapper}>
        {selectedProduct != null ? <ProductImage productName={selectedProduct.Name} width={scale(150)} height={scale(150)} /> : null}
      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await productAddMarket(selectedProduct.ProductId);
          setRefreshPage(!refreshPage);
          setSelectedProduct(null);
        }} >
        <Text style={styles.buttonText}>Markete Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSelectedProduct(null);
          onCancel();
        }}>
        <Text style={styles.buttonText}>Kapat</Text>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    padding: 15,

  },
  button: {
    backgroundColor: '#AFE4DE',
    padding: 10,
    margin: 10,
    alignContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  }

})