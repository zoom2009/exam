import { addList, removeList, setAllList } from './CardType'

export const AddList = payload => ({
    type: addList, payload
})

export const RemoveList = payload => ({
    type: removeList, payload
})

export const SetAllList = payload => ({
    type: setAllList, payload
})