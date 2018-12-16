/* eslint-disable react/no-did-update-set-state,react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';

const IDLING = 'IDLING';


const noop = () => null;

export class Collapse extends React.PureComponent {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    springConfig: PropTypes.objectOf(PropTypes.number),
    forceInitialAnimation: PropTypes.bool,

    hasNestedCollapse: PropTypes.bool,

    fixedHeight: PropTypes.number,

    theme: PropTypes.objectOf(PropTypes.string),
    style: PropTypes.object,

    onRender: PropTypes.func,
    onRest: PropTypes.func,
    onMeasure: PropTypes.func,

    children: PropTypes.node.isRequired
  };


  static defaultProps = {
    springConfig: {},
    forceInitialAnimation: false,
    hasNestedCollapse: false,
    fixedHeight: -1,
    style: {},
    onRender: noop,
    onRest: noop,
    onMeasure: noop
  };


  constructor(props) {
    super(props);
    this.state = {
      currentState: IDLING,
      from: 0,
      to: 0
    };
  }

  renderContent = (springStyles) => { // eslint-disable-line
    const {
      isOpened: _isOpened,
      springConfig: _springConfig,
      forceInitialAnimation: _forceInitialAnimation,
      hasNestedCollapse: _hasNestedCollapse,
      fixedHeight: _fixedHeight,
      theme,
      style,
      onRest: _onRest,
      onMeasure: _onMeasure,
      children,
      ...props
    } = this.props;

    return (
      <div
        style={{...springStyles, ...style, overflow: 'hidden'}}
        {...props}>
        {children}
      </div>
    );
  };


  render() {
    const target = this.props.isOpened ? 'auto' : 0;
    return (
      <Spring
        from={{height: 0}}
        onRest={this.props.onRest}
        to={{height: target }}
        config={this.props.springConfig}>
        {this.renderContent}
      </Spring>
    );
  }
}
