/* 用来根据老的state和指定的action生成并返回新的state函数 */

import storageUtils from "../utils/storageUtils"
// import {combineReducers} from 'redux'
import {combineReducers} from 'redux'
import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './constant'
/* 用来管理头部标题的reducer函数 */
const initTitle='首页'
function headTitle(state=initTitle,action){

    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

/* 管理用户名的reducer */
const initUser=storageUtils.getUser()
function userData(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
            //console.log("验证")
            return action.userData
        case SHOW_ERROR_MSG:
            console.log("SHOW_ERROR_MSG")
            const errorMsg = action
            return {...state,errorMsg} //不要直接修改原本的状态数据
        case RESET_USER:
            return {}
        default:
            return state
    }
}

/* 
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构 
{
    headTitle: '首页',
    user:{}
}*/

export default combineReducers({
    headTitle,
    userData
})