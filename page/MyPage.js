import React,{useState,useEffect,useCallback} from 'react';
import {View,Text, Image, AsyncStorage} from 'react-native';
import {Button} from 'native-base';
import {useNavigation,useRoute,useFocusEffect} from '@react-navigation/native';
import Axios from 'axios';

export default function MyPage({navigation}) {
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
    useFocusEffect(useCallback(() => {
        console.debug("screen takes focus");
        getStart();
        return () => {console.debug("screen loses focus");loseFocus();};
      }, []));
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
      const loseFocus=()=>{
        setSess(false);
        setId("");
      }
      const clickLogout=async()=>{
          await AsyncStorage.removeItem('cid');
          alert('로그아웃 되었습니다! 다시 로그인해주세요!')
          navigation.navigate('Login');
          setSess(false);
      }
    return (
        <View>
            <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>MyPage{`\n`}</Text>
            <Text style={{alignSelf:'center',fontSize:14}}>{id}님{`\n`}</Text>
            {/* <Button title="로그인" onPress={()=>navigation.navigate('Login')}> */}
            
            {sess&&(
            <>
            {/* <Button style={{backgroundColor:'#ff9800',justifyContent:'center',width:100,alignSelf:'center',margin:10}}><Text>회원정보수정</Text></Button> */}
            <Button onPress={()=>clickLogout()} style={{backgroundColor:'#ff9800',justifyContent:'center',margin:10,width:100,alignSelf:'center'}}><Text>로그아웃</Text></Button>
            </>
            )}
        </View>
    );
}