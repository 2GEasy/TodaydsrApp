import React,{useState,useEffect} from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ApiService from '../ApiService';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';



export default function Store(props) {
    const navigation = useNavigation();    
    const [file,setFile] = useState({});
    const [imgs,setImgs] = useState(null);
    useEffect(()=>{
        if(props.storeImgChk) {
            fetchStoreImg(props.su_id);
        }else{
            setFile(null);
        }
    },[])
    const fetchStoreImg=(su_id)=>{
        ApiService.fetchStoreImgByID(su_id)
        .then(res=>{
            setFile(res.data);
            console.log("fetchStoreImg");
            // console.log("reference:",reference);
            // const path = getUrl(res.data.fileName);
            // setImgs(path);
        })
        .catch(err=>{
            console.log("fetchStoreImg ERR", err);
        })
    }
    const getUrl=()=>{
        
        return "https://todaydsr.kro.kr:8090/upload/store/"+file.fileName;
    }
    return (
        
        <Card style={{position:'relative'}}>
            <CardItem button onPress={()=>navigation.navigate('Store',{"su_id":props.su_id,"storeName":props.storeName})}>
            <Left>
                {file?
                <Thumbnail style={{width: 100, height: 100, borderRadius: 0}} source={{uri:getUrl()}} />
                :
                <Thumbnail style={{width: 100, height: 100, borderRadius: 0}} source={{uri:"https://placeimg.com/64/64/2"}} />
                }
                <Body>
                <Text>{props.storeName}</Text>
                <Text note>{props.storeExplain}</Text>
                <Text note>{new Date(props.abledeliverS).toLocaleTimeString("ko-KR")}~</Text>
                <Text note>{new Date(props.abledeliverE).toLocaleTimeString("ko-KR")} 배달가능</Text>
                <Text note>{props.deliverPosible}</Text>
                <Text note>거리 {props.distance} m</Text>
                <Text note>주문수 {props.count} / 찜 수 {props.favorite}</Text>
                </Body>
            </Left>
            </CardItem>
        </Card>
        
    );
}