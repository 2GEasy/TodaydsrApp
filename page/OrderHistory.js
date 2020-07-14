import React,{useState,useEffect,useCallback} from 'react';
import {ScrollView,View,Text, AsyncStorage} from 'react-native';
import {useNavigation,useRoute,useFocusEffect } from '@react-navigation/native';
import ApiService from '../ApiService';
import Orders from '../components/Orders';

export default function OrderHistory(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        
        getStart();
    },[])
    
    useFocusEffect(useCallback(() => {
        console.debug("screen takes focus");
        getStart();
        return () => {console.debug("screen loses focus");loseFocus();};
      }, []));
      async function getStart() {
        fetchOrderByID(await AsyncStorage.getItem('cid'));
    }
    const loseFocus=()=>{
        setOrders([]);
    }
    const fetchOrderByID=(pu_id)=>{
        ApiService.fetchOrderByID(pu_id)
        .then(res=>{
            setOrders(res.data);
        })
        .catch(err=>{
            console.log("fetchOrderByID ERR",err);
        })
    }
    const returnOrders=(data)=>{
        return data.map((post)=>{
            return <Orders ord_id={post.ord_id} su_id={post.su_id} ordDate={post.ordDate}/>
        })
    }
    return (
        <ScrollView style={{paddingBottom:100}}>
            {orders.length>0?returnOrders(orders):<Text>Loading...</Text>}
        </ScrollView>
    );
}