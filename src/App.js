import React, { Component } from 'react'
import './App.css'
import MainFooter from './components/MainFooter';
import ShowCurList from './components/ShowCurList';
import Modal from 'react-modal';
import ModalComponent from './components/ModalComponent';
import ListStore from './Mobx/ListStore'
import {connect} from 'react-redux'
import {SetAllList} from './Redux/CardStore/CardAction'

export const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
  BottomBarBackground: '#ec5655',
  CardBackground: '#f3f4f7',
  ProcessColor: '#f3701a'
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: 500, height: 500,
    fontFamily:  'Gaegu'
  }
};

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       cardAllList: [],
       ready: false,
       modalIsOpen: false
    }
  }

  componentDidMount() {
    setTimeout(()=>Modal.setAppElement('#myApp'), 200)
    this.getAllList()
    this.setState({ready: true})

    console.log('Redux : ', this.props.card.listAll)
  }

  getAllList() {
    return fetch('http://localhost:3030/api/cards')
      .then((response) => response.json())
      .then((responseJson) => {
        // --- Mobx ---
        this.setState({cardAllList: responseJson.cards})
        ListStore.init(responseJson.cards)
        // --- Redux ---
        this.props.setAllList(responseJson.cards)
        console.log('After set redux : ', this.props.card.listAll)
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    // font-family: 'Gaegu', cursive;
    // font-family: 'Atma', cursive;

    let {cardAllList,curCardList, ready} = this.state
    if(ready) {
      return (
        <div style={{height: 200}} id="myApp" className="App main-font">
          <ShowCurList />

          <MainFooter 
            Method={()=>this.setState({modalIsOpen: true})}
            />

          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            >
            <ModalComponent 
              allCardList={cardAllList}
              />
          </Modal>
        </div>
      )
    }else {
      return (
        <div>Loading...</div>
      )
    }
    
  }
}

const mapStateToProps = (state) => ({
  card: state.card
})

const mapDispatchToProps = dispatch => ({
  setAllList: payload => dispatch(SetAllList(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
