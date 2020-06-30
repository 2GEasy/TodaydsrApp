import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider,DataTable} from 'react-native-paper';

export default function CartItem(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [sess,setSess] = useState('');
    const [menu,setMenu] = useState({});
    const [amount,setAmount] = useState(1);
    const [deleted,setDeleted] = useState(false);
    useEffect(()=>{
        async function getStart() {
            setSess(await AsyncStorage.getItem('cid'));
            console.log("cartItem ",props.mn_id,props.su_id);
            if(props.su_id!==null && props.mn_id!==null) {
                fetchMenu(props.su_id,props.mn_id);
                setAmount(props.amount);
            }
        }   
        getStart();
    },[])
    useEffect(()=>{
        let updateItem={
            pu_id: sess,
            su_id: props.su_id,
            mn_id: props.mn_id,
            amount: amount
        }
        ApiService.updateCartItem(updateItem)
        .then(res=>{
            console.log("updateCartItem Success");
        })
        .catch(err=>{
            console.log("updateCartItem ERR",err);
        })
    },[amount])
    const getSessionId=async()=>{
        console.log("cartitem ",await AsyncStorage.getItem('cid'));
        setSess(await AsyncStorage.getItem('cid'));
    }
    const fetchMenu=(su_id,mn_id)=>{
        ApiService.fetchMenu(su_id,mn_id)
        .then(res=>{
            setMenu(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log("fetchMenu ERR",err);
        })
    }
    
    const changeAmount=(amount)=>{
        let updateItem={
            pu_id: sess,
            su_id: props.su_id,
            mn_id: props.mn_id,
            amount: amount
        }
        ApiService.updateCartItem(updateItem)
        .then(res=>{
            console.log("updateCartItem Success");
            props.refreshState();
        })
        .catch(err=>{
            console.log("updateCartItem ERR",err);
        })
    }
    const deleteItem=(pu_id,su_id,mn_id)=>{
        ApiService.deleteItem(pu_id,su_id,mn_id)
        .then(res=>{
            console.log("deleteItem Success");
            setDeleted(true);
        })
        .catch(err=>{
            console.log("deleteItem ERR",err);
        })
    }
    const returnContent=()=>{
        return <Text>false</Text>
    }
    const returnFalse=()=>{
        return <Text>true</Text>
    }
    return (
        <View>
        {!deleted&&
            <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{menu?menu.name:"Loading.."}</Text>
                  <Text note>{menu?menu.name +" "+menu.price+"원":"Loading..."}</Text>
                </Body>
              </Left>
              <Right>
                    <Button onPress={()=>deleteItem(sess,props.su_id,props.mn_id)} style={{backgroundColor:'#ff9800'}}><Text style={{fontWeight:'bold'}}>삭제</Text></Button>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                    <Text>{menu?(menu.price*amount)+"원":"Loading..."}</Text>
                </Body>
              </Left>
              <Right>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Button onPress={()=>setAmount(amount+1)} style={{backgroundColor:'#DDD',width:40,height:40,justifyContent:'center'}}><Text style={{color:'black',fontSize:16}}>{"+"}</Text></Button><Text style={{margin:10}}>{amount}개</Text><Button style={{backgroundColor:'#DDD',width:40,height:40,justifyContent:'center'}} onPress={()=>{if(amount>1) {setAmount(amount-1)}else{alert("수량이 1 이하 입니다.")}}}><Text style={{color:'black',fontSize:20}}>{"-"}</Text></Button>
                </View>
              </Right>
            </CardItem>
          </Card>
          }
        </View>
    );
}