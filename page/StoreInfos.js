import React,{useState,useEffect, useLayoutEffect} from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';
import ApiService from '../ApiService';
import { View } from 'react-native';
import { Text } from 'native-base';
import StoreInfo from '../components/StoreInfo';

export default function StoreInfos(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const [storeInf,setStoreInf] = useState({});
    useEffect(()=>{
        fetchStoreInfo(route.params.su_id);
    },[])
    const fetchStoreInfo=(su_id)=>{
        ApiService.fetchStoreInfo(su_id)
        .then(res=>{
          setStoreInf(res.data);
          console.log("StoreInf:",res.data);
        })
        .catch(err=>{
          console.log("fetchStoreInfo ERR.",err);
        })
    }
    const returnStoreInf=(data)=>{
        return <StoreInfo su_id={data.su_id} storeName={data.storeName} storeExplain={data.storeExplain} deliverPosible={data.deliverPosible} storeAddr1={data.storeAddr1} storeAddr2={data.storeAddr2} storePhone={data.storePhone} abledeliverS={data.abledeliverS} abledeliverE={data.abledeliverE} count={data.count} favorite={data.favorite} />;
    }
    return (
        <View style={{backgroundColor:'#FFFFFF'}}>
           {storeInf?returnStoreInf(storeInf):null}
        </View>
    );
}