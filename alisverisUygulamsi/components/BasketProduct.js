import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import ProductImage from './ProductImage'
import { getProductWithId } from '../Services/ProductService'
import{removeBasketProduct} from '../Services/BasketProductService'
const BasketProduct =({basketProduct,onIsProductRemoved})=> {
    const [product, setProduct] = useState(null);
    const[refreshPage,setRefreshPage]=useState(1);
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
           <ProductImage productName={product.Name} height={100} width={100} />
           <View>
              <Text style={styles.productInfo} >Ürün Adı:  {product.Name}</Text>
              <Text style={styles.productInfo} >Ürün Fiyatı:  {product.Price}₺</Text>
              <Text style={styles.productInfo} >İşlem Tarihi:  {product.Date}</Text>
              </View>
                <TouchableOpacity style={styles.button} onPress={() => {removeBasketProduct(basketProduct.BasketProductId);
                setRefreshPage(refreshPage+1);
                onIsProductRemoved(refreshPage);
                }}>
                    <Text style={styles.buttonText}>Sepetten Çıkar</Text>
                </TouchableOpacity>

            </View>
    )
}
const styles = StyleSheet.create({

    container:{
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
     }
})
export default BasketProduct;