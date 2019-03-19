import React, { Component } from 'react'
import {Input} from 'reactstrap'
import Card from './Card';
import {observer} from 'mobx-react'
import ListStore from '../Mobx/ListStore'

import {connect} from 'react-redux'
import {AddList} from '../Redux/CardStore/CardAction'

class ModalComponent extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       searchText: ''
    }
  }
  
  
  render() {
    let {allCardList} = this.props
    console.log('sss', this.props.card.listAll)
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Input 
            id="search-poke"
            value={this.state.searchText} 
            onChange={(e)=>this.setState({searchText: e.target.value})} 
            placeholder='find pokemon' 
            style={{width: '100%'}} />
          {
            // Redux
            this.props.card.listAll.map((e, i) => {
            // Mobx
            // ListStore.getAllList.map((e, i) => {
                console.log('name : ', e.name)
                if(e.name.indexOf(this.state.searchText)!==-1) {
                  let dmg
                  let happy = 0
                  let weak = e.convertedRetreatCost * 100> 100 ? 0 : e.convertedRetreatCost * 100
                  if(e.attacks) {
                    if(e.attacks && e.attacks.length>0 && e.attacks[0].damage) {
                      dmg = +(e.attacks[0].damage.substring(0, e.attacks[0].damage.length - 1))
                      // console.log(e.attacks[0].damage)
                      happy = ((e.hp/10) + (dmg/10) + 10 - (weak) ) / 5
                    }
                }
                  // let happy = 5
                  let dHappy = []
                  for(let i=0;i<happy;i++) {
                    dHappy.push(i)
                  }
                    return (
                      <Card 
                        key={i}
                        fnAdd={(i)=>{
                          // Mobx
                          ListStore.addList(i)
                          // Redux
                          console.log(this.props.addList)
                          this.props.addList(i)
                          }
                        }
                        index={i}
                        isRemove={false}
                        isAdd={true}
                        src={e.imageUrl}
                        name={e.name}
                        hp={e.hp > 100 ? 100: e.hp}
                        str={e.convertedRetreatCost * 50 > 100 ? 0 : e.convertedRetreatCost * 50}
                        weak={e.convertedRetreatCost * 100> 100 ? 0 : e.convertedRetreatCost * 100}
                        happy={dHappy}
                        />
                    )
                }else {
                    return <div key={i}></div>
                }
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  card: state.card
})

const mapDispatchToProps = (dispatch) => ({
  addList: payload => dispatch(AddList(payload))
})

// Mobx
// export default observer(ModalComponent)

// Redux
export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)