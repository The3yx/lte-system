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
/*
export const logout = () => {
  storageUtils.deleteUser();
  return { type: RESET_USER };
};
*/


/*  
登陆的异步 action
*/
export const login = (username, password) => async (dispatch) => {
  //执行异步请求
  const result = await axios.post(
    '/login',
    {
      username: username,
      password: password,
    }
  )
  //如果成功，分发成功的同步action
  console.log(result.status)
  if (result.status === 200) {
    const userData = result.data;
    // memoryUtils.user = user;
    storageUtils.saveUser(userData);
    dispatch(receiveUser(userData));
    //登陆成功
  } else {
    //如果失败，分发成功的同步action
    const msg = result.msg;
    dispatch(showErrorMsg(msg));
  }
};

//注册的异步action
export const register = (username, password) =>async (dispatch) => {
  
}