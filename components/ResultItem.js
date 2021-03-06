import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage } from 'react-native';
import { Card, CardItem,Body,Button,Text,Item,Label,Input, Right} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider} from 'react-native-paper';

export default function ResultItem(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [menu,setMenu] = useState({name:'',price:0});
    useEffect(()=>{
        fetchMenu(props.su_id,props.mn_id);
    },[])
    useEffect(()=>{
        props.setTotal((props.total+(menu.price*props.amount)));
    },[menu])
    const fetchMenu=(su_id,mn_id)=>{
        ApiService.fetchMenu(su_id,mn_id)
        .then(res=>{
            setMenu(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log("fetchMenu ERR",err);
        })
    }
    return (
        <>
            <View style={{flexDirection:'row'}}>
                <Text>{menu.name} * {props.amount}개</Text>
                <Right><Text>{menu.price*props.amount}원</Text></Right>
            </View>
        </>
    );
}