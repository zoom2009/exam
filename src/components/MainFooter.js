import React, { Component } from 'react'
import { FaPlus } from "react-icons/fa";
import { COLORS } from '../App';

export default class MainFooter extends Component {
  render() {
    return (
      <div style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          left: 0,
          backgroundColor: COLORS.BottomBarBackground,
          height: 50
      }}>
        <center>
            <div>
                <FaPlus
                    onClick={this.props.Method}
                    // containerStyle={{marginBottom: 20}}
                    style={{backgroundColor: COLORS.BottomBarBackground, borderRadius: '100%', padding: 30, marginTop: -50, cursor: 'pointer'}} 
                    color={'white'}
                    size={100}
                    />
            </div>
        </center>
      </div>
    )
  }
}
