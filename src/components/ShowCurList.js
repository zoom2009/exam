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
            return (
                <Col
                  style={{overflow: 'scroll'}}
                  key={i} 
                  md={6}>
                  <Card 
                    fnRemove={(i)=>ListStore.removeList(i)}
                    isRemove={true}
                    isAdd={false}
                    src={e.imageUrl}
                    name={e.name}
                    hp={e.hp}
                    str={20}
                    weak={30}
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