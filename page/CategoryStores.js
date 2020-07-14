import React,{useState,useEffect,useLayoutEffect} from 'react';
import ApiService from '../ApiService';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import DaumMap from 'react-native-daummap';
import Store from '../components/Store';
import { ScrollView,Text } from 'react-native';
import Filtering from '../components/Filterling';

export default function CategoryStores({navigation,route}) {
    const [tempStores,setTempStores] = useState([]);
    const [tempStore,setTempStore] = useState({});
    const [stores,setStores] = useState([]);
    const [dist,setDist] = useState(1001);
    
    // ,headerRight:()=><Filtering/>
    useLayoutEffect(()=>{
        navigation.setOptions({headerRight:()=><Filtering setDist={setDist} refresh={refresh}/>});
     },[])
    useEffect(()=>{
        tempStores.map(async (c)=>{
            const distance = await addr2geo(c.storeAddr1);
            console.log("distance:"+distance);
            if(distance<dist) {
                c.distance=distance;
                setTempStore(c);
                
                // console.log("true:",c);
            }
        });
        // setStores(stores.concat(arr));
    },[tempStores])
    useEffect(()=>{
        console.log("update stores:",stores);
    },[stores])
    useEffect(()=>{
        if(!(Object.keys(tempStore).length===0)) {
            setStores(stores.concat(tempStore));
        }
    },[tempStore])
    useEffect(()=>{
        if(dist!==1001){
            const {category} = route.params;
            console.log(category);
            
            fetchStores(category);

        }
    },[dist])
    const fetchStores=async(cate)=>{
        const a = await ApiService.fetchStoreList(cate);

        console.log("a:",a.data);
        console.log("category:",cate);
        console.log("fetchStoreList",stores);
        setTempStores(a.data);
        
        console.log("fetchStoreList Under",stores);
    }
    useEffect(()=>{
        const {category} = route.params;
        console.log(category);
        
        fetchStores(category);
    },[])
    // const getDistance=async(addr)=>{
    //     return await addr2geo(addr);
    // }
    const refresh=()=>{
        setTempStores([]);
        setTempStore({});
        setStores([]);
        // setDist(1001);
    }
    const addr2geo=async(addr)=>{
        DaumMap.setRestApiKey("8e5143da909b41be58a6a22ae9436b9b");
        const result = await DaumMap.serachAddress(addr);

        // console.log(result.documents[0].x,result.documents[0].y);
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
   
        // setTempStores([]);
        // setTempStore({});
        // setStores([]);
        // setDist(1001);
    }
    const returnNone=()=>{
        return <Text>일치하는 스토어가 없습니다!</Text>
    }
    return (
        <>
            <ScrollView>
                {stores.length>0?returnStore(stores):returnNone()}
                
            </ScrollView>
        </>
    );
}