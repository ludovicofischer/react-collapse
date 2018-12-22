import React from 'react';
import PropTypes from 'prop-types';
import { UnmountClosed } from '../../src';

class Test extends React.PureComponent {
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

export class AutoUnmount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpened: this.props.isOpened };
    this.counter = 0;
    this.messages = [];
  }

  render() {
    const { isOpened } = this.state;

    return (
      <div>
        <div className="config">
          <label className="label">
            Opened:
            <input
              className="input"
              type="checkbox"
              checked={isOpened}
              onChange={({ target: { checked } }) => {
                this.setState({ isOpened: checked });
              }}
            />
          </label>
        </div>

        <UnmountClosed isOpened={isOpened}>
          <Test
            onMount={() => {
              if (this.ref) {
                this.messages.unshift(`${this.counter}. Mounted`);
                this.messages = this.messages.slice(0, 5);
                this.ref.innerHTML = this.messages.join('<br />');
                this.counter = this.counter + 1;
              }
            }}
            onUnmount={() => {
              if (this.ref) {
                this.messages.unshift(`${this.counter}. Unmounted`);
                this.messages = this.messages.slice(0, 5);
                this.ref.innerHTML = this.messages.join('<br />');
                this.counter = this.counter + 1;
              }
            }}
          />
        </UnmountClosed>

        <div
          className="log"
          ref={ref => {
            this.ref = ref;
          }}
        />
      </div>
    );
  }
}

AutoUnmount.propTypes = {
  isOpened: PropTypes.bool.isRequired
};

Test.propTypes = {
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired
};
