import React,{useState,useEffect} from 'react';
import {View,Text, AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './page/Profile';
import { Button } from 'native-base';
import Params from './exam/ComponentParams';
import Login from './page/Login';
import OrderHistory from './page/OrderHistory';
import Favorite from './page/Favorite';
import MyPage from './page/MyPage';
import Signup from './page/Signup';
import AppbarAddr from './components/AppbarAddr';
import Home from './page/Home';
import CategoryStores from './page/CategoryStores';
import StoreView from './page/StoreView';
import Menu from './page/Menu';
import Order from './page/Order';
import Cart from './page/Cart';
import Filtering from './components/Filterling';
function Setting({navigation}) {
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text>Setting</Text>
            <Button style={{margin: 10,padding:10}}warning onPress={()=>navigation.navigate('Profile')}><Text style={{color:'white'}}>프로필로</Text></Button>
        </View>
    );
}
function HomeTabs({navigation}) {
    return (
        <Tab.Navigator tabBarOptions={{tabStyle:{backgroundColor:'#FF9800'},labelStyle:{color:'#FFFFFF'}}}>
            <Tab.Screen name="홈" component={Home} 
            options={{
                tabBarLabel: '홈',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="home" color="#FFFFFF" size={26} />
                ),
                
              }}/>
            <Tab.Screen name="OrderHistory" component={OrderHistory} 
            options={{
                tabBarLabel: '주문내역',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="receipt" color="#FFFFFF" size={26} />
                ),
              }}/>
            <Tab.Screen name="Favorite" component={Favorite} 
            options={{
                tabBarLabel: '즐겨찾기',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cards-heart" color="#FFFFFF" size={26} />
                ),
              }}/>
            <Tab.Screen name="MyPage" component={MyPage} 
            options={{
                tabBarLabel: '마이페이지',
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account" color="#FFFFFF" size={26} />
                ),
                
              }}/>
        </Tab.Navigator>
    );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function NavigationController() {
    const [home,setHome] = useState('주소를 지정해주세요.');
    const [sess,setSess] = useState(null);
    useEffect(()=>{
      async function getStart() {
        const chkLogin = await AsyncStorage.getItem('cid');
        if(chkLogin) {
          setSess(chkLogin);
        }else{
          navigation.navigate('Login');
        }
      }
      getStart();
      messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.url);
      });
    },[])
    
    return(
        <>
            <NavigationContainer>
                <Stack.Navigator mode="modal">
                  
                    <Stack.Screen name="Home" component={HomeTabs} options={{
                      // title:"오늘도시락",
                      // headerTitleAlign:"center",
                      headerStyle:{backgroundColor:'orange'},
                      // headerTitleStyle:{color:'#ffffff'},
                      headerTitle: () => <AppbarAddr />,
                      
                    }}/>
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="category" component={CategoryStores} options={{title:"스토어 목록"}}/>
                    <Stack.Screen name="Store" component={StoreView} options={{title:'',headerTitleAlign:"center"}}/>
                    <Stack.Screen name="Menu" component={Menu} options={{title:'메뉴',headerTitleAlign:"center",headerBackTitleStyle:{color:'black'}}}/>
                    <Stack.Screen name="Order" component={Order} options={{title:'주문',headerTitleAlign:"center",headerBackTitleStyle:{color:'black'}}}/>
                    <Stack.Screen name="Cart" component={Cart} options={{title:'장바구니',headerTitleAlign:"center",headerBackTitleStyle:{color:'black'}}}/>
                    
                    <Stack.Screen name="Login" component={Login} options={{title:"로그인"}} />
                    <Stack.Screen name="Signup" component={Signup} options={{title:"회원가입"}}/>
                    
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}