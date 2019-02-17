import React, { Component } from 'react'
import { Progress } from 'reactstrap';
import { IoIosClose } from "react-icons/io";


export default class Card extends Component {
  render() {
    let {src, name, hp, str, weak, isAdd, isRemove, fnAdd, fnRemove, index, happy} = this.props

   
    console.log('is index')
    return (
      <div className="border" style={{position: 'relative'}}>
        <div className="d-flex">
            <img style={{height: 200}} className="img-thumbnail" src={src} alt="ss"/>
            <div className="col-8">
                <p>{name}</p>
                <div className="d-flex">HP<Progress style={{marginLeft: 35, width: '70%', marginTop: 4}} value={hp} /></div>
                <div className="d-flex">STR <Progress style={{marginLeft: 25, width: '70%', marginTop: 4}} value={str} /></div>
                <div className="d-flex">WEAK <Progress style={{marginLeft: 10, width: '70%', marginTop: 4}} value={weak} /></div>
                <div>
                  {
                    happy.map((e, i) => (
                      <img key={i} style={{width: 50, height: 50}} src={require('../cute.png')} />
                    ))
                  }
                </div>
            </div>
        </div>
         { isAdd==true &&
            <div
              onClick={()=>fnAdd(index)} 
              style={{cursor: 'pointer', position: 'absolute', top: 0, right: 0, padding: 10, color: 'red'}}>
              Add
            </div>
          }
          {
            isRemove &&
            <div
              onClick={()=>fnRemove(index)} 
              style={{cursor: 'pointer', position: 'absolute', top: 0, right: 0, padding: 10, color: 'red'}}>
              <IoIosClose 
                size={30}
                />
            </div>
          }
      </div>
    )
  }
}
