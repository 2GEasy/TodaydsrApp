import React from 'react';
import {View,Text,Button} from 'react-native';

export default function ComponentParams({route,navigation}) {
    const {itemId} = route.params;
    const {otherParam} = route.params;
    return (
        <View>
            <Text>{itemId}</Text>
            <Text>{otherParam}</Text>
            <Button title="Login" onPress={()=>navigation.navigate('Login')} />
        </View>
    );
}