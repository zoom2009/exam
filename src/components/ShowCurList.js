import React, { Component } from 'react'
import {Row, Col} from 'reactstrap'
import Card from './Card';
import {observer} from 'mobx-react'
import ListStore from '../Mobx/ListStore'

class ShowCurList extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       CardList: []
    }
  }
  
  render() {
    return (
        <Row>
        {
          ListStore.getCurList.map((e, i) => {
            let dmg
            let happy = 0
            let weak = e.convertedRetreatCost * 100> 100 ? 0 : e.convertedRetreatCost * 100
            // console.log(e.attacks[0].damage)
            if(e.attacks) {
              console.log('e.attacks[0].damage', e.attacks[0].damage)
              dmg = +(e.attacks[0].damage.substring(0, e.attacks[0].damage.length - 1))
              // console.log('dd', dmg)
              happy = ((e.hp/10) + (dmg/10) + 10 - (weak) ) / 5
              // console.log('happ: ', happy)
              // Happiness level calculation ((hp / 10) + (damage /10 ) + 10 - (weak)) / 5
            }
            
            // let happy = 5
            let dHappy = []
            for(let i=0;i<happy;i++) {
              dHappy.push(i)
            }
            // Happiness level calculation ((hp / 10) + (damage /10 ) + 10 - (weak)) / 5

            return (
                <Col
                  style={{overflow: 'scroll'}}
                  key={i} 
                  md={6}>
                  <Card 
                    index={i}
                    fnRemove={(index)=>ListStore.removeList(index)}
                    isRemove={true}
                    isAdd={false}
                    src={e.imageUrl}
                    name={e.name}
                    hp={e.hp > 100 ? 100: e.hp}
                    str={e.convertedRetreatCost * 50 > 100 ? 0 : e.convertedRetreatCost * 50}
                    weak={e.convertedRetreatCost * 100> 100 ? 0 : e.convertedRetreatCost * 100}
                    happy={dHappy}
                    />
                </Col>
            )
          })  
        }
        </Row>
    )
  }
}


export default observer(ShowCurList)