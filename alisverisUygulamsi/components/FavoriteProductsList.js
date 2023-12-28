import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import {getProductList} from '../Services/ProductService';
import ProductImage from './ProductImage';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {getFavoriteProductList} from '../Services/FavoriteProductService';
import FavoriteHeartIcon from './FavoriteHeartIcon';
import { getProductWithId } from '../Services/ProductService';
import ProductDetail from './ProductDetail';
const FavoriteProductsList = ({visible,onCancel,onRefreshPage}) => {
const [products, setProducts] = useState([]);
const [productList,setProductList]=useState([]);
const [modalProductDetailVisible, setModalProductDetailVisible] = useState(false);
const [detailedProduct, setDetailedProduct] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const favoriteProductList = await getFavoriteProductList();
      console.log(favoriteProductList);
      setProductList( await Promise.all(favoriteProductList.map(item => getProductWithId(item.ProductId))));
      setProducts(productList);
    };
    fetchProducts();
  }, [onRefreshPage]);
  const buyPorduct=async (product)=>{
    await incrementSalesCount(product.Name,1);
    const user=await getSession();
    addOrderedProduct(user,product);
    setRefreshPage(!refreshPage);
  }
  const addProductToBasket=async (product)=>{
    const user=await getSession();
    addBasketProduct(user.UserId,product.ProductId);
  }

  const startModalProductDetail = (detailedProduct) => {
    setDetailedProduct(detailedProduct);
    setModalProductDetailVisible(true)
  }; 
  
  const endModalProductDetail=()=>{
    setModalProductDetailVisible(false)
  }

  const renderItem = ({ item }) => (

    <View style={styles.itemContainer}>
      <View style={styles.favoriteHeart}>
         <FavoriteHeartIcon  ProductId={item.ProductId} />
         </View>
      <TouchableOpacity onPress={()=>startModalProductDetail(item)}>
      <ProductImage productName={item.Name} height={verticalScale(80)} width={scale(80)} />
       <Text style={styles.itemName}>{item.Name}</Text>
      <Text style={styles.itemPrice}>Fiyat: {item.Price}₺</Text>
      <Text style={styles.itemSalesCount}>Satış Sayısı: {item.SalesCount}</Text>
      </TouchableOpacity>

    </View>

  );
  
  return (
    <Modal
    animationType="slide"
        visible={visible}
    >
<FlatList
      data={productList}
      renderItem={renderItem}
      keyExtractor={item => item.ProductId}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
     <ProductDetail visible={modalProductDetailVisible} product={detailedProduct} onBuyProduct={buyPorduct} onCancel={endModalProductDetail} 
      onAddProdutToBasket={addProductToBasket}
      />
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text>Kapat</Text>
          </TouchableOpacity> 
    </Modal>
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
  button:{
    width: '50%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginLeft:20,
    backgroundColor: '#00fa9a',
  },
  favoriteHeart:{
    position:"absolute",
    zIndex:1,
    right:scale(0),
    bottom:verticalScale(120)
  }
});
export default FavoriteProductsList;