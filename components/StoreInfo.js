import React,{useState,useEffect} from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import { Divider } from 'react-native-paper';
import HygieneImg from './HygieneImg';

export default function StoreInfo(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [hy,setHy] = useState([]);
    const [dlvrS,setDlvS] = useState(props.abledeliverS);
    const [dlvrE,setDlvE] = useState(props.abledeliverE);
    useEffect(()=>{
        
        console.log(props.abledeliverS);
        console.log(props.abledeliverE);
        console.log("storeinfRegDate:",props.abledeliverS);
        fetchHygiene(route.params.su_id);
    },[])
    const fetchHygiene=(su_id)=>{
        ApiService.fetchHygiene(su_id)
        .then(res=>{
            console.log("fetchHygiene.");
            setHy(res.data);
        })
        .catch(err=>{
            console.log("fetchHygiene ERR!",err);
        })
    }
    const returnHygiene=(data)=>{
        return data.map((c,index)=>{
            console.log(c.hgn_id);
            return (
                <>
                <Text note key={index}>이름</Text>
                <Text>{c.hgnTitle}</Text>
                <Text note>설명</Text>
                <Text>{c.hgnExpln}</Text>
                <HygieneImg su_id={c.su_id} hgn_id={c.hgn_id} />
                <Divider/>
                </>
            );
        })
    }
    const getUrl=async()=>{
        
        const reference = await storage().ref('images/menu/'+file.fileName);
        console.log("ref:",reference);
        const url = await reference.getDownloadURL();
        console.log("url:",url);
        setImgs(url);
    }
    return (
        <View>
            <Text note>스토어 이름</Text>
            <Text>{props.storeName}</Text>
            <Text note>스토어 설명</Text>
            <Text>{props.storeExplain}</Text>
            <Text note>주문 수</Text>
            <Text>{props.count}</Text>
            <Text note>찜한 수</Text>
            <Text>{props.favorite}</Text>
            <Text note>배달 가능 지역</Text>
            <Text>{props.deliverPosible}</Text>
            <Text note>스토어 주소</Text>
            <Text>{props.storeAddr1}</Text>
            <Text note>스토어 연락처</Text>
            <Text>{props.storePhone}</Text>
            <Text note>배달 가능 시간</Text>
            <Text>{props.abledeliverS?props.abledeliverS.substring(11,16):""}~{props.abledeliverE?props.abledeliverE.substring(11,16)+"\n":""}</Text>
            <Divider style={{borderWidth:1}}/>
            <View>
                <Text>위생정보{"\n"}</Text>
                {returnHygiene(hy)}
            </View>
        </View>
    );
}