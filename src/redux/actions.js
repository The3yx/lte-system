/**
 * @tmp文件，暂时不知道怎么归类
 */
import storageUtils from '../utils/storageUtils';

import axios from 'axios';
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from './constant'

export const receiveUser = (userData) => ({ type: RECEIVE_USER, userData });

export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });


/* 退出登陆的同步action */

export const logout = () => {
  storageUtils.deleteUser();
  return { type: RESET_USER };
};



/*  
登陆的异步 action
*/
export const login = (username, password) => async (dispatch) => {
  //执行异步请求
  axios.post(
    '/login',
    {
      username: username,
      password: password,
    }
  )
  .then(
    (res) =>{
      const userData = res.data
      storageUtils.saveUser(userData);
      dispatch(receiveUser(userData));
    },
    (err)=>{
      console.log("err",err)
      dispatch(showErrorMsg(err));
      alert("用户名或密码错误!")
    }
  )
  .catch(
    (err)=>{
      console.log(err)
    }
  )
};
