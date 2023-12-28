import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL,uploadString } from "firebase/storage";
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
    }, [productName]); 

    return (
              <Image source={{ uri: imageUrl }} style={{width: width, height: height, borderRadius: 30}} />
    )
}

export async function uploadImage(imageBase64, filename) {

  
}