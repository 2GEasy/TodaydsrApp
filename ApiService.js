import axios from 'axios';

const NOTICE_API_BASE_URL = "https://todaydsr.kro.kr:8090/notice";

class ApiService {
    fetchNormalStoreList(normal) {
        return axios.get("https://todaydsr.kro.kr:8090/store/"+normal);
    }
    fetchHealthStoreList(health) {
        return axios.get("https://todaydsr.kro.kr:8090/store/"+health);
    }
    fetchLowsaltStoreList(lowsalt) {
        return axios.get("https://todaydsr.kro.kr:8090/store/"+lowsalt);
    }
    fetchPremiumStoreList(premium) {
        return axios.get("https://todaydsr.kro.kr:8090/store/"+premium);
    }
    
    fetchStoreByID(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/store/" + su_id);
    }
    fetchStoreList(category) {
        return axios.get("https://todaydsr.kro.kr:8090/store/category/" + category);
    }
    deleteUser(pu_id) {
        return axios.delete("https://todaydsr.kro.kr:8090/puser/"+pu_id);
    }
    insertUser(user) {
        return axios.post("https://todaydsr.kro.kr:8090/puser", user);
    }
    updateUser(user) {
        return axios.put("https://todaydsr.kro.kr:8090/puser/" + user.pu_id, user);
    }
    loginUser(pu_id,pw) {
        return axios.get("https://todaydsr.kro.kr:8090/puser/"+pu_id+"/"+pw)
    }
    
    fetchMenuList(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/menu/"+su_id);
    }
    fetchReviewList(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/review/saler/"+su_id);
    }
    fetchMenuImage(su_id,mn_id) {
        return axios.get("https://todaydsr.kro.kr:8090/menuImg/"+su_id+"/"+mn_id);
    }
    fetchHygiene(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/hygiene/"+su_id);
    }
    fetchStoreInfo(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/store/"+su_id);
    }
    fetchHygieneImg(su_id,hgn_id) {
        return axios.get("https://todaydsr.kro.kr:8090/hygieneImg/"+su_id+"/"+hgn_id);
    }
    fetchCustomerByID(pu_id) {
        return axios.get("https://todaydsr.kro.kr:8090/puser/"+pu_id);
    }

    insertOrder(order) {
        return axios.post("https://todaydsr.kro.kr:8090/order", order);
    }
    insertOrderMenu(orderMenu,pu_id) {
        return axios.post("https://todaydsr.kro.kr:8090/orderMenu/"+pu_id, orderMenu);
    }

    fetchOrderByID(pu_id) {
        return axios.get("https://todaydsr.kro.kr:8090/order/customer/"+pu_id);
    }
    fetchOrderMenu(ord_id) {
        return axios.get("https://todaydsr.kro.kr:8090/orderMenu/"+ord_id);
    }
    fetchStoreImgByID(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/storeImg/"+su_id)
    }
    
    insertReview(review) {
        return axios.post("https://todaydsr.kro.kr:8090/review",review);
    }
    insertReviewImg(file,pu_id,su_id,ord_id) {
        return axios.post("https://todaydsr.kro.kr:8090/reviewImg/"+su_id+"/"+pu_id+"/"+ord_id, file,{
            'Content-Type': 'multipart/form-data'
          });
    }
    fetchReviewChk(ord_id,su_id,pu_id) {
        return axios.get("https://todaydsr.kro.kr:8090/review/customer/"+su_id+"/"+pu_id+"/"+ord_id);
    }
    fetchReviewImg(rvw_id) {
        return axios.get("https://todaydsr.kro.kr:8090/reviewImg/"+rvw_id);
    }
    fetchComment(rvw_id) {
        return axios.get("https://todaydsr.kro.kr:8090/comment/"+rvw_id);
    }

    insertCart(CartItem) {
        return axios.post("https://todaydsr.kro.kr:8090/api/cart", CartItem);
    }
    updateCartItem(updateItem) {
        return axios.put("https://todaydsr.kro.kr:8090/api/cart",updateItem);
    }
    fetchCartList(pu_id,su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/api/cart/"+pu_id+"/"+su_id);
    }
    deleteItem(pu_id,su_id,mn_id) {
        return axios.delete("https://todaydsr.kro.kr:8090/api/cart/"+pu_id+"/"+su_id+"/"+mn_id);
    }
    fetchMenu(su_id,mn_id) {
        return axios.get("https://todaydsr.kro.kr:8090/menu/"+su_id+"/"+mn_id);
    }
    chkFavorite(su_id,pu_id) {
        return axios.get("https://todaydsr.kro.kr:8090/favorite/"+su_id+"/"+pu_id);
    }
    addFavorite(su_id,pu_id) {
        return axios.post("https://todaydsr.kro.kr:8090/favorite/"+su_id+"/"+pu_id);
    }
    cancelFavorite(su_id,pu_id) {
        return axios.delete("https://todaydsr.kro.kr:8090/favorite/"+su_id+"/"+pu_id);
    }
    fetchFavorite(pu_id) {
        return axios.get("https://todaydsr.kro.kr:8090/favorite/"+pu_id);
    }
    insertToken(tempToken) {
        return axios.post("https://todaydsr.kro.kr:8090/token",tempToken);
    }
    sendNotification(tempNotification) {
        return axios.post("https://todaydsr.kro.kr:8090/notification/token",tempNotification);
    }

    fetchScore(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/store/score/"+su_id);
    }
    fetchDeliverDate(su_id) {
        return axios.get("https://todaydsr.kro.kr:8090/store/deliver/"+su_id);
    }
}
export default new ApiService();