import React, { Component } from 'react'
import './App.css'
import MainFooter from './components/MainFooter';
import ShowCurList from './components/ShowCurList';
import Modal from 'react-modal';
import ModalComponent from './components/ModalComponent';
import ListStore from './Mobx/ListStore'

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
  BottomBarBackground: '#ec5655'
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: 500, height: 500
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
    setTimeout(()=>Modal.setAppElement('#myApp'), 1000)
    this.getAllList()
    this.setState({ready: true})
  }

  getAllList() {
    return fetch('http://localhost:3030/api/cards')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('res : ', response)
        // console.log('res2 : ', responseJson)
        console.log(responseJson.cards[0])
        // return responseJson.movies;
        this.setState({cardAllList: responseJson.cards})
        ListStore.init(responseJson.cards)
      })
      .catch((error) => {
        console.error(error);
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
        <div style={{fontFamily: 'Gaegu'}} id="myApp" className="App">
          <ShowCurList 
            // cardAllList={this.state.curCardList}
            />

          <MainFooter 
            Method={()=>this.setState({modalIsOpen: true})}
            />

          <Modal
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

export default App
