import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, AppState } from 'react-native';
import { Button,Text } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import Axios from 'axios';
// import { Modal, Portal, Provider } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Divider } from 'react-native-paper';
export default function Orders(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [open,setOpen] = useState(false);

    const handleOpen=()=>{
        setOpen(!open);
    }
    const setDistance=(distance)=>{
        props.refresh();
        props.setDist(distance);
        setOpen(!open);
    }
    return (
        <View>
                    <Button transparent style={{width:50}} onPress={handleOpen}><MaterialCommunityIcons name="filter" size={26} style={{color:'#ff9800'}}/></Button>
                    <Modal isVisible={open} style={{alignSelf:'center',width:200}}>
                        <View style={{flex:1,alignItems:'center',maxHeight:400,maxWidth:200,backgroundColor:'white'}}>
                            <Text note style={{fontSize:18}}>거리</Text>
                            {/* <Divider style={{borderColor:'#000',borderWidth:1}}/> */}
                            <Button transparent onPress={()=>setDistance(500)}><Text style={{color:'black',fontSize:20}}>500</Text></Button>
                            <Button transparent onPress={()=>setDistance(1000)}><Text style={{color:'black',fontSize:20}}>1000</Text></Button>
                            <Button transparent onPress={()=>setDistance(1500)}><Text style={{color:'black',fontSize:20}}>1500</Text></Button>
                        </View>
                    </Modal>
        </View>
    );
}