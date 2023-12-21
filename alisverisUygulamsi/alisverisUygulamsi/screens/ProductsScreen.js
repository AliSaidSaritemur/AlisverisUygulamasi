import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductImage from '../components/ProductImage'
import ProductList from '../components/ProductList'

export default function ProductsScreen() {
  return (
    <View>
      <Text>ProductsScreen</Text>
      <ProductList/>
    </View>
  )
}

const styles = StyleSheet.create({})