import React from 'react'
import { shallow, mount, render } from 'enzyme';
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import {expect} from 'chai'
import App from '../App'
import ShowCurList from '../components/ShowCurList';
import MainFooter from '../components/MainFooter';
import ModalComponent from '../components/ModalComponent';
import CardList from '../mock/cardList'
import Modal from 'react-modal';
import { FaPlus } from "react-icons/fa";
import ListStore from '../Mobx/ListStore'
import Card from '../components/Card';
import {Input} from 'reactstrap'
import reducer from '../Redux/index'

export const store = createStore(reducer)

// import {store} from '../index'

describe('<App />', () => {
    // Is render
    it('is render ShowCurList component', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(wrapper.find(ShowCurList)).to.have.lengthOf(1)
    })
    it('is render MainFooter', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(wrapper.find(MainFooter)).to.have.lengthOf(1)
    })
    // it('is render ModalComponent', () => {
    //     let wrapper = mount(
    //         <Modal />
    //     )
    //     expect(wrapper.find(ModalComponent)).to.have.lengthOf(1)
    // })
    it('it have modal', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(wrapper.find(Modal)).to.have.lengthOf(1)
    })
    // // Fetch data
    it('should get some result from fetch', async() => {
        let response = await CardList.all()
        // console.warn(response)
        expect(response.cards.length).to.be.at.least(1)
    })
    it('should get result 20 card from fetch', async() => {
        let response = await CardList.all()
        expect(response.cards.length).to.be.equal(20)
    })
    // // Action
    it('modal not popup if not click', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(wrapper.find(Modal).props().isOpen).to.equal(false)
    })
    it('modal will popup when click + button', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        wrapper.find(FaPlus).simulate('click')
        expect(wrapper.find(Modal).props().isOpen).to.equal(true)
    })
    it('will call function when click open modal <Mock FN>', () => {
        let mockFn = jest.fn()
        let onClickMock = jest.fn(() => {
            mockFn()
        })
        let wrapper = mount(
            <FaPlus onClick={onClickMock}/>
        )
        wrapper.find(FaPlus).simulate('click')
        expect(mockFn.mock.calls.length).to.equal(1)
        // console.log('call :', mockFn.should.have.been.called())
    })
    // // List
    it('currrent card on redux & screen is 0', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        // console.log('warapper props : ', wrapper.props().store.getState().card.curList.length)
        expect(wrapper.props().store.getState().card.curList.length).to.equal(0)
        // let wrapper = mount(<ShowCurList />)
        expect(wrapper.find(Card).length).to.equal(0)
    })
    it('add card then have +1 from current card on redux & screen', () => {
        let wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        // add card
        wrapper.find(FaPlus).simulate('click')
        wrapper.find('.add-card').first().simulate('click')
        expect(store.getState().card.curList.length).to.equal(1)

        wrapper.find('.add-card').first().simulate('click')
        expect(store.getState().card.curList.length).to.equal(2)
        
        let wrapper2 = mount(
            <Provider store={store}>
                <ShowCurList />
            </Provider>
        )
        expect(wrapper2.find(Card).length).to.equal(2)
    })
})

describe('<ShowCurList />', () => {
    it('remove card then -1 from current card on redux & screen', () => {
        // remove card        
        let wrapper = mount(
            <Provider store={store}>
                <ShowCurList />
            </Provider>
        )
        let curLen = store.getState().card.curList.length
        wrapper.find('.remove-card').first().simulate('click')
        // expect(wrapper.props().store.getState().card.curList.length).to.equal(curLen-1)
        expect(store.getState().card.curList.length).to.equal(curLen-1)
        expect(wrapper.find(Card).length).to.equal(curLen-1)
    })
})

describe('<Modal />', () => {
    it('search `Windstorm` will get 1 result', () => {
        let wrapper = shallow(
            <Provider store={store}>
                <App />
            </Provider>
        )
        wrapper.setState({modalIsOpen: true})
        let wrapper2 = mount(
            <Provider store={store}>
                <ModalComponent />
            </Provider>
        )
        let input = wrapper2.find(Input)

        input.simulate('focus')
        input.simulate('change', {target: {value: 'Windstorm'}})
        let cardsLen = wrapper2.find(Card).length
        expect(cardsLen).to.equal(1)
    })
    it('search `u` will get only card have alphabet `u`', () => {
        let wrapper2 = mount(
            <Provider store={store}>
                <ModalComponent />
            </Provider>
        )
        let input = wrapper2.find(Input)

        input.simulate('focus')
        input.simulate('change', {target: {value: 'u'}})
        let cards = wrapper2.find(Card)

        let status = true
        cards.forEach(e => {
            let n = e.props().name
            if(n.indexOf('u')===-1) status = false
        })

        expect(status).to.equal(true)
    })
})