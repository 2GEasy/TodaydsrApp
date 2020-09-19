import React,{useState,useEffect} from 'react';
import { Image,View, AsyncStorage, AppState } from 'react-native';
import { Card, CardItem,Body,Button,Text,Item,Label,Input, Right} from 'native-base';
import ApiService from '../ApiService';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Divider} from 'react-native-paper';
import ChkItem from '../components/ChkItem';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ResultForm from './ResultForm';

const steps = ['배달 정보 작성', '결제 작성', '주문 확인'];
export default function Order(props) {
    const navigation = useNavigation();    
    const route = useRoute();
    const [orderInfo,setOrderInfo] = useState([]);
    const [deliverInfo,setDeliverInfo] = useState({}); 

    const [paymentInfo,setPaymentInfo] = useState({});
    const [total,setTotal] = useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    
    useEffect(()=>{
        async function getStart() {
            fetchCartList(await AsyncStorage.getItem('cid'),route.params.su_id);
        }
        getStart();
    },[])

    const fetchCartList=(pu_id,su_id)=>{
        ApiService.fetchCartList(pu_id,su_id)
        .then(res=>{
          setOrderInfo(res.data);
        })
        .catch(err=>{
          console.log("fetchCartList ERR",err);
        })
    }
    const handleNext = async() => {
        if(activeStep === steps.length - 1) {
            let order = {
                su_id: route.params.su_id,
                pu_id: await AsyncStorage.getItem('cid'),
                name: deliverInfo.name,
                addr1: deliverInfo.addr1,
                addr2: deliverInfo.addr2,
                phone: deliverInfo.phone,
                dreqstart: deliverInfo.dreqstart,
                dreqend: deliverInfo.dreqend,
                ordDate: new Date()
            }
            insertOrder(order);
            orderInfo.map(async(c)=>{
                let orderMenu = {
                su_id: c.su_id,
                mn_id: c.mn_id,
                amount: c.amount
                }
                insertOrderMenu(orderMenu,await AsyncStorage.getItem('cid'));
            })
            let notification = {
                user_id: route.params.su_id,
                user_type : 's',
                title: "주문 확인",
                message: await AsyncStorage.getItem('cid')+"님의 주문이 확인되었습니다.",
                url: "https://todaydsr.kro.kr/order"
            }
            sendNotification(notification);
            setActiveStep(activeStep + 1);
            }else{
            setActiveStep(activeStep + 1);
            }
        };
        const insertOrder=(order)=>{
            ApiService.insertOrder(order)
            .then(res=>{
            console.log("inserOrder",res);
            })
            .catch(err=>{
            console.log("insertOrder ERR",err);
            })
        }
        const insertOrderMenu=(orderMenu,pu_id)=>{
            ApiService.insertOrderMenu(orderMenu,pu_id)
            .then(res=>{
            console.log("insertOrderMenu",res);
            })
            .catch(err=>{
            console.log("insertOrderMenu ERR",err);
            })
        }
        const sendNotification=(noti)=>{
            ApiService.sendNotification(noti)
            .then(res=>{
              console.log(res);
            })
            .catch(err=>console.log(err))
        }
        const handleBack = () => {
            setActiveStep(activeStep - 1);
        };
        function getStepContent(step) {
            switch (step) {
              case 0:
                return <AddressForm setDeliver={setDeliverInfo} deliver={deliverInfo} su_id={route.params.su_id}/>;
              case 1:
                return <PaymentForm setPayment={setPaymentInfo} payment={paymentInfo} />;
              case 2:
                return <ResultForm order={orderInfo} deliverSet={deliverInfo} paymentSet={paymentInfo} />;
              default:
                throw new Error('알 수 없는 단계입니다.');
            }
        }
    return (
        <View>
            <View style={{padding:20,backgroundColor:'#ffffff'}}>
                {/* Stepper */}
                <>
                {activeStep === steps.length ? (
                <>
                    <Text>
                    주문해주셔서 감사합니다.
                    </Text>
                        {/* {props.name}/{props.price} * {props.amount}개 */}
                    {orderInfo.map((c)=>{
                    return <ChkItem su_id={c.su_id} mn_id={c.mn_id} amount={c.amount} setTotal={setTotal} total={total} />;
                    })}
                    <Text>
                        합계: {total}원
                    </Text>
                    
                    <Button onPress={()=>navigation.navigate('OrderHistory')} style={{backgroundColor:'#FF9800',justifyContent:'center'}}><Text>확인</Text></Button>
                    
                </>
                ) : (
                <>
                    {getStepContent(activeStep)}
                    <View style={{flexDirection:'row'}}>
                    {activeStep !== 0 && (
                        <Button transparent onPress={handleBack} style={{justifyContent:'center',margin:10}}><Text style={{color:'black'}}>뒤로</Text></Button>
                    )}
                    <Button
                        onPress={handleNext}
                        style={{backgroundColor:'#FF9800',justifyContent:'center',margin:10}}
                    >
                        {activeStep === steps.length - 1 ? <Text>주문</Text> : <Text>다음</Text>}
                    </Button>
                    </View>
                    
                </>
                )}
                </>
            </View>
        </View>
    );
}