import {expect} from 'chai'
import {store} from './App.test'

describe('is get empty redux cardStore', () => {
    let storeData = store.getState()
    expect(storeData.card.listAll.length).to.equal(0)
    expect(storeData.card.curList.length).to.equal(0)
})
