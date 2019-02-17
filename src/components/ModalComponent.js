import React, { Component } from 'react'
import {Input} from 'reactstrap'
import Card from './Card';
import ListStore from '../Mobx/ListStore'

class ModalComponent extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       searchText: ''
    }
  }
  
  
  render() {
    let {allCardList} = this.props
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Input 
            value={this.state.searchText} 
            onChange={(e)=>this.setState({searchText: e.target.value})} 
            placeholder='find pokemon' 
            style={{width: '100%'}} />
          {
            allCardList.map((e, i) => {
                if(e.name.indexOf(this.state.searchText)!==-1) {
                    return (
                        <Card 
                            key={i}
                            fnAdd={(i)=>
                              ListStore.addList(i)
                            }
                            index={i}
                            isRemove={false}
                            isAdd={true}
                            src={e.imageUrl}
                            name={e.name}
                            hp={e.hp}
                            str={20}
                            weak={30}
                            />
                    )
                }else {
                    return <div></div>
                }
            })
          }
        </div>
      </div>
    )
  }
}

export default ModalComponent