import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import ProductService from '../Services/ProductService';
import ProductImage from './ProductImage';

const ProductList = () => {
  const [products, setProducts] = useState([]);
      const [,getProductList]=ProductService();
  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductList();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ProductImage productName={item.Name} height={100} width={100} />
      <Text style={styles.itemName}>{item.Name}</Text>
      <Text style={styles.itemPrice}>Fiyat: {item.Price}₺</Text>
      <Text style={styles.itemSalesCount}>Satış Sayısı: {item.SalesCount}</Text>
    </View>
  );
  
  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3}
      contentContainerStyle={styles.listContainer}
    />
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    padding: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemSalesCount: {
    fontSize: 12,
    color: '#888',
  },
});
export default ProductList;