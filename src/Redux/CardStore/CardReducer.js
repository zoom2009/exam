import CardInitState from './CardInitState'
import {addList, removeList, setAllList} from './CardType'

export default (state = CardInitState, action) => {
    switch(action.type) {
        case addList :
            let newList = []
            state.listAll.map((e, i) => {
                if(i!==action.payload) newList.push(e)
            })
            state = {
                ...state,
                listAll: newList,
                curList: [...state.curList, state.listAll[action.payload]]
            }
            // console.log('state new : ', state)
            break
        case removeList :
            let newList2 = [...state.listAll, state.curList[action.payload]]
            let newCurList = []
            state.curList.map((e, i) => {
                if(i!==action.payload) newCurList.push(e)
            })
            state = {
                ...state,
                listAll: newList2,
                curList: newCurList
            }
            break
        case setAllList :
            state = {
                ...state,
                listAll: action.payload
            }
            break
    }
    return state
}