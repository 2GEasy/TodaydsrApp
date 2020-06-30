import React,{useState,useEffect, useLayoutEffect} from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';
import ApiService from '../ApiService';
import Menus from '../components/Menus';
import { View } from 'react-native';

export default function MenuList(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const [menus,setMenus] = useState([]);

    useEffect(()=>{
        fetchMenuList(route.params.su_id);
        // chkFavorite(props.match.params.su_id,window.sessionStorage.getItem('cid'));
    },[])
    const fetchMenuList=(su_id)=>{
        ApiService.fetchMenuList(su_id)
        .then(res=>{
          setMenus(res.data);
          // console.log("fetchMenuList.",res.data);
        })
        .catch(err=>{
          console.log("fetchMenuList ERR.",err);
        })
    }
    const returnMenuList=(data)=>{
        return data.map((c,index)=>{
          return (<Menus key={index} su_id={c.su_id} mn_id={c.mn_id} name={c.name} produce={c.produce} price={c.price} fileChk={c.fileChk} />);
        })
    }
    return (
        <>
            <View style={{backgroundColor:'white'}}>
            {returnMenuList(menus)}
            </View>
        </>
    );
}