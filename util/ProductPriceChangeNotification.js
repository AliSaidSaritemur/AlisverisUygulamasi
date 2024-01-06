import React, { useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import {getFavoriteProductList} from '../Services/FavoriteProductService';
import { getProductWithId } from '../Services/ProductService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ProductPriceChangeNotification() {
  const [previusProductList, setfirstPreviusProductList] = useState([])
  const [favouriteList, setFavouriteList] = useState([])
  const [productList, setProductList] = useState([])
  useEffect(() => {
  let localPreviusProductList = previusProductList;
  const intervalId = setInterval(async () => {
    const favoriteProductList = await getFavoriteProductList();
    setFavouriteList(favoriteProductList);
    const newProductList = await Promise.all(favoriteProductList.map(item => getProductWithId(item.ProductId)));
    setProductList(newProductList);

    if(localPreviusProductList.length != 0) {
      localPreviusProductList.forEach((prevProduct) => {
        const newProduct = newProductList.find((product) => product.Name === prevProduct.Name);
        if (newProduct && newProduct.Price !== prevProduct.Price) {
          if(newProduct.Price < prevProduct.Price){
            sendNotification(`${newProduct.Name} ürününün fiyatı ${prevProduct.Price}₺'den ${newProduct.Price}₺'ye düştü!`);
          }
        }
      });
    }
    localPreviusProductList = newProductList;
    setfirstPreviusProductList(newProductList);
  }, 5000); 

  return () => clearInterval(intervalId);
}, []); 


  const sendNotification = async (text) => {
    const notificationContent = {
      title: "İNDİRİM!!!",
      body: text,
      sound: true,
    };
  
    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: null,
    });
  };

  return null; 
}