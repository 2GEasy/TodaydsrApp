import React,{useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import { List, Checkbox } from 'react-native-paper';
import {Container,Header,Content,Accordion,Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';
import AsyncStorage from '@react-native-community/async-storage';
import DaumMap from 'react-native-daummap';

export default function AppbarAddr(props) {
    const [open,setOpen] = useState(false);
    const [modify,setModify] = useState('');
    const [title,setTitle] = useState('');
    useEffect(()=>{
        DaumMap.setRestApiKey("8e5143da909b41be58a6a22ae9436b9b");
    },[])
    useEffect(()=>{
        getAddr();
    },[modify])

    const getAddr=async()=>{
        const addr = await AsyncStorage.getItem('addr');
        setTitle(addr)
    }
    const handlePress=()=>{
        setOpen(!open);
    }
    const handleAddress=(data)=>{
        // console.log(data);
        let fullAddress = data.address;
        let extraAddress = ''; 
    
        if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        let addr = data.address;
        // console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        // props.setAddr(fullAddress);
        AsyncStorage.setItem('addr',addr);
        setModify(addr);
        addr2geo(data.address);
        handlePress();
    }
    const addr2geo=(addr)=>{
        DaumMap.setRestApiKey("8e5143da909b41be58a6a22ae9436b9b");
        DaumMap.serachAddress(addr)
        .then((responseJson) => {
            // API 결과값 반환
            console.log(responseJson.documents[0].x,responseJson.documents[0].y);
            AsyncStorage.setItem('cgeox',responseJson.documents[0].x);
            AsyncStorage.setItem('cgeoy',responseJson.documents[0].y);
        }).catch((error) => {
            // API 호출 중 오류 발생시
            console.log(error);
        });
      }
    return(
            <>
                <View>
                    <Button transparent onPress={handlePress} style={{flex:1,justifyContent:'center'}}><MaterialCommunityIcons name="map-marker" size={26} style={{color:'#FFFFFF'}}/><Text style={{color:'white'}}>{title?title:"주소를 지정해주세요."}</Text></Button>
                    <Modal isVisible={open}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',maxHeight:400}}>        
                            <Postcode 
                                style={{width:350,maxHeight:400}}
                                jsOptions={{animated:true}}
                                onSelected={(data)=>handleAddress(data)}
                            />
                        </View>
                        <Button onPress={handlePress} style={{width:350,marginLeft:10,backgroundColor:'orange',flex:0,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontWeight:'bold'}}>취소</Text></Button>
                    </Modal>
                </View>
            </>
    );
}