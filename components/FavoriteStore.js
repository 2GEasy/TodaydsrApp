import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, AppState } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Textarea } from 'native-base';
import { Modal, Portal, Provider } from 'react-native-paper';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Orders(props) {
    const navigation = useNavigation();    
    const route = useRoute();

    const [file,setFile] = useState({});
  
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
            console.log("fetchStoreImg",res.data);
        })
        .catch(err=>{
            console.log("fetchStoreImg ERR", err);
        })
    }
    return (
        <View>
            <Card>
                <CardItem button onPress={()=>navigation.navigate('Store',{"su_id":props.su_id,"storeName":props.storeName})}>
                <Left>
                    {file?
                    <Thumbnail style={{width: 100, height: 100, borderRadius: 0}} source={{uri:"http://todaydsr.kro.kr:7979/upload/store/"+file.fileName}} />
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
        </View>
    );
}