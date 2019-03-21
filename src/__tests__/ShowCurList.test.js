import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import {Provider} from 'react-redux'
import ShowCurList from '../components/ShowCurList';
import App from '../App';
import { FaPlus } from 'react-icons/fa';
import ModalComponent from '../components/ModalComponent';
import {store} from './App.test'

describe('<ShowCurList />', () => {
    it('remove card then -1 from current card on redux & screen', async() => {
        let wrapper = mount(
            <Provider store={store}>
                <App>
                    <ShowCurList />
                    <ModalComponent />
                </App>
            </Provider>
        )
        wrapper.find(FaPlus).simulate('click')
        wrapper.find('.add-card').first().simulate('click')
        wrapper.find('.add-card').first().simulate('click')
        
        let curLen = wrapper.props().store.getState().card.curList.length
        wrapper.find('.remove-card').first().simulate('click')
        let afterLen = wrapper.props().store.getState().card.curList.length
        expect(afterLen).to.equal(curLen-1)
    })

    it('if hp more than 100 will assign 100', () => {
        let wrapper = mount(
            <Provider store={store}>
                <ShowCurList />
            </Provider>
        )
        let status = true
        wrapper.props().store.getState().card.curList.forEach((e) => {
            let hp = e.hp > 100 ? 100 : e.hp
            if(hp < 0 || hp>100) {
                status = false
            }
        })
        expect(status).to.equal(true)
    })

    it('if data no have weakness will assign to 0', () => {
        let wrapper = mount(
            <Provider store={store}>
                <ShowCurList />
            </Provider>
        )
        let status = true
        wrapper.props().store.getState().card.curList.forEach((e) => {
            let weak = e.weaknesses? (e.weaknesses.length/e.attacks.length) : 0

            if(isNaN(weak)) status = false
        }) 
        expect(status).to.equal(true)
    })

    it('if str more than 100 will assign to 100', () => {
        let wrapper = mount(
            <Provider store={store}>
                <ShowCurList />
            </Provider>
        )
        let status = true
        wrapper.props().store.getState().card.curList.forEach((e) => {
            let str = e.convertedRetreatCost * 50 > 100 ? 100 : e.convertedRetreatCost * 50
            if(str < 0 || str>100) {
                status = false
            }
        })
        expect(status).to.equal(true)
    })
})
