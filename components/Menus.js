import React,{useState,useEffect} from 'react';
import { Image,View } from 'react-native';
import { Card, CardItem,Text,Body} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';



export default function Menus(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [file,setFile] = useState({});
    const [imgs,setImgs] = useState(null);
    useEffect(()=>{
        if(props.fileChk) {
            fetchMenuImg(props.su_id,props.mn_id);
        }else{
            setFile(null);
        }
    },[])
    const fetchMenuImg=(su_id,mn_id)=>{
        ApiService.fetchMenuImage(su_id,mn_id)
        .then(res=>{
            setFile(res.data);
            console.log("fetchMenuImg");
        })
        .catch(err=>{
            console.log("fetchMenuImg ERR", err);
        })
    }
    const getUrl=()=>{
        
        return "http://todaydsr.kro.kr:7979/upload/menu/"+file.fileName;
    }
    return (
        <View>
        <Card>
            <CardItem 
            button onPress={()=>navigation.navigate('Menu',{"su_id":props.su_id,"mn_id":props.mn_id,"name":props.name,"price":props.price,"img":getUrl()})}
            >
                <Body style={{padding:0,margin:0,width:'100%'}}>
                {file?
                <Image style={{width: "100%", height:200,borderRadius: 0}} source={{uri:getUrl()}} />
                :
                <Image style={{width: "100%", borderRadius: 0}} source={{uri:"https://via.placeholder.com/150"}} />
                }
                
                <Text>{props.name}</Text>
                <Text>{props.produce}</Text>
                <Text>{props.price}원</Text>
                
                </Body>
            </CardItem>
        </Card>
        {/* <Image source={{uri:reference}} style={{width:100,height:100}}/> */}
        </View>
    );
}