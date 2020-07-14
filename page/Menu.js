import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, Alert } from 'react-native';
import { Card, CardItem,Body,Button,Text} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider} from 'react-native-paper';

export default function Menu(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [count,setCount] = useState(1);
    const [sess,setSess] = useState('');
    useEffect(()=>{
        console.log(route.params);
        getSessionId();
    },[])
    const getSessionId=async()=>{
        console.log(await AsyncStorage.getItem('cid'));
        setSess(await AsyncStorage.getItem('cid'));
    }
    const addCart =(pu_id,su_id,mn_id,amount)=>{
        let CartItem = {
            pu_id: pu_id,
            su_id: su_id,
            mn_id: mn_id,
            amount: amount
        }
        console.log(CartItem);
        ApiService.insertCart(CartItem)
        .then(res=>{
            console.log("insertCart Success");
            Alert.alert("장바구니 이동","장바구니로 이동하시겠습니까?",
            [
              {
                text: '나중에',
                onPress: () => console.log('나중에'),
                style: 'cancel'
              },
              { text: '이동', onPress: () => navigation.navigate("Cart",{su_id:route.params.su_id})}
            ],
            { cancelable: false })
        })
        .catch(err=>{
            console.log("insertCart Error",err);
        })
    }
    const imadiatelyBuy=(pu_id,su_id,mn_id,amount)=>{
        let CartItem = {
            pu_id: pu_id,
            su_id: su_id,
            mn_id: mn_id,
            amount: amount
        }
        ApiService.insertCart(CartItem)
        .then(res=>{
            console.log("insertCart Success",res);
        })
        .catch(err=>{
            console.log("insertCart Error",err);
        })
        navigation.navigate('Cart',{"su_id":route.params.su_id})
    }
    return (
        <View style={{backgroundColor:'#ffffff',padding:20,height:'100%'}}>
                <Image style={{width: "100%", height:200,borderRadius: 0}} source={{uri:route.params.img}} />
                <Text style={{marginTop:10}}>{route.params.name}</Text>
                <Text style={{marginTop:10}}>{route.params.price}원</Text>
                <View style={{flexDirection:'row',marginTop:10}}>
                <Button onPress={()=>setCount(count+1)} style={{backgroundColor:'#DDD',width:40,height:40,justifyContent:'center'}}><Text style={{color:'black'}}>{"+"}</Text></Button><Text style={{margin:10}}>{count}</Text><Button style={{backgroundColor:'#DDD',width:40,height:40,justifyContent:'center'}} onPress={()=>{if(count>1) {setCount(count-1)}else{alert("수량이 1 이하 입니다.")}}}><Text style={{color:'black'}}>{"-"}</Text></Button>
                </View>
                <Divider style={{marginTop:10,borderWidth:0.5}}/>
                <View style={{flexDirection:'row',marginTop:20,justifyContent:'center'}}>
                <Button style={{backgroundColor:'#FF9800',justifyContent:'center',marginRight:20}} onPress={()=>addCart(sess, route.params.su_id, route.params.mn_id,count)}><Text>장바구니에 추가</Text></Button>
                <Button style={{backgroundColor:'#FF9800',justifyContent:'center',marginRight:20}} onPress={()=>imadiatelyBuy(sess, route.params.su_id, route.params.mn_id,count)}><Text>바로 주문</Text></Button>
                </View>
        </View>
    );
}