import {combineReducers} from 'redux'
import CardReducer from './CardStore/CardReducer'

export default combineReducers({
    card: CardReducer
})