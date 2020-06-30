import React,{useState,useEffect} from 'react';
import {View,Text, Image, AsyncStorage} from 'react-native';
import {Button} from 'native-base';
import DaumMap from 'react-native-daummap';
import ImagePicker from 'react-native-image-picker';
import ImagePickerCrop from 'react-native-image-crop-picker';
import Axios from 'axios';

export default function MyPage({navigation}) {
    const [photo,setPhoto] = useState(null);
    const [sess,setSess] = useState(false);
    const [id,setId] = useState("");
    useEffect(()=>{
        async function getStart() {
            setId(await AsyncStorage.getItem('cid'));
            const chk = await AsyncStorage.getItem('cid');
            if(chk) {
                setSess(true);
            }else{ 
                setSess(false);
                alert('로그인을 해주세요!');
                navigation.navigate('Login');
            }
        }
        getStart();
    },[])
    let data = new FormData();
    const showPicker=()=>{
        const options = {
            title: '선택',
            takePhotoButtonTitle:'카메라',
            chooseFromLibraryButtonTitle:'이미지 선택',
            cancelButtonTitle:'취소'
        };
        ImagePicker.showImagePicker(options,(response) => {
            console.log('Response = ', response.uri,response.path);
          
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
              console.log("img source:",source);
              if(source.uri){
                  setPhoto(source);
                  handlePostImg(response)
              }
            }
        });
    }
    const showPickCrop=()=>{
        ImagePickerCrop.openPicker({
            multiple:true,
            waitAnimationEnd:false,
            includeExif:true,
            compressImageQuality:0.8,
            mediaType:'photo'
        })
        .then(images=>{
            images.map((item,index)=>{
                console.log(JSON.stringify(item));
                data.append("file",item);
            })
            upload();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const upload=()=>{
        fetch("https://todaydsr.kro.kr:8090/reviewImg/test1/puser1234/30",{
            method:'post',
            headers:{'Accept':"application/x-www-form-unlencoded",
        },
        body:data,
        })
        .then(res=>res.json())
        .then(console.log("Success"))
        .catch(err=>{
            console.log(err);
        })
    }
    const handlePostImg=async(img)=> {
        const formData = new FormData();
        formData.append('file',img);
        let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        };
        // const pu_id = await AsyncStorage.getItem('cid');
        console.log("formData:",formData._parts);
        // console.log("su:",props.su_id,"pu:",pu_id,"ord:",props.ord_id);
        Axios.post("https://todaydsr.kro.kr:8090/reviewImg/test1/puser1234/30",formData,config)
        .then(res=>{
            console.log("postImg");
        })
        .catch(err=>{
            console.log("postImg Err",err);
        })
      }
      const clickLogout=async()=>{
          await AsyncStorage.removeItem('cid');
          alert('로그아웃 되었습니다! 다시 로그인해주세요!')
          navigation.navigate('Login');
          setSess(false);
      }
    return (
        <View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>MyPage</Text>
            <Text style={{alignSelf:'center',fontSize:14}}>{id}님</Text>
            {/* <Button title="로그인" onPress={()=>navigation.navigate('Login')}> */}
            <Button onPress={showPicker} style={{alignSelf:'center',width:100,justifyContent:'center'}}><Text>이미지</Text></Button>
            <Button onPress={showPickCrop} style={{alignSelf:'center',width:100,justifyContent:'center'}}><Text>이미지크롭</Text></Button>
            {photo&&(<Image source={{uri:photo.uri}} style={{width:300,height:300}}/>)}
            {sess&&
            <Button onPress={()=>clickLogout()} style={{backgroundColor:'#ff9800',justifyContent:'center',width:100,alignSelf:'center'}}><Text>로그아웃</Text></Button>
            }
        </View>
    );
}