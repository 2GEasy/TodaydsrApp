import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage } from 'react-native';
import { Card, CardItem,Body,Button,Text,Item,Label,Input} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider} from 'react-native-paper';

export default function PaymentForm(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [payment,setPayment] = useState({
        cardName:'',
        cardNumber:'',
        expDate:'',
        cvc:''
      });
      useEffect(()=>{
        if(!(Object.keys(props.payment).length===0)) {
            console.log(props.payment);
            setPayment(props.payment);
        }
      },[])
      useEffect(()=>{
        props.setPayment(payment);
      },[payment])
      const onChange=(e)=>{
        setPayment({...payment,[e.target.name]:e.target.value});
      }

    return (
        <>
            <Text>결제방법</Text>
            <View style={{flexDirection:'column'}}>
                <Item stackedLabel>
                    <Label>카드사</Label>
                    <Input name="cardName" value={payment.cardName} onChangeText={value=>setPayment({...payment,cardName:value})}/>
                </Item>
                <Item stackedLabel>
                    <Label>카드번호</Label>
                    <Input name="cardNumber" value={payment.cardNumber} onChangeText={value=>setPayment({...payment,cardNumber:value})}/>
                </Item>
                <Item stackedLabel>
                    <Label>유효기간</Label>
                    <Input name="expDate" value={payment.expDate} onChangeText={value=>setPayment({...payment,expDate:value})}/>
                </Item>
                <Item stackedLabel>
                    <Label>CVC</Label>
                    <Input name="cvc" value={payment.cvc} onChangeText={value=>setPayment({...payment,cvc:value})}/>
                </Item>
            </View>
        </>
    );
}