import { FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import BasketProductService from '../Services/BasketProductService'
import ProductImage from '../components/ProductImage';
import { getSession } from '../Services/SessionsService'; 
import BasketProduct from '../components/BasketProduct';
export default function BasketScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const[user,setUser]=useState(null);
  const[product,setProduct]=useState(null); 
  const [,,getBasketProductListWithUserId ] =BasketProductService();
  const [isProductRemoved,setIsProductRemoved]=useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const currentUser = await getSession();
      setUser(currentUser);
      setProducts(await getBasketProductListWithUserId(currentUser.UserId));
    };
    fetchProducts();
  }, [isProductRemoved]);
  return (
    <View>
        <FlatList
        data={products}
        renderItem={({ item }) => 
        (
    <BasketProduct  basketProduct={item}  onIsProductRemoved ={setIsProductRemoved}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})