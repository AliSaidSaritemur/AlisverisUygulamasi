import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import {getProductsInMarket} from '../Services/ProductService';
import ProductImage from './ProductImage';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import FavoriteHeartIcon from './FavoriteHeartIcon';
import {getSessionsRole} from '../Services/SessionsService';
const ProductList = ({onPressProduct,onRefreshPage}) => {
  const [products, setProducts] = useState([]);
      const[heartColor,setHeartColor]=useState("heart-outline");
      const [role, setRole] = useState("user");
  useEffect(() => {
    const fetchProducts = async () => {
      setRole(await getSessionsRole());
      const productList = await getProductsInMarket();
      setProducts(productList);
    };
    fetchProducts();
  }, [onRefreshPage]);


  const renderItem = ({ item }) => (

    <View style={styles.itemContainer}>
      <View style={styles.favoriteHeart}>

      {role!="admin"?<FavoriteHeartIcon  ProductId={item.ProductId} />:null}
         </View>
      <TouchableOpacity onPress={()=>onPressProduct(item)}>
      <ProductImage productName={item.Name} height={verticalScale(100)} width={scale(100)} />
       <Text style={styles.itemName}>{item.Name}</Text>
      <Text style={styles.itemPrice}>Fiyat: {item.Price}₺</Text>
      <Text style={styles.itemSalesCount}>Satış Sayısı: {item.SalesCount}</Text>
      </TouchableOpacity>

    </View>

  );
  
  return (
<FlatList
  data={products}
  renderItem={renderItem}
  keyExtractor={(item) => item.ProductId}
  numColumns={2}
  contentContainerStyle={styles.listContainer}
/>
  );
};
const styles = ScaledSheet.create({
  listContainer: {
    padding: moderateScale(10),
    alignItems: 'center',
  },
  itemContainer: {
    marginHorizontal: 30,
    marginVertical: 10,

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
  favoriteHeart:{
    position:"absolute",
    zIndex:1,
    right:scale(0),
    bottom:verticalScale(120)
  }
});
export default ProductList;