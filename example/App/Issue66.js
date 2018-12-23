import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '../../src';

class Test extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <div>Test</div>;
  }
}

export class Issue66 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldRender: false };
    this.counter = 0;
    this.messages = [];
    this.onChange = this.onChange.bind(this);
  }

  onMount() {
    if (this.ref) {
      this.messages.unshift(`${this.counter}. Mounted`);
      this.messages = this.messages.slice(0, 5);
      this.ref.innerHTML = this.messages.join('<br />');
      this.counter = this.counter + 1;
    }
  }

  onUnmount() {
    if (this.ref) {
      this.messages.unshift(`${this.counter}. Unmounted`);
      this.messages = this.messages.slice(0, 5);
      this.ref.innerHTML = this.messages.join('<br />');
      this.counter = this.counter + 1;
    }
  }

  /**
   *
   * @param {{target: {checked: boolean}}} checked
   */
  onChange({ target: { checked } }) {
    this.setState({ shouldRender: checked });
  }

  render() {
    return (
      <div>
        <div className="config">
          <label className="label">
            Should render:
            <input
              type="checkbox"
              checked={this.state.shouldRender}
              onChange={this.onChange}
            />
          </label>
        </div>

        <div className="log" ref={ref => (this.ref = ref)} />

        {this.state.shouldRender ? (
          <Collapse isOpened={this.props.isOpened} className="ReactCollapse--collapse">
            <Test onMount={this.onMount} onUnmount={this.onUnmount} />
          </Collapse>
        ) : null}
      </div>
    );
  }
}

Issue66.propTypes = {
  isOpened: PropTypes.bool.isRequired
};

Test.propTypes = {
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired
};
