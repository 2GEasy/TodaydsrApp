import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, AppState } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import ReviewWrite from './ReviewWrite';
export default function Orders(props) {
  const navigation = useNavigation();    
  const route = useRoute();
  const [storeInf,setStoreInf] = useState({});
  const [file,setFile] = useState({});
  const [orderMenu,setOrderMenu] = useState([]);
  const [reviewChk,setReviewChk] = useState(null);
  

  useEffect(()=>{
    async function getStart() {
        if(props.su_id !== null){
            fetchStoreInfo(props.su_id);
            fetchStoreImg(props.su_id);
            fetchOrderMenu(props.ord_id);
            fetchReviewChk(props.ord_id,props.su_id,await AsyncStorage.getItem('cid'));
        }
    }
    getStart();
  },[])
  const fetchReviewChk=(ord_id,su_id,pu_id)=>{
    ApiService.fetchReviewChk(ord_id,su_id,pu_id)
    .then(res=>{
      setReviewChk(res.data);
    //   console.log("fetchReviewChk:",res.data);
    //   console.log("주문번호:" +ord_id,"리뷰유무:"+reviewChk);
    })
    .catch(err=>{
      console.log("fetchReviewChk ERR.",err);
    })
  }
  const fetchStoreInfo=(su_id)=>{
    ApiService.fetchStoreInfo(su_id)
    .then(res=>{
      setStoreInf(res.data);
    })
    .catch(err=>{
      console.log("fetchStoreInfo ERR.",err);
    })
  }
  const fetchStoreImg=(su_id)=>{
    ApiService.fetchStoreImgByID(su_id)
    .then(res=>{
        setFile(res.data);
    })
    .catch(err=>{
        console.log("fetchStoreImg ERR", err);
    })
  }
  const fetchOrderMenu=(ord_id)=>{
    ApiService.fetchOrderMenu(ord_id)
    .then(res=>{
        setOrderMenu(res.data);
    })
    .catch(err=>{
        console.log("fetchOrderMenu ERR", err);
    })
  }
  const attach =(orderMenu)=>{
        orderMenu.map((c,index)=>{
            if(index>0) {
                if(ordid==c.ord_id){
                    menu+=c.name+" "+c.amount+"개\n";
                    summary+=c.sum;
                }else{
                    ordid=c.ord_id;
                    menu=c.name+" "+c.amount+"개\n";
                    summary+=c.sum;
                }
            }else{
                ordid=c.ord_id;
                menu+=c.name+" "+c.amount+"개\n";
                summary+=c.sum;
            }
        })
        return (
                <View>
                <Text note>{menu}</Text>
                <Text note>{summary}원</Text>
                </View>
        );
    }
    let ordid=0;
    let menu='';
    let summary=0;
    const returnButton=(reviewChk)=>{
    //   console.log("returnButton.reviewChk:"+reviewChk);
      if(reviewChk) {
        return <Button style={{marginBottom:10,marginRight:10,color:'#535353'}} disabled><Text>작성 완료</Text></Button>;
      }else{
        return <ReviewWrite ord_id={props.ord_id} su_id={props.su_id} storeName={storeInf.storeName} menu={menu} setReviewChk={setReviewChk} />;
      }
    }
    return (
        <View>
          {file&&storeInf&&orderMenu&&reviewChk!==null&&(
            <Card>
                <CardItem button onPress={()=>navigation.navigate('Store',{"su_id":props.su_id,"storeName":storeInf.storeName})}>
                <Left>
                    {file?
                    <Thumbnail style={{width: 100, height: 100, borderRadius: 0}} source={{uri:"http://todaydsr.kro.kr:7979/upload/store/"+file.fileName}} />
                    :
                    <Thumbnail style={{width: 100, height: 100, borderRadius: 0}} source={{uri:"https://placeimg.com/64/64/2"}} />
                    }
                    <Body>
                    <Text note>{props.ordDate}</Text>
                    <Text>{storeInf.storeName}</Text>
                    {attach(orderMenu)}
                    <View>{returnButton(reviewChk)}</View>
                    </Body>
                </Left>
                </CardItem>
            </Card>
          )}
        </View>
    );
}