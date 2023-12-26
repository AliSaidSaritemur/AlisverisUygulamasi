import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AddProduct ({visible}) {
  return (
    visible?
    <Modal>
      <View>
        <Text>nealakası </Text>
      </View>
    </Modal>
  : <Text></Text>
  )
}

const styles = StyleSheet.create({})