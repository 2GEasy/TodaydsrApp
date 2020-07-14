import React,{useState,useEffect} from 'react';
import {View,Image, AsyncStorage} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


export default function Home({navigation}) {
    useEffect(()=>{
        async function getStart() {
            if(!(await AsyncStorage.getItem('cid'))) {
                alert('로그인을 해주세요!');
                navigation.navigate('Login');
            }
        }
        getStart();
    },[])
    return (
        <>
        <View style={{flex:1,flexDirection:'row',margin:10,height:'50%'}}>
            <View style={{flex:1,alignItems:'center',flexDirection:'row',height:'100%'}}>
                <View style={{flex:1,height:'100%',justifyContent:'flex-end'}}>
                    <Card>
                        {/* <CardItem>
                            <Thumbnail source={require('../assets/image/zoodasa1.png')} />
                            
                        </CardItem> */}
                        <CardItem cardBody button onPress={()=>navigation.navigate('category',{"category":"normal"})}>
                            <Image source={require('../assets/image/normaldsr.jpg')} style={{width:"100%",height:150}}/>
                        </CardItem>
                        <CardItem button onPress={()=>navigation.navigate('category',{"category":"normal"})}>
                            <Body>
                                <Text>일반도시락</Text>
                                <Text note>맛있는 일반식</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                <View style={{flex:1,height:'100%',justifyContent:'flex-end'}}>
                    <Card>
                        {/* <CardItem>
                            <Thumbnail source={require('../assets/image/zoodasa1.png')} />
                            
                        </CardItem> */}
                        <CardItem cardBody button onPress={()=>navigation.navigate('category',{"category":"health"})}>
                            <Image source={require('../assets/image/healthdsr.jpg')} style={{width:"100%",height:150}}/>
                        </CardItem>
                        <CardItem button onPress={()=>navigation.navigate('category',{"category":"health"})}>
                            <Body>
                                <Text>건강도시락</Text>
                                <Text note>관리를 위한 건강식</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </View>
        </View>
        <View style={{flex:1,flexDirection:'row',margin:10,height:'50%'}}>
            <View style={{flex:1,alignItems:'center',flexDirection:'row',height:'100%'}}>
                <View style={{flex:1,alignItems:'center',height:'100%',justifyContent:'flex-start'}}>
                    <Card style={{height:'97%'}}>
                        {/* <CardItem>
                            <Thumbnail source={require('../assets/image/zoodasa1.png')} />
                            
                        </CardItem> */}
                        <CardItem cardBody button onPress={()=>navigation.navigate('category',{"category":"lowsalt"})}>
                            <Image source={require('../assets/image/dndsr.gif')} style={{width:"100%",height:150}}/>
                        </CardItem>
                        <CardItem button onPress={()=>navigation.navigate('category',{"category":"lowsalt"})}>
                            <Body>
                                <Text>특별식도시락</Text>
                                <Text note>당뇨 식단, 저염식 도시락</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                <View style={{flex:1,alignItems:'center',height:'100%',justifyContent:'flex-start'}}>
                    <Card>
                        {/* <CardItem>
                            <Thumbnail source={require('../assets/image/zoodasa1.png')} />
                            
                        </CardItem> */}
                        <CardItem cardBody button onPress={()=>navigation.navigate('category',{"category":"premium"})}>
                            <Image source={require('../assets/image/premiumdsr.jpg')} style={{width:"100%",height:150}}/>
                        </CardItem>
                        <CardItem button onPress={()=>navigation.navigate('category',{"category":"premium"})}>
                            <Body>
                                <Text>프리미엄도시락</Text>
                                <Text note>특별한 날과 특별한 나를 위한 프리미엄 도시락</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </View>
        </View>
        </>
    );
}