import React,{useState,useEffect, useLayoutEffect} from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';
import Review from '../components/Review';
import { View } from 'react-native';
import ApiService from '../ApiService';

export default function ReviewList(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const [reviews,setReviews] = useState([]);

    useEffect(()=>{
        fetchReviewList(route.params.su_id);
    },[])
    const fetchReviewList=(su_id)=>{
        ApiService.fetchReviewList(su_id)
        .then(res=>{
          setReviews(res.data);
          // console.log("fetchReviewList.",res.data);
        })
        .catch(err=>{
          console.log("fetchReviewList ERR.",err);
        })
    }
    const returnReviewList=(data)=>{
        return data.map((c,index)=>{
            console.log("reviewRegDate:",c.regDate);
          return <Review key={index} su_id={c.su_id} rvw_id={c.rvw_id} ord_id={c.ord_id} content={c.content} score={c.score} fileChk={c.fileChk} regDate={c.regDate} />;
        })
    }
    return (
        <View>
            {reviews?returnReviewList(reviews):null}
        </View>
    );
}