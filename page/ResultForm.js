import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage } from 'react-native';
import { Card, CardItem,Body,Button,Text,Item,Label,Input, Right} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider} from 'react-native-paper';
import ResultItem from '../components/ResultItem';

export default function ResultForm(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [orderItems,setOrderItems] = useState([]);
    const [total,setTotal] = useState(0);
    useEffect(()=>{
        setOrderItems(props.order);
    },[])
    return (
        <>
            <Text>주문 확인</Text>
            <View style={{flexDirection:'column'}}>
                {orderItems.map((c)=>{
                return <ResultItem su_id={c.su_id} mn_id={c.mn_id} amount={c.amount} setTotal={setTotal} total={total}/>;
                })}
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>합계</Text>
                <Right><Text>{total}원</Text></Right>
            </View>
            <Divider style={{marginTop:10,marginBottom:10}}/>
            <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'column'}}>
                    <Text>배달정보</Text>
                    <View style={{flexDirection:'column'}}>
                        <Text>구매자</Text>
                        <Text note>{props.deliverSet.name}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text>주소</Text>
                        <Text note>{props.deliverSet.addr1}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text>상세주소</Text>
                        <Text note>{props.deliverSet.addr2}</Text>
                    </View>
                </View>
                <Right>
                <View style={{flexDirection:'column'}}>
                    <Text>결제 상세</Text>
                    <View style={{flexDirection:'column'}}>
                        <Text>카드사</Text>
                        <Text note>{props.paymentSet.cardName}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text>카드번호</Text>
                        <Text note>{props.paymentSet.cardNumber}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text>유효기간</Text>
                        <Text note>{props.paymentSet.expDate}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text>CVC</Text>
                        <Text note>{props.paymentSet.cvc}</Text>
                    </View>
                </View>
                </Right>
            </View>
        </>
    );
}