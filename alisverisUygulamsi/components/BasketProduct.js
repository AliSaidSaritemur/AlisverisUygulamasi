import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import ProductImage from './ProductImage'
import { getProductWithId } from '../Services/ProductService'
import{removeBasketProduct,decreaseProductCount,increaseProductCount} from '../Services/BasketProductService'
import { ScaledSheet, scale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons';
const BasketProduct =({basketProduct,onIsProductRemoved})=> {
    const[refreshPage,setRefreshPage]=useState(1000);
    const [product, setProduct] = useState(null);
    const refresh = ()=>{
        setRefreshPage(refreshPage+1);
        onIsProductRemoved(refreshPage);
    }

    useEffect(() => {
      const fetchProduct = async () => {
        const productData = await getProductWithId(basketProduct.ProductId);
        setProduct(productData);

      };
  
      fetchProduct();
    }, [basketProduct,refreshPage]);

    if (!product) {
      return <Text>Loading...</Text>; 
    }

    return (
      <View style={styles.container}>
           <ProductImage productName={product.Name} height={scale(70)} width={scale(70)} />
           <View style={{flex:9}}>
            
              <Text style={styles.productInfo} >Ürün Adı:  {product.Name}</Text>
              <Text style={styles.productInfo} >Ürün Fiyatı:  {product.Price}₺</Text>
              <Text style={styles.productInfo} >Ürün adedi:  {basketProduct.Count}</Text>
              <Text style={styles.productInfo} >Toplam Fiyat:  {product.Price*basketProduct.Count}₺</Text>
              </View>
              <View style={styles.buttonConatiner}>

                <View style={styles.icons}>
                <TouchableOpacity  onPress={() => {basketProduct.Count>1 ?decreaseProductCount(basketProduct.BasketProductId):removeBasketProduct(basketProduct.BasketProductId);
                refresh();  
                }}> 
                           <View style={styles.iconDesc} ><Ionicons name="remove-circle-outline" size={scale(20)} color={"red"} />   
                                </View>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => {increaseProductCount(basketProduct.BasketProductId);
                refresh();  
                }}> 
                <View style={styles.iconInc} >
                <Ionicons name="add-circle-outline" size={scale(20)}  color={"blue"} /> 
                </View>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.removeAllButton} onPress={() => {removeBasketProduct(basketProduct.BasketProductId);
                refresh();  
                }}>

                    <Text style={styles.removeAllButtonText}>Tümünü Çıkar </Text>
                </TouchableOpacity>
                </View>
            </View>
    )
}           
const styles = ScaledSheet.create({

    container:{
        flex:1,
        flexDirection:'row', 
       alignItems:'center',
         margin: 6,
         alignItems: 'center',
         backgroundColor: '#f8f8f8',
         borderRadius: 30,
         padding: 10,
     },
     productInfo:{
         fontSize: 16,
         fontWeight: 'bold',
     },
     
        buttonConatiner:{
            flex:6,

        },
        removeAllButton: {
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 20,
            width: scale(105),
            alignItems:'center',
            marginTop: 10,

        },
        removeAllButtonText: {
            color: 'red',
            fontWeight: 'bold',

        },
        icons:{
            flexDirection:'row',
            left:30,
        },
        iconDesc:{
            marginRight: 10,
        },
        iconInc:{
            marginLeft: 10,
        },
})
export default BasketProduct;