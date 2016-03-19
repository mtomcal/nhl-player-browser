import React from 'react';
import {stateStream, PlayerListActions} from './data/stores';
import mapComponentToStream from './mapComponentToStream';

export const App = React.createClass({
  renderItems() {
    return this.props.stream.playerList
    .map(function (player, index) {
      var style = {
        order: -player.goals
      };
      return (
        <div key={`player-${index}`} style={style} className="item card">
        <h1>{player.playerName}</h1>
        <hr />
        <p>Goals: {player.goals}</p>
        </div>
      );
    });
  },
  render() {
    return (
      <div className="container">
        {this.renderItems()}
      </div>
    );
  }
});

const StreamContainer = mapComponentToStream({
  Component: App,
  stream: stateStream
});

export default function (props) {
  PlayerListActions.get();
  return <StreamContainer {...props} />;
}
