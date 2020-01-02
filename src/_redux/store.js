import { createStore, combineReducers, applyMiddleware } from 'redux';
import { middlewares } from './middleware';
import categories from '../_reducers/categories';
import events from '../_reducers/events';
import eventsToday from '../_reducers/eventsToday';
import eventsTomorrow from '../_reducers/eventsTomorrow';
import login from '../_reducers/login';
import eventDetail from '../_reducers/detailEvent';
import eventCategory from '../_reducers/eventCategory';
import ordersPending from '../_reducers/ordersPending';
import ordersApproved from '../_reducers/ordersApproved';
import profile from '../_reducers/profile';

//import middleware
// import { logger } from './middleware';

// setup combine reducers, for multiple reducer
// ex = reducers articles, categories, comments
const reducers = combineReducers({
    categories,
    events,
    eventsToday,
    eventsTomorrow,
    eventDetail,
    eventCategory,
    ordersPending,
    ordersApproved,
    profile,
    login
})

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store