/* redux最核心的管理对象store */
import {applyMiddleware} from 'redux'
import {createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

//向外默认暴露store
const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
export default store