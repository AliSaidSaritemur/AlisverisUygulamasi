import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from '../fireBase';

export default function ProductImage({productName,width,height}) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await getDownloadURL(ref(storage, `${productName}.jpg`));
                setImageUrl(url);
            } catch (error) {
                console.error('Resim alınamadı:', error);
            }
        };

        fetchImage();
    }, []); 

    return (
        <View>
             {imageUrl && <Image source={{ uri: imageUrl }} style={{width: width, height: height, borderRadius: 30}} />}
        </View>
    )
}