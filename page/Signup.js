import React, { useState, useEffect } from 'react';
import {Text,View} from 'react-native';

import { Container, Header, Content, DatePicker,Form, Item, Input, Label,Button, ListItem, Left,Right, Radio } from 'native-base';
import { RadioButton } from 'react-native-paper';
import AddrSearch from '../components/AddrSearch';
import ApiService from '../ApiService';

export default function Signup({navigation}) {
    const [id,onChangeId] = useState('');
    const [pw,onChangePw] = useState('');
    const [user,setUser] = useState({
        pu_id: '',
        name:'',
        pw:'',
        pwchk:'',
        gender:'female',
        birth:new Date(),
        phone:'',
        addr1:'',
        addr2:'',

    });
    const setDate=(date)=>{
        setUser({...user,birth:date});
    }
    const handleChange=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        })
    }
    const setAddr=(addr)=>{
        setUser({...user,addr1:addr});
    }
    const insertUser=()=>{
        let tempUser = {
            pu_id: user.pu_id,
            name:user.name,
            pw:user.pw,
            gender:user.gender,
            birth:user.birth,
            phone:user.phone,
            addr1:user.addr1,
            addr2:user.addr2,
        }
        ApiService.insertUser(tempUser)
        .then(res=>console.log(res)
        )
        .catch(err=>console.log(err)
        )
    }
    return (
        <> 
            <Container>
                <Content style={{margin:20}}>
                    <Form>
                        <Item stackedLabel>
                            <Label>아이디</Label>
                            <Input name="pu_id" value={user.pu_id} onChangeText={value=>setUser({...user,pu_id:value})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>비밀번호</Label>
                            <Input name="pw" value={user.pw} onChangeText={value=>setUser({...user,pw:value})} secureTextEntry={true}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>비밀번호 확인</Label>
                            <Input name="pwchk" value={user.pwchk} onChangeText={value=>setUser({...user,pwchk:value})} secureTextEntry={true}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>이름</Label>
                            <Input name="name" value={user.name} onChangeText={value=>setUser({...user,name:value})}/>
                        </Item>
                        <AddrSearch setAddr={setAddr} />
                        <Item stackedLabel>
                            <Label>주소</Label>
                            <Input name="addr1" value={user.addr1} onChangeText={value=>setUser({...user,addr1:value})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>상세주소</Label>
                            <Input name="addr2" value={user.addr2} onChangeText={value=>setUser({...user,addr2:value})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>연락처</Label>
                            <Input name="phone" value={user.phone} onChangeText={value=>setUser({...user,phone:value})}/>
                        </Item>
                        <View style={{marginLeft:20}}>
                            <Label>성별</Label>
                            <RadioButton.Group
                                onValueChange={value => setUser({...user, gender:value })}
                                value={user.gender}
                            >
                                <Text>남자</Text>
                                <RadioButton value="male" color="orange"/>
                                
                                <Text>여자</Text>
                                <RadioButton value="female" color="orange"/>
                                
                            </RadioButton.Group>
                        </View>
                        <View style={{marginLeft:20}}>
                            <Label>생년월일</Label>
                            <DatePicker
                                    defaultDate={new Date(1994, 7, 7)}
                                    minimumDate={new Date(1920, 1, 1)}
                                    maximumDate={new Date(2010, 12, 31)}
                                    locale={"ko"}
                                    confirmBtnText="확인"

                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={user.birth.toString().substr(4, 12)}
                                    textStyle={{ color: "orange" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    format="YYYY-MM-dd"
                                    onDateChange={setDate}
                                    disabled={false}
                            />
                        </View>
                        <Button transparent warning style={{flex:1,justifyContent:'center',alignItems:'center',margin:20}} onPress={()=>insertUser}><Text style={{color:'white',fontWeight:'bold'}}>회원가입</Text></Button>
                    </Form>
                    <Button transparent style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate('Login')}>
                        <Text style={{color:'steelblue'}}>이미 회원가입하셨다면 로그인해주세요!</Text>
                    </Button>
                </Content>
            </Container>
        </>
    );
}