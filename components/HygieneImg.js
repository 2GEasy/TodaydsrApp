import React,{useState,useEffect} from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import PreviewCarousel from 'react-native-image-preview-carousel';
import Slideshow from 'react-native-image-slider-show';

export default function HygieneImg(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [himg,setHimg] = useState([]);
    const [path,setPath] = useState([]);
    useEffect(()=>{
        setHimg([]);
        setPath([]);
        console.log(props.su_id, props.hgn_id);
        if(props.su_id !== null && props.hgn_id !==null){
            fetchHygieneImg(props.su_id, props.hgn_id);
            // inputPaths(himg);
        }
    },[])
    useEffect(()=>{
        console.log('usepath:',path);
    },[path])
    const fetchHygieneImg=(su_id,hgn_id)=>{
        ApiService.fetchHygieneImg(su_id,hgn_id)
        .then(res=>{
            // console.log("fetchHygieneImg.");
            setHimg(res.data);
            res.data.map((c,index)=>{
                setPath(path.concat({"url":"https://todaydsr.kro.kr:8090/upload/hygiene/"+c.fileName}));
            })
        })
        .catch(err=>{
            console.log("fetchHygieneImg ERR!",err);
        })
    }
    const returnHygieneImgs=(path)=>{
        // return himg.map((c,index)=>{
        //         return <Image source={{uri:getUrl(c.fileName)}} style={{width:100,height:100}}/>
        //     })
        return (
            <Slideshow 
                dataSource={path}
                style={{width:100}}
            />
            // <PreviewCarousel 
            //     data={path}
            //     containerStyle={{width:300}}
            //     mainFlatListContainerStyle={{width:300}}
            //     mainImageStyle={{width:300,height:200}}
            //     mainImageContainerStyle={{width:300,height:200}}
            //     selectedPreviewImageContainerStyle={{width:300,height:200}}
            //     previewImageContainerStyle={{width:100,height:100}}
            //     previewFlatListContainerStyle={{width:300,height:100}}
            //     previewFlatListProps={path}
            // />
        )
    }
    return (
            // {getUrl()?
            // <Image style={{width: "100%", height:200,borderRadius: 0}} source={{uri:imgs}} />
            // :
            // <Image style={{width: "100%", borderRadius: 0}} source={{uri:"https://via.placeholder.com/150"}} />
            // }
        <View style={{flex:1}}>
            {path?returnHygieneImgs(path):null}
            {/* <Image source={{uri:getUrl("02d7ec29-1c35-425d-9099-bbf8d0697731.jpg")}} style={{width:100,height:100}}/> */}
        </View>
    );
}