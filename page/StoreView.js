import React,{useState,useEffect, useLayoutEffect} from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Text, Content,Card, CardItem, Tab, Tabs } from 'native-base';
import { View,ScrollView, Dimensions, AsyncStorage } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApiService from '../ApiService';
import Menu from '../components/Menus';
import MenuList from './MenuList';
import StoreInfos from './StoreInfos';
import ReviewList from '../page/ReviewList';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { FAB } from 'react-native-paper';

export default function StoreView(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const [value, setValue] = useState('1');
    const [favorite,setFavorite] = useState(false);
    const [score,setScore] = useState('5');
    const Tab = createMaterialTopTabNavigator();
    
    useEffect(()=>{
        async function getStart() {
            chkFavorite(route.params.su_id,await AsyncStorage.getItem('cid'));
            fetchScore(route.params.su_id);
        }
        getStart();
    },[])
    useLayoutEffect(()=>{
       navigation.setOptions({title:route.params.storeName});
    },[])
    const chkFavorite=(su_id,pu_id)=>{
        ApiService.chkFavorite(su_id,pu_id)
        .then(res=>{
          setFavorite(res.data);
          console.log("chkFavorite",res.data);
      })
      .catch(err=>{
          console.log("chkFavorite ERR", err);
      })
      }
    const fetchScore=(su_id)=>{
      ApiService.fetchScore(su_id)
      .then(res=>{
        setScore(res.data);
      })
      .catch(err=>console.log(err)
      )
    }
      const addFavorite=async()=>{
        ApiService.addFavorite(route.params.su_id,await AsyncStorage.getItem('cid'))
        .then(res=>{
          console.log("addFavorite Success");
          setFavorite(!favorite);
        })
        .catch(err=>{
          console.log("addFavorite ERR.",err);
        })
      }
      const cancelFavorite=async()=>{
        ApiService.cancelFavorite(route.params.su_id,await AsyncStorage.getItem('cid'))
        .then(res=>{
          console.log("cancelFavorite Success");
          setFavorite(!favorite);
        })
        .catch(err=>{
          console.log("cancelFavorite ERR.",err);
        })
      }

    return (
        <View style={{marginBottom:0,paddingBottom:0}}>
         <ScrollView>
            {/* <Header style={{backgroundColor:'#ff9800',marginLeft:20,marginRight:20}}>
                <Body style={{alignItems:'center'}}>
                    <Title>{route.params.storeName}</Title>
                </Body>
            </Header> */}
            <View style={{width:300,alignSelf:'center',borderRadius:0,shadowRadius:0}}>
                <Card style={{borderRadius:0,shadowRadius:0,width:300}}>
                    <CardItem>
                        <Body>
                            <Text style={{alignSelf:'center',fontSize:20}}>
                                {route.params.storeName}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                    <Body style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                        {/* <MaterialCommunityIcons name="star" color="#FD0" size={30} /> */}
                        <AirbnbRating
                          count={5}
                          defaultRating={score}
                          size={20}
                          showRating={false}
                          isDisabled={true}
                        />
                    </Body>
                    </CardItem>
                    <CardItem>
                        <Body style={{flex:1,flexDirection:'row',justifyContent:'center',width:300}}>
                            <Button style={{backgroundColor:'orange',width:100,height:60,justifyContent:'center',borderRadius:0}}>
                                <MaterialCommunityIcons name="phone" color="#FFFFFF" size={30} />
                            </Button>
                            {favorite?
                            <Button style={{backgroundColor:'orange',width:100,height:60,justifyContent:'center',borderRadius:0}} onPress={()=>cancelFavorite()}>
                                <MaterialCommunityIcons name="heart" color="#FFFFFF" size={30} />
                            </Button>
                            :
                            <Button style={{backgroundColor:'orange',width:100,height:60,justifyContent:'center',borderRadius:0}} onPress={()=>addFavorite()}>
                                <MaterialCommunityIcons name="heart-outline" color="#FFFFFF" size={30} />
                            </Button>
                            }
                            <Button style={{backgroundColor:'orange',width:100,height:60,justifyContent:'center',borderRadius:0}}>
                                <MaterialCommunityIcons name="share" color="#FFFFFF" size={30} />
                            </Button>
                            
                        </Body>
                    </CardItem>
                </Card>
                        <View>
                            <Tab.Navigator tabBarOptions={{indicatorStyle:{backgroundColor:'#ff9800'},labelStyle:{color:'black'}}}>
                                <Tab.Screen name="메뉴" component={MenuList} initialParams={{"su_id":route.params.su_id}} />
                                <Tab.Screen name="정보" component={StoreInfos} initialParams={{"su_id":route.params.su_id}} />
                                <Tab.Screen name="리뷰" component={ReviewList} initialParams={{"su_id":route.params.su_id}} />
                            </Tab.Navigator>
                        </View>
            </View>
        </ScrollView>
        <FAB
              style={{position:'absolute',margin:16,right:0,bottom:0,backgroundColor:'#ff9800'}}
              medium
              icon="cart"
              onPress={() => navigation.navigate("Cart",{su_id:route.params.su_id})}
        />
        </View>
    );
}