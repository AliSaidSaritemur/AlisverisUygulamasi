// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default ()=>  {
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.sendNotificationOnProductChange = functions.firestore
//   .document('Products/{productId}')
//   .onWrite(async (change, context) => {
//     const productData = change.after.data();

//     // Get a random user
//     const usersSnapshot = await admin.firestore().collection('Users').get();
//     const users = usersSnapshot.docs.map(doc => doc.data());
//     const randomUser = users[Math.floor(Math.random() * users.length)];

//     // Send a notification to the random user
//     const message = {
//       notification: {
//         title: 'Product Updated',
//         body: `The product ${productData.Name} has been updated.`,
//       },
//       token: randomUser.fcmToken, // assuming each user document has an fcmToken field
//     };

//     return admin.messaging().send(message);
//   });
// }

// const styles = StyleSheet.create({})