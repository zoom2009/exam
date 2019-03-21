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
    // console.log('sss', this.props.card.listAll)
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
                let atk = 0
                if(e.attacks) {
                  e.attacks.forEach(a => {
                    if(isNaN(a.damage)) {
                      atk+=(+(a.damage.substring(0, a.damage.length-1)))
                    }
                  })
                }
                let hp = !isNaN(e.hp) ? e.hp > 100 ? 100 : e.hp : 0
                let weak = e.weaknesses? (e.weaknesses.length/e.attacks.length) : 0
                let data = {
                  name: e.name,
                  hp,
                  str: e.convertedRetreatCost? e.convertedRetreatCost * 50 > 100 ? 100 : e.convertedRetreatCost * 50 : 0,
                  atk,
                  weak : weak*100,
                  level: ((hp/10)+(atk/10)+10-weak)/5
                }

                if(e.name.indexOf(this.state.searchText)!==-1) {
                  // let happy = 5
                  let dHappy = []
                  for(let i=0;i<data.level;i++) {
                    dHappy.push(i)
                  }
                    return (
                      <Card 
                        key={i}
                        fnAdd={(i)=>{
                          // Mobx
                          ListStore.addList(i)
                          // Redux
                          // console.log(this.props.addList)
                          this.props.addList(i)
                          }
                        }
                        index={i}
                        isRemove={false}
                        isAdd={true}
                        src={e.imageUrl}
                        name={data.name}
                        hp={data.hp}
                        str={data.str}
                        weak={data.weak}
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