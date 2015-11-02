import React from 'react';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin';
import Collapse from '..';
import {container} from './style';
import VariableHeight from './VariableHeight';


const Nested = React.createClass({
  getInitialState() {
    return {isOpened: false, height: 100};
  },


  shouldComponentUpdate,


  onChange({target: {value: height}}) {
    this.setState({height});
  },


  render() {
    const {isOpened} = this.state;

    return (
      <div>
        <div>
          <button onClick={() => this.setState({isOpened: !isOpened})}>Toggle</button>
        </div>

        <Collapse isOpened={isOpened} style={container}>
          <div style={{padding: 20}}>
            <VariableHeight />
          </div>
          <div style={{padding: 20}}>
            <VariableHeight />
          </div>
          <div style={{padding: 20}}>
            <VariableHeight />
          </div>
        </Collapse>
      </div>
    );
  }
});


export default Nested;