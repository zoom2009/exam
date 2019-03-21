import React, { Component } from 'react'
import {Row, Col} from 'reactstrap'
import Card from './Card';
import {observer} from 'mobx-react'
import ListStore from '../Mobx/ListStore'

import {connect} from 'react-redux'
import {RemoveList} from '../Redux/CardStore/CardAction'

class ShowCurList extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       CardList: []
    }
  }
  
  render() {
    return (
        <Row style={{maxHeight: 660, overflowY: 'scroll', overflowX: 'hidden'}}>
        {
          // Redux
          this.props.card.curList.map((e, i) => {
          // Mobx
          // ListStore.getCurList.map((e, i) => {
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
            // console.log('data :', data)

            let dHappy = []
            for(let i=0;i<data.level;i++) {
              dHappy.push(i)
            }

            return (
                <Col
                  key={i} 
                  md={6}>
                  <Card 
                    index={i}
                    // Mobx
                    // fnRemove={(index)=>ListStore.removeList(index)}
                    // Redus
                    fnRemove={(index)=>this.props.removeList(index)}
                    isRemove={true}
                    isAdd={false}
                    src={e.imageUrl}
                    name={data.name}
                    hp={data.hp}
                    str={data.str}
                    weak={data.weak}
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

// Mobx
// export default observer(ShowCurList)

// Redux
const mapStateToProps = (state) => ({
  card: state.card
})

const mapDispatchToProps = dispatch => ({
  removeList: payload => dispatch(RemoveList(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowCurList)