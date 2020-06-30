import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import DaumMap from 'react-native-daummap';
import Store from '../components/Store';
import { ScrollView,Text } from 'react-native';

export default function CategoryStores({navigation,route}) {
    const [stores,setStores] = useState([]);
    useEffect(()=>{
        const {category} = route.params;
        console.log(category);
        
        fetchStoreList(category);
    },[])
    useEffect(()=>{
        console.log("stores update",stores);
    },[stores])
    const fetchStoreList=(cate)=>{
        console.log("category:",cate);
        console.log("fetchStoreList",stores);
        ApiService.fetchStoreList(cate)
        .then(async res=>{
            console.log("resdata:",res.data);
            var tempStores = await res.data;
            console.log("temp",temp);
            tempStores.map(async (c)=>{
              const distance = await addr2geo(c.storeAddr1);
              console.log("distance:"+distance);
              if(distance<1000) {
                  c.distance=distance;
                  console.log("under if:",stores);
                  setStores(...stores,stores.concat(c));
                console.log("true:",c);
              }
            });
            console.log("stores:",stores);
            
          })
        .catch(err=>{
            console.log("fetchStores ERR",err);
        })
        console.log("fetchStoreList Under",stores);
    }
    // const getDistance=async(addr)=>{
    //     return await addr2geo(addr);
    // }
    const addr2geo=async(addr)=>{
        DaumMap.setRestApiKey("8e5143da909b41be58a6a22ae9436b9b");
        const result = await DaumMap.serachAddress(addr);

        console.log(result.documents[0].x,result.documents[0].y);
        const temp = await fetchDistance(result.documents[0].x, result.documents[0].y);
        const distemp = temp.data.features[0].properties.totalDistance;
        // console.log("distemp:",distemp);
        return distemp;
    }
    const fetchDistance=async (sx,sy)=>{
    const geox = await AsyncStorage.getItem('cgeox');
    const geoy = await AsyncStorage.getItem('cgeoy');
    // console.log("customerGeo:",geox,geoy);
    // console.log("storegeo:",sx,sy)
    let data = {
      "appKey": "l7xx56452204358449a5b2870d785ce145da",
      "startX": sx,
      "startY": sy,
      "endX": geox,
      "endY": geoy,
      "reqCoordType": "WGS84GEO",
      "resCoordType": "EPSG3857",
      "startName": "출발지",
      "endName": "도착지"
    };
    const config = {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      }
   }
   function objectToQuerystring(obj) {
      return Object.keys(obj).reduce(function (str, key, i) {
         var delimiter, val;
         delimiter = (i === 0) ? '' : '&';
         key = encodeURIComponent(key);
         val = encodeURIComponent(obj[key]);
         return [str, delimiter, key, '=', val].join('');
      }, '');
   }
  

   const res = await axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",

   objectToQuerystring(data), config);
  
   return res;
  };
    const returnStore=(data)=>{
        return data.map((c,index)=>{
            return <Store key={index} su_id={c.su_id} storeImgChk={c.storeImgChk} storeName={c.storeName} storeExplain={c.storeExplain} deliverPosible={c.deliverPosible} abledeliverS={c.abledeliverS} abledeliverE={c.abledeliverE} distance={c.distance} count={c.count} favorite={c.favorite} />;
        }) 
    }
    const returnNone=()=>{
        return <Text>일치하는 스토어가 없습니다!</Text>
    }
    return (
        <>
            <ScrollView>
                {stores?returnStore(stores):returnNone()}
                
            </ScrollView>
        </>
    );
}