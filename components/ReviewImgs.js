import React,{useState,useEffect} from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import PreviewCarousel from 'react-native-image-preview-carousel';
import Slideshow from 'react-native-image-slider-show';

export default function ReviewImg(props) {
    const [reviewImgs,setReviewImgs] = useState([]);
    const navigation = useNavigation();    
    const route = useRoute();
    const position = 1;
    
    const [path,setPath] = useState([]);
    useEffect(()=>{
        fetchReviewImg(props.rvw_id);
    },[])
    const fetchReviewImg=(rvw_id)=>{
        ApiService.fetchReviewImg(rvw_id)
        .then(res=>{
            setReviewImgs(res.data);
            res.data.map((c,index)=>{
                setPath(path.concat({"uri":"https://todaydsr.kro.kr:8090/upload/review/"+c.fileName}));
            })
        })
        .catch(err=>{
            console.log("fetchReviewImg ERR", err);
        })
    }
    const returnReviewImgs=(path)=>{
        return reviewImgs.map((c,index)=>{
                return <Image source={{uri:"https://todaydsr.kro.kr:8090/upload/review/"+c.fileName}} style={{width:120,height:100,margin:10}}/>
        })
        // return (
        //     <View style={{flex:1,alignItems:'center'}}>
        //     <Slideshow 
        //         // height={200}
        //         dataSource={path}
        //         position={1}
        //         scrollEnabled={false}
        //         // containerStyle={{width:100}}
        //         // width={50}
        //         style={{width:10}}
        //     />
        //     </View>
        // )
    }
    const returnTest=(path)=>{
        return (
            <PreviewCarousel
                data={path}
                containerStyle={{width:200,height:200}}
                // selectedPreviewImageContainerStyle={{width:200,height:100}}
                mainImageStyle={{width:150,height:50}}
                mainImageContainerStyle={{width:150,height:50}}
                previewImageStyle={{width:50,height:10}}
                previewImageContainerStyle={{width:50,height:10}}
                previewFlatListContainerStyle={{width:20,height:10}}
                // previewFlatListProps={path}
            />
        )
    }
    return (
            // {getUrl()?
            // <Image style={{width: "100%", height:200,borderRadius: 0}} source={{uri:imgs}} />
            // :
            // <Image style={{width: "100%", borderRadius: 0}} source={{uri:"https://via.placeholder.com/150"}} />
            // }
        <View style={{flexDirection:'row'}}>
            {path?returnReviewImgs(path):null}
            {/* {path?returnTest(path):null} */}
            {/* <Image source={{uri:getUrl("02d7ec29-1c35-425d-9099-bbf8d0697731.jpg")}} style={{width:100,height:100}}/> */}
        </View>
    );
}