import React,{useState,useEffect, useLayoutEffect} from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { List } from 'react-native-paper';
import ApiService from '../ApiService';
import { View, AsyncStorage } from 'react-native';
import ReviewImgs from './ReviewImgs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Review(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const [expanded, setExpanded] = useState(false);
    const [orderMenu, setOrderMenu] = useState([]);
    // const [reviewImgs,setReviewImgs] = useState([]);
    const [comment,setComment] = useState({});
    const [cid,setCid] = useState('');
    const [regDt,setRegDt] = useState('');
    useEffect(()=>{
        getSessionID();
        const tempReg = props.regDate;
        setRegDt(tempReg.substring(0,10))
        fetchOrderMenu(props.ord_id);
        // fetchReviewImg(props.rvw_id);
        fetchComment(props.rvw_id);
    },[])
    const getSessionID=async()=>{
        // console.log('cid:',await AsyncStorage.getItem('cid'));
        setCid(await AsyncStorage.getItem('cid'));
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const fetchReviewImg=(rvw_id)=>{
    //     ApiService.fetchReviewImg(rvw_id)
    //     .then(res=>{
    //         setReviewImgs(res.data);
    //     })
    //     .catch(err=>{
    //         console.log("fetchReviewImg ERR", err);
    //     })
    // }
    const fetchOrderMenu=(ord_id)=>{
        ApiService.fetchOrderMenu(ord_id)
        .then(res=>{
            setOrderMenu(res.data);
            // console.log(res.data);
        })
        .catch(err=>{
            console.log("fetchOrderMenu ERR", err);
        })
    }
    const fetchComment=(rvw_id)=>{
        // console.log("fetchComment:",rvw_id);
        ApiService.fetchComment(rvw_id)
        .then(res=>{
        setComment(res.data);
        })
        .catch(err=>{
            console.log("fetchComment ERR", err);
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
                <Text>{(cid+"님")}</Text>
                <Text note>{menu}</Text>
                
                </View>
        );
    }
    const returnReviewImgs=()=>{
        // let path = [];
        // reviewImgs.map((c,index)=>{
        //   path.push(c.path+c.fileName);
        // })
        return <ReviewImgs rvw_id={props.rvw_id}/>;
    }
    let ordid=0;
    let menu='';
    let summary=0;
    return (
        <View>
            <Card>
                <CardItem>
                    {orderMenu?attach(orderMenu):null}
                </CardItem>
                {props.fileChk?
                <CardItem>
                    {returnReviewImgs()}
                </CardItem>
                :
                <></>
                }
            {/* <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem> */}
            <CardItem>
              <Body>
                    <Text>{props.content}</Text>
                    <AirbnbRating
                          count={5}
                          defaultRating={props.score}
                          size={20}
                          showRating={false}
                          isDisabled={true}
                    />
                    <Text>
                        {props.regDate.substring(0,10)}
                    </Text>
              </Body>
            </CardItem>
            {comment?
                <List.Accordion
                    title="댓글 보기"
                    expanded={expanded}
                    onPress={()=>handleExpandClick()}
                    titleStyle={{color:'black'}}
                    
                    >
                        <Text note style={{margin:10}}>사장님 댓글</Text>
                        <Text style={{margin:10}}>{comment.content}</Text>
                </List.Accordion>
            :
                <></>
            }
            {/* comment list */}
          </Card>
        </View>
    );
}