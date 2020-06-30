import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage } from 'react-native';
import { Card, CardItem,Body,Button,Text, Item,Label,Input} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddrSearch from '../components/AddrSearch';

export default function AddressForm(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours()+6);
    const [deliver,setDeliver] = useState({
        name:'',
        addr1:'',
        addr2:'',
        phone:'',
        dreqstart:new Date(),
        dreqend:defaultTime
    });
    const [startShow, setStartShow] = useState(false);
    const [endShow, setEndShow] = useState(false);
    useEffect(()=>{
        async function getStart() {
            if(!(Object.keys(props.deliver).length===0)) {
                console.log(props.deliver);
                setDeliver(props.deliver);
            }else{
                if(await AsyncStorage.getItem('cid')){
                    fetchCustomerByID(await AsyncStorage.getItem('cid'));
                    // fetchDeliverDate(props.su_id);
                }
            }
        }
        getStart();
    },[])
    useEffect(()=>{
        props.setDeliver(deliver);
    },[deliver])
    const fetchDeliverDate=(su_id)=>{
        ApiService.fetchDeliverDate(su_id)
        .then(res=>{
            const deliver=res.data;
            setDeliver({...deliver,
                dreqstart:deliver.abledeliverS,
                dreqend: deliver.abledeliverE
            });
        })
        .catch(err=>console.log(err))
    }
    const fetchCustomerByID=(pu_id)=>{
        ApiService.fetchCustomerByID(pu_id)
        .then(res=>{
            const customer = res.data;
            setDeliver(
                {
                ...deliver,
                name:customer.name,
                addr1:customer.addr1,
                addr2:customer.addr2,
                phone:customer.phone
            })
        })
        .catch(err=>{
            console.log("fetchCustomer ERR", err);
        })
    }
    const handleStartDateChange = (event,selectedDate) => {
        console.log("start:",selectedDate);
        const currentDate = selectedDate || deliver.dreqstart;
        setDeliver({
            ...deliver, dreqstart:currentDate
        })
        setStartShow(!startShow);
    };
    const handleEndDateChange = (event,selectedDate) => {
        const currentDate = selectedDate || deliver.dreqend;
        setDeliver({
            ...deliver, dreqend:currentDate
        })
        setEndShow(!endShow);
    };
    const onChange=(e)=>{
        setDeliver({...deliver,[e.target.name]:e.target.value});
    }
    const setAddr=(addr)=>{
        setDeliver({...deliver,addr1:addr});
    }
    const showStartTimepicker = () => {
        setStartShow(!startShow);
    };
    const showEndTimepicker = () => {
        setEndShow(!endShow);
    };
    
    return (
        <>
            <Text>배달 주소</Text>
            <View style={{flexDirection:'column'}}>
                <Item stackedLabel>
                    <Label>이름</Label>
                    <Input name="name" value={deliver.name} onChangeText={value=>setDeliver({...deliver,name:value})}/>
                </Item>
                <View style={{height:50}}>
                    <AddrSearch setAddr={setAddr}/>
                </View>
                <Item stackedLabel>
                    <Label>주소</Label>
                    <Input name="addr1" value={deliver.addr1} onChangeText={value=>setDeliver({...deliver,addr1:value})}/>
                </Item>
                <Item stackedLabel>
                    <Label>상세주소</Label>
                    <Input name="addr2" value={deliver.addr2} onChangeText={value=>setDeliver({...deliver,addr2:value})}/>
                </Item>
                <Item stackedLabel>
                    <Label>연락처</Label>
                    <Input name="phone" value={deliver.phone} onChangeText={value=>setDeliver({...deliver,phone:value})}/>
                </Item>
                <Text>배달요청시간(부터)</Text>
                <View>
                <Button transparent onPress={showStartTimepicker}><Text style={{color:'black'}}>지정</Text></Button>
                {/* <Text>{deliver&&deliver.dreqstart&&new Date(deliver.dreqstart).toLocalTimeString('ko-KR')}</Text> */}
                </View>
                {startShow&&
                    <DateTimePicker
                        value={deliver.dreqstart}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleStartDateChange}
                        onTouchCancel={()=>setStartShow(!startShow)}

                    />
                }
                <Text>배달요청시간(까지)</Text>
                <View>
                <Button transparent onPress={showEndTimepicker}><Text style={{color:'black'}}>지정</Text></Button>
                {/* <Text>{new Date(deliver.dreqend).toLocalTimeString('ko-KR')}</Text> */}
                </View>
                {endShow&&
                    <DateTimePicker
                        value={deliver.dreqend}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleEndDateChange}
                        onTouchCancel={()=>setEndShow(!endShow)}
                    />
                }
            </View>
        </>
    );
}