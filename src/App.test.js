import React from 'react'
import { shallow, mount } from 'enzyme';
import {expect} from 'chai'
import App from './App'
import ShowCurList from './components/ShowCurList';
import MainFooter from './components/MainFooter';
import ModalComponent from './components/ModalComponent';
import CardList from '../src/mock/cardList'
import Modal from 'react-modal';
import { FaPlus } from "react-icons/fa";
import ListStore from './Mobx/ListStore'
import Card from './components/Card';
import {Input} from 'reactstrap'

describe('<App />', () => {
    // Is render
    it('is render ShowCurList component', () => {
        let wrapper = shallow(<App />)
        expect(wrapper.find(ShowCurList)).to.have.lengthOf(1)
    })
    it('is render MainFooter', () => {
        let wrapper = shallow(<App />)
        expect(wrapper.find(MainFooter)).to.have.lengthOf(1)
    })
    it('is render ModalComponent', () => {
        let wrapper = shallow(<App />)
        expect(wrapper.find(ModalComponent)).to.have.lengthOf(1)
    })
    it('it have modal', () => {
        let wrapper = mount(<App />)
        expect(wrapper.find(Modal)).to.have.lengthOf(1)
    })
    // Fetch data
    it('should get some result from fetch', async() => {
        let response = await CardList.all()
        // console.warn(response)
        expect(response.cards.length).to.be.at.least(1)
    })
    it('should get result 20 card from fetch', async() => {
        let response = await CardList.all()
        expect(response.cards.length).to.be.equal(20)
    })
    // Action
    it('modal not popup if not click', () => {
        let wrapper = shallow(<App />)
        expect(wrapper.find(Modal).props().isOpen).to.equal(false)
    })
    it('modal will popup when click + button', () => {
        let wrapper = mount(<App />) // FaPlus is child of child in App that why using mount 
        wrapper.find(FaPlus).simulate('click')
        expect(wrapper.find(Modal).props().isOpen).to.equal(true)
    })
    // List
    it('currrent card on mobx & screen is 0', () => {
        expect(ListStore.getCurList.length).to.equal(0)
        let wrapper = mount(<ShowCurList />)
        expect(wrapper.find(Card).length).to.equal(0)
    })
    it('add card then have +1 from current card on mobx & screen', () => {
        let wrapper = mount(<App />)
        // add card
        wrapper.find(FaPlus).simulate('click')
        wrapper.find('.add-card').first().simulate('click')
        expect(ListStore.getCurList.length).to.equal(1)

        wrapper.find('.add-card').first().simulate('click')
        expect(ListStore.getCurList.length).to.equal(2)
        let wrapper2 = mount(<ShowCurList />)
        expect(wrapper2.find(Card).length).to.equal(2)
    })
})

describe('<ShowCurList />', () => {
    it('remove card then -1 from current card on mobx & screen', () => {
        // remove card        
        let wrapper = mount(<ShowCurList />)
        let curLen = ListStore.getCurList.length
        wrapper.find('.remove-card').first().simulate('click')
        expect(ListStore.getCurList.length).to.equal(curLen-1)
        expect(wrapper.find(Card).length).to.equal(curLen-1)
    })
})

describe('<Modal />', () => {
    it('search `Windstorm` will get 1 result', () => {
        let wrapper = shallow(<App />)
        wrapper.setState({modalIsOpen: true})
        let wrapper2 = mount(<ModalComponent />)
        let input = wrapper2.find(Input)

        input.simulate('focus')
        input.simulate('change', {target: {value: 'Windstorm'}})
        let cardsLen = wrapper2.find(Card).length
        expect(cardsLen).to.equal(1)
    })
    it('search `u` will get only card have alphabet `u`', () => {
        let wrapper2 = mount(<ModalComponent />)
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