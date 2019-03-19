import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai'
import App from './App'
import 'isomorphic-fetch'
import ShowCurList from './components/ShowCurList';
import MainFooter from './components/MainFooter';
import ModalComponent from './components/ModalComponent';
import CardList from '../src/mock/cardList'

configure({ adapter: new Adapter() });

describe('<App />', () => {
    it('is render ShowCurList component', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(ShowCurList)).to.have.lengthOf(1)
    })
    it('is render MainFooter', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(MainFooter)).to.have.lengthOf(1)
    })
    it('is render ModalComponent', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(ModalComponent)).to.have.lengthOf(1)
    })
    it('should get result from fetch', async() => {
        const response = await CardList.all()
        // console.warn(response)
        expect(response.cards.length).to.be.at.least(1)
    })
})