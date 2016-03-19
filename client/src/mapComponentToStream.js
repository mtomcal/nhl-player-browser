import React from 'react';

export default function ({Component, stream}) {
  return React.createClass({
    getInitialState() {
      return {
        streamState: null
      }
    },
    componentWillUnmount() {
      this.unsub();
    },
    componentDidMount() {
      this.unsub = stream.subscribe((state) => {
        this.setState({streamState: state});
      });
    },
    render() {
      if (this.state.streamState) {
        return <Component stream={this.state.streamState} {...this.props}/>;
      }
      return <div>Loading...</div>;
    }
  });
}
