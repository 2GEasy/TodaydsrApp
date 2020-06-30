import React,{useState,useEffect} from 'react';
import {ScrollView,View,Text, AsyncStorage} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import ApiService from '../ApiService';
import Orders from '../components/Orders';

export default function OrderHistory(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        async function getStart() {
            fetchOrderByID(await AsyncStorage.getItem('cid'));
        }
        getStart();
    },[])
    const fetchOrderByID=(pu_id)=>{
        ApiService.fetchOrderByID(pu_id)
        .then(res=>{
            setOrders(res.data);
        })
        .catch(err=>{
            console.log("fetchOrderByID ERR",err);
        })
    }
    return (
        <ScrollView style={{paddingBottom:100}}>
            {orders.map((post)=>{
                return <Orders ord_id={post.ord_id} su_id={post.su_id} ordDate={post.ordDate}/>
            })}
        </ScrollView>
    );
}