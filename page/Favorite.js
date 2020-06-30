import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, AppState } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Textarea } from 'native-base';
import { Modal, Portal, Provider } from 'react-native-paper';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import FavoriteStore from '../components/FavoriteStore';
export default function Orders(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [favorites,setFavorites] = useState([]);

    useEffect(()=>{
        async function getStart() {
            fetchFavorite(await AsyncStorage.getItem('cid'));
        }
        getStart();
      },[]);
      const fetchFavorite=(pu_id)=>{
        
        ApiService.fetchFavorite(pu_id)
        .then(res=>{
            setFavorites(res.data);
        })
        .catch(err=>{
            console.log("fetchFavorite ERR",err);
        })
      }
      
      //props.match.params.cate
      const returnFavoriteList=(data)=>{
        return data.map((c,index)=>{
          return <FavoriteStore key={index} su_id={c.su_id} storeImgChk={c.storeImgChk} storeName={c.storeName} storeExplain={c.storeExplain} deliverPosible={c.deliverPosible} abledeliverS={c.abledeliverS} abledeliverE={c.abledeliverE} distance={c.distance} count={c.count} favorite={c.favorite}/>;
        })
      };   
    return (
        <View>
            {favorites?returnFavoriteList(favorites):null}
        </View>
    );
}