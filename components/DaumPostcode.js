import React from 'react';
import { Text,Image } from 'react-native';
import Postcode from 'react-native-daum-postcode';

export default function DaumPostcode(props) {
    return (
        <>
            <Postcode
                style={{width:400,height:600}}
                jsOptions={{animated:true}}
                onSelected={(data)=>alert(JSON.stringify(data))}
            />
        </>
    );
}