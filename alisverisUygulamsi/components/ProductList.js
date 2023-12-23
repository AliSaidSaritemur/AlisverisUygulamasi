import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import ProductService from '../Services/ProductService';
import ProductImage from './ProductImage';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
const ProductList = ({onPressProduct,onRefreshPage}) => {
  const [products, setProducts] = useState([]);
      const [,getProductList]=ProductService();
  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductList();
      setProducts(productList);
    };
    fetchProducts();
  }, [onRefreshPage]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>onPressProduct(item)}> 
    <View style={styles.itemContainer}>
      <ProductImage productName={item.Name} height={verticalScale(80)} width={scale(80)} />
       <Text style={styles.itemName}>{item.Name}</Text>
      <Text style={styles.itemPrice}>Fiyat: {item.Price}₺</Text>
      <Text style={styles.itemSalesCount}>Satış Sayısı: {item.SalesCount}</Text>
    </View>
    </TouchableOpacity>

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
const styles = ScaledSheet.create({
  listContainer: {
    padding: moderateScale(10),
  },
  itemContainer: {
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    padding: moderateScale(10),
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