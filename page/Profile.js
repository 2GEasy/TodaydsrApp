import React from 'react';
import {Text,View, Button} from 'react-native';

export default function Profile({navigation}) {
    return (
        <>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20}}>Profile</Text>
                <Button title="Profile Re" onPress={()=>navigation.push('Profile')} />
                <Button title="Param Send" onPress={()=>navigation.navigate('Params', {itemId: 86, otherParam: 'anything'})} />
            </View>
        </>
    );
}