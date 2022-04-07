/**
 * @tmp文件，暂时不知道怎么归类
 */

import axios from 'axios';
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from './constant'

export const receiveUser = (user) => ({ type: RECEIVE_USER, user });

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
    //const result = await reqLogin(username, password);
    const result = await axios({
        method:'post',
        url:'http://82.157.100.28:8000/login',
        data:{
            username:username,
            password:password,
        }
    })
    //如果成功，分发成功的同步action
    if (result.status === 200) {
      const user = result.data;
      // memoryUtils.user = user;
      //storageUtils.saveUser(user);
      dispatch(receiveUser(user));
      //登陆成功
    } else {
      //如果失败，分发成功的同步action
      const msg = result.msg;
      dispatch(showErrorMsg(msg));
    }
  };