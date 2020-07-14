import React, { useState, useEffect,useCallback } from 'react';
import {useNavigation,useRoute,useFocusEffect} from '@react-navigation/native';
import { Container, Header, Content, DatePicker,Text,Form, Item, Input, Label,Button, ListItem, Left,Right, Radio } from 'native-base';
import messaging from '@react-native-firebase/messaging';
import ApiService from '../ApiService';
import { AsyncStorage } from 'react-native';

export default function Login(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [login,setLogin] = useState({
        pu_id: '',
        pw: ''
    })
    useEffect(()=>{
        async function getStart() {
            const chkLogin = await AsyncStorage.getItem('cid');
            if(chkLogin) {
                navigation.navigate('Home');
            }
        }
        getStart();
    },[login])
    
    const onLogin=()=>{
        ApiService.loginUser(login.pu_id,login.pw)
        .then(async res=>{
                if(res.data===0) {
                    console.log('확인되지 않는 회원정보입니다. 다시 확인해주세요');
                }else if(res.data===2){
                    console.log('비밀번호가 틀렸습니다. 다시 확인해주세요');
                }else if(res.data===1) {
                    console.log(login.pu_id + '님이 성공적으로 로그인 되었습니다.');
                    await AsyncStorage.setItem('cid',login.pu_id);
                    navigation.navigate('Home');

                    gettingToken(login.pu_id);
                }
        })
        .catch(err=>console.log(err)
        )
    }
    const gettingToken=async(id)=>{
        const enabled = await messaging().hasPermission();
        if(enabled) {
            messaging().getToken()
                    .then(token=>{
                        console.log("token:",token);
                        insertToken(token,id);
                    })
        }else{
            messaging().requestPermission()
            .then(()=> {
                console.log("허가");
                messaging().getToken().then(token=>{
                    console.log("token:",token);
                    insertToken(token,id);
                })
            })
            .catch(err=>console.log(err));
        }
    }
    const insertToken=async(token,id)=>{
        
        let tempToken={}
        tempToken={
          user_id: id,
          user_type: 'p',
          uuid: 'mobile',
          token: token
        }
        
        console.log(tempToken);
        
        ApiService.insertToken(tempToken)
        .then(res=>{
          // console.log(res);
        })
        .catch(err=>console.log(err));
    }

    return (
        <> 
                <Content style={{margin:20}}>
                    <Form>
                        <Item stackedLabel>
                            <Label>아이디</Label>
                            <Input name="pu_id" onChangeText={value=>setLogin({...login,pu_id:value})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>비밀번호</Label>
                            <Input name="pw" onChangeText={value=>setLogin({...login,pw:value})} secureTextEntry={true}/>
                        </Item>
                        <Button style={{backgroundColor:'orange',justifyContent:'center',margin:20}} onPress={()=>onLogin()}><Text>로그인</Text></Button>
                        <Button transparent style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate('Signup')}>
                            <Text style={{color:'steelblue'}}>회원가입을 아직 안하셨다면 회원가입을 해주세요!</Text>
                        </Button>
                    </Form>
                </Content>
        </>
    );
}