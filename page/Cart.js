import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage,ScrollView } from 'react-native';
import { Card, CardItem,Body,Button,Text,Badge} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider,DataTable} from 'react-native-paper';
import CartItem from '../components/CartItem';
export default function Cart(props) {
    const navigation = useNavigation();    
    const route = useRoute();

    const [cart,setCart] = useState([]);
    const [sess,setSess] = useState('');
    
    useEffect(()=>{
        getSessionId();
        async function getStart() {
            console.log("useEffect ",await AsyncStorage.getItem('cid'));
            fetchCartList(await AsyncStorage.getItem('cid'),route.params.su_id);
        }
        getStart();
    },[])
    const getSessionId=async()=>{
        console.log(await AsyncStorage.getItem('cid'));
        setSess(await AsyncStorage.getItem('cid'));
    }
    const fetchCartList=(pu_id,su_id)=>{
        console.log("fetchCartList ",pu_id,su_id);
      ApiService.fetchCartList(pu_id,su_id)
      .then(res=>{
        console.log("Success fetchCartList");
        setCart(res.data);
      })
      .catch(err=>{
        console.log("fetchCartList ERR",err);
      })
    }
    const returnCartItems=(data)=>{
        console.log("returnCartItem",data);
        return data.map((c,index)=>{
            return <CartItem key={index} su_id={c.su_id} mn_id={c.mn_id} amount={c.amount}/>
        })
    }
    return (
        <>
        <ScrollView>
            
                {(cart.length>0)?returnCartItems(cart):<Text>장바구니에 상품이 없습니다!</Text>}
        </ScrollView>
        <Button warning style={{position:'absolute',bottom:0,width:'100%',justifyContent:'center'}} onPress={()=>navigation.navigate('Order',{"su_id":route.params.su_id})}>
          <Badge style={{backgroundColor:'#DDD',marginTop:4}}>
            <Text>{cart.length}</Text>
          </Badge><Text>주문</Text></Button>
        </>
    );
}