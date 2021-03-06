import React, { Component } from 'react'
import { Progress } from 'reactstrap';
import { COLORS } from '../App';


export default class Card extends Component {
  render() {
    let {src, name, hp, str, weak, isAdd, isRemove, fnAdd, fnRemove, index, happy} = this.props

   
    // console.log('is index')
    return (
      <div className="card-item" style={{position: 'relative', padding: 5}}>
        <div style={{backgroundColor: COLORS.CardBackground,}} className="d-flex card-hover">
            <img style={{height: 200}} className="img-thumbnail" src={src} alt="ss"/>
            <div className="col-8">
                <p>{name}</p>
                <div className="d-flex sub-font">HP<Progress color='warning' style={{ marginLeft: 35, width: '70%', marginTop: 4}} value={hp} /></div>
                <div className="d-flex sub-font">STR <Progress color='warning' style={{marginLeft: 25, width: '70%', marginTop: 4}} value={str} /></div>
                <div className="d-flex sub-font">WEAK <Progress color='warning' style={{marginLeft: 10, width: '70%', marginTop: 4}} value={weak} /></div>
                <div>
                  {
                    happy.map((e, i) => (
                      <img key={i} style={{width: 25, height: 25}} src={require('../cute.png')} />
                    ))
                  }
                </div>
            </div>
        </div>
         { isAdd==true &&
            <div
              className="button-hover sub-font add-card"
              onClick={()=>fnAdd(index)} 
              style={{cursor: 'pointer', position: 'absolute', top: 0, right: 0, padding: 10, color: 'red'}}>
              Add
            </div>
          }
          {
            isRemove &&
            <div
              className="button-hover sub-font remove-card"
              onClick={()=>fnRemove(index)} 
              style={{cursor: 'pointer', position: 'absolute', top: 0, right: 0, padding: 10, color: 'red'}}>
              <p>X</p>
            </div>
          }
      </div>
    )
  }
}
