import React, { Component } from 'react'
import { FaPlus } from "react-icons/fa";

export default class MainFooter extends Component {
  render() {
    return (
      <div style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          left: 0,
          backgroundColor: 'red',
          height: 50
      }}>
        <center>
            <div>
                <FaPlus
                    onClick={this.props.Method}
                    style={{backgroundColor: '#ccc', borderRadius: '100%', padding: 10, cursor: 'pointer'}} 
                    color={'white'}
                    size={50}
                    />
            </div>
        </center>
      </div>
    )
  }
}
