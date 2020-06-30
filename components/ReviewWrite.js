import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, AppState } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Textarea } from 'native-base';

import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';



export default function Orders(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [photo,setPhoto] = useState(null);
    const [open,setOpen] = useState(false);
    const [files, setFiles] = useState(null);
    const [review, setReview] = useState({
        ord_id:0,
        su_id:'',
        pu_id:'',
        content:'',
        score:0,
        fileChk:false,
        regDate:new Date()
    });
    
    const showPicker=()=>{
        const options = {
            title: '선택',
            takePhotoButtonTitle:'카메라',
            chooseFromLibraryButtonTitle:'이미지 선택',
            cancelButtonTitle:'취소'
        };
        ImagePicker.showImagePicker(options,(response) => {
            console.log('Response = ', response.path,response.uri);
          
            if (response.didCancel) {
              console.log('취소되었습니다.');
            } else if (response.error) {
              console.log('이미지 선택 오류: ', response.error);
            } else if (response.customButton) {
              console.log('커스텀 버튼 선택: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            //   console.log("img source:",source.path,source.uri);
              setFiles(response);
              setReview({...review, fileChk:true})
              setPhoto(source);
            }
        });
    }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setReview({
            ord_id:0,
            su_id:'',
            pu_id:'',
            content:'',
            score:0,
            fileChk:false,
            regDate:new Date()
        });
        setFiles(null);
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        let reviewTemp = {
            ord_id: props.ord_id,
            su_id: props.su_id,
            pu_id: await AsyncStorage.getItem("cid"),
            content: review.content,
            score: review.score,
            fileChk: review.fileChk,
            regDate: new Date()
        }
        ApiService.insertReview(reviewTemp)
        .then(res=>{
            console.log('리뷰 등록 성공.' ,res.data);
            // if(files!==null) {
            handlePostImg();
            // }
            props.setReviewChk(true);
            handleClose();
        })
        .catch(err=>{
            console.log("insertReview Error!",err);
        })
    }
    const handlePostImg=async()=> {
        const formData = new FormData();
        formData.append('file',{
            name:files.fileName,
            type:'image/jpg',
            uri: files.uri,
            path: files.path
        });
        let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        };
        const pu_id = await AsyncStorage.getItem('cid');
        console.log("formData:",formData._parts);
        console.log("su:",props.su_id,"pu:",pu_id,"ord:",props.ord_id);
        Axios.post("https://todaydsr.kro.kr:8090/reviewImg/"+props.su_id+"/"+pu_id+"/"+props.ord_id,formData,config)
        .then(res=>{
            console.log("postImg");
        })
        .catch(err=>{
            console.log("postImg Err",err);
        })
      }
      
    return (
                <View>
                    <Button onPress={handleClickOpen}><Text>리뷰 작성</Text></Button>
                    <Modal isVisible={open} style={{backgroundColor:'#ffffff',height:'auto',maxHeight:500,padding:20}}>
                    <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>리뷰 등록</Text>
                    <Text>{props.storeName}</Text>
                    <Text>{props.menu}</Text>
                    <Textarea value={review.content} onChangeText={(value)=>setReview({...review,content:value})} rowSpan={5} bordered/>
                    <View>
                    <Button style={{backgroundColor:'#ff9800',width:100,justifyContent:'center',margin:10}} onPress={showPicker}><Text>이미지</Text></Button>
                    {photo&&(<Image source={{uri:photo.uri}} style={{width:100,height:100,margin:10}}/>)}
                    </View>
                    <AirbnbRating
                          count={5}
                          defaultRating={review.score}
                          size={20}
                          showRating={false}
                          onFinishRating={(rating)=>setReview({...review,score:rating})}
                    />
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Button onPress={onSubmit} style={{backgroundColor:'#f57c00',color:'#ffffff',margin:10}}><Text>등록</Text></Button>
                    <Button onPress={handleClose} style={{backgroundColor:'#f57c00',color:'#ffffff',margin:10}}><Text>닫기</Text></Button>
                    </View>
                    </Modal>
                </View>
       
    );
}