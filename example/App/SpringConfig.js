import React from 'react';
import { config } from 'react-spring';
import {Collapse} from '../../src';


export class SpringConfig extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      height: 100,
      preset: 'stiff',
      tension: config.stiff.tension,
      friction: config.stiff.friction
    };
    this.onChangePreset = this.onChangePreset.bind(this);
  }

  onChangePreset({target: {value: preset}}) {
    const {tension, friction} = config[preset];
    this.setState({tension, friction});
  };


  render() {
    const {
      isOpened,
      height,
      preset,
      tension,
      friction
    } = this.state;

    return (
      <div>
        <div className="config">
          <label className="label">
            Opened:
            <input
              className="input"
              type="checkbox"
              checked={isOpened}
              onChange={({target: {checked}}) => this.setState({isOpened: checked})} />
          </label>

          <label className="label">
            Content height:
            <input
              className="input"
              type="range"
              value={height}
              step={50}
              min={0}
              max={500}
              onChange={({target: {value}}) => this.setState({height: parseInt(value, 10)})} />
            {height}
          </label>

          <label className="label">
            Preset:
            <select
              className="input"
              value={preset}
              onChange={this.onChangePreset}>
              {Object.keys(config).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>

          <label className="label">
            tension:
            <input
              className="input"
              type="range"
              value={tension}
              step={10}
              min={0}
              max={300}
              onChange={({target: {value}}) => this.setState({tension: parseInt(value, 10)})} />
            {tension}
          </label>

          <label className="label">
            friction:
            <input
              className="input"
              type="range"
              value={friction}
              step={5}
              min={0}
              max={40}
              onChange={({target: {value}}) => this.setState({friction: parseInt(value, 10)})} />
            {friction}
          </label>
        </div>
        <Collapse
          className="ReactCollapse--collapse"
          isOpened={isOpened}
          springConfig={{tension, friction}}>
          <div style={{height}} className="blob" />
        </Collapse>

      </div>
    );
  }
}
