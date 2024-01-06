import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTotalRevenue } from '../Services/OrderedProductPackageService'
import { getTotalSalesCount } from '../Services/ProductService'
import { getOrderedProductPackageList } from '../Services/OrderedProductPackageService'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters'
import { getUser } from '../Services/UserService'
import Receipt from '../components/Receipt'
export default function AdminStatsScreen({ navigation }) {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [date, setDate] = useState(null);
  useEffect(() => {
    const fetchStats = async () => {
      setOrders (await getOrderedProductPackageList());
      setOrders(orders.sort((a, b) => new Date(b.Date) - new Date(a.Date)));
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      const revenue = await getTotalRevenue();
      const salesCount = await getTotalSalesCount();

      setTotalRevenue(revenue);
      setTotalSalesCount(salesCount);
    };
    navigation.addListener('focus', () => {
      fetchStats();
    });
  }, [navigation]);

  const getReciepe = async (date, userId,userMail) => {
    setUserId(userId);
    setUserMail(userMail);
    setDate(date);
    setReceiptVisible(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.saledProductDetail}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Toplam Satış :{totalSalesCount}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Toplam Getiri: {totalRevenue}₺</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => `${item.UserId}-${item.Date}`}
        renderItem={({ item }) => (
          <View style={styles.products}>
            <TouchableOpacity onPress={() => getReciepe(item.Date, item.UserId,item.UserMail)}>
              <Ionicons name="newspaper-outline" size={scale(100)} color="orange" />
            </TouchableOpacity>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productInfo} >İşlem Ücreti:  {item.TotalPrice}₺</Text>
              <Text style={styles.productInfo} >İşlem Tarihi:  {item.Date}</Text>
              <Text style={styles.productInfo} >Adress:  {item.Adress}</Text>
              <Text style={styles.productInfo} >Kişi Mail:  {item.UserMail}</Text>
            </View>

          </View>
        )}
      />
      <Receipt visible={receiptVisible} onCancel={() => setReceiptVisible(false)}
        userId={userId} userMail={userMail} date={date} />
    </View>

  );
}


const styles = StyleSheet.create({
  saledProductDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5
  },
  products: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  productInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfoContainer: {
    marginLeft: 10,
  }

})