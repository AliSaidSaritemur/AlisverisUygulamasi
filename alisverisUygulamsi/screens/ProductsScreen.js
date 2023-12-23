import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import ProductImage from '../components/ProductImage'
import ProductList from '../components/ProductList'
import ProductDetail from '../components/ProductDetail'
import ProductService from '../Services/ProductService'
import OrderedProducts from '../Services/OrderedProductService'
import SessionsService from '../Services/SessionsService'

export default function ProductsScreen() {  
  const [modalProductDetailVisible, setModalProductDetailVisible] = useState(false);
  const [,, getSession] = SessionsService();
  const[,,incrementSalesCount]=ProductService();
  const[addOrderedProduct ]=OrderedProducts();
  const [product, setProduct] =useState(null);
  const[refreshPage,setRefreshPage]=useState(false);

  const startModalProductDetail = (product) => {
    setProduct(product);
    setModalProductDetailVisible(true)
    
   
  }; 
  const endModalProductDetail=()=>{
    setRefreshPage(!refreshPage);
    setModalProductDetailVisible(false)
  }
  const buyPorduct=async (product)=>{
    await incrementSalesCount(product.Name);
    const user=await getSession();
    addOrderedProduct(user,product);
    setRefreshPage(!refreshPage);
  }
  return (
    <View>
      <Text>ProductsScree</Text>
      <ProductList onPressProduct={startModalProductDetail}  onRefreshPage={refreshPage}/>
      <ProductDetail visible={modalProductDetailVisible} product={product} onBuyProduct={buyPorduct} onCancel={endModalProductDetail}  />
    </View>
  )
}

const styles = StyleSheet.create({})