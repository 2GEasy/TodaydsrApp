import React,{useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import {Button} from 'native-base';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';

export default function AddrSearch(props) {
    const [open,setOpen] = useState(false);
    const handlePress=()=>{
        setOpen(!open);
        console.log("handle");
        
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

        // console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        props.setAddr(fullAddress);
        handlePress();
    }
    return(
            <>
                <View>
                    <Button onPress={()=>handlePress()} style={{justifyContent:'center',backgroundColor:'orange',marginTop:10,width:100,height:40}}><Text style={{color:'white',fontSize:16}}>주소검색</Text></Button>
                    <Modal isVisible={open}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',maxHeight:400}}>        
                            <Postcode 
                                style={{width:350,maxHeight:400}}
                                jsOptions={{animated:true}}
                                onSelected={(data)=>handleAddress(data)}
                            />
                        </View>
                        <Button onPress={()=>handlePress()} style={{width:350,marginLeft:10,backgroundColor:'orange',flex:0,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontWeight:'bold'}}>취소</Text></Button>
                    </Modal>
                </View>
            </>
    );
}