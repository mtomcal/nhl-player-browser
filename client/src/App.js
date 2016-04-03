import React from 'react';
import {Provider, connect} from 'react-redux';
import state from './data/State';
import {PlayerListActions} from './data/ActionCreators';
import _ from 'lodash';

export const App = React.createClass({
  propTypes: {
    stream: React.PropTypes.array.isRequired,
    isFetched: React.PropTypes.bool.isRequired
  },
  getInitialState() {
    return {
      page: 1,
      perPage: 50
    };
  },
  pageClickHandler(index) {
    return (e) => {
      e.preventDefault();
      this.setState({page: index});
    };
  },
  renderPagination() {
    const {perPage, page} = this.state;
    const playerList = this.props.stream;
    const pages = _.range(1, Math.ceil(playerList.length / perPage))
    .map((index) => {
      const isActive = (index === page) ? 'active' : '';
      return <a className={`pager ${isActive}`}
        href="#"
        onClick={this.pageClickHandler(index)}>{index}</a>;
    });

    return (
      <div className="pagination">
        {pages}
      </div>
    );
  },
  renderItems() {
    const {perPage, page} = this.state;
    return this.props.stream
    .sort(function (a, b) {
      if (a.goals < b.goals) {
        return 1;
      }
      if (a.goals > b.goals) {
        return -1;
      }
      if (a.goals === b.goals) {
        return 0;
      }
    })
    .filter(function (player, index) {
      return index < (perPage * page) && index > (perPage * page) - perPage;
    })
    .map(function (player, index) {
      var style = {
        order: -player.goals
      };
      return (
        <div key={`player-${index}`} style={style} className="item card">
        <img className="mugshot"
          src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.playerId}@2x.jpg`} />
        <h1>{player.playerName}</h1>
        <hr />
        <p>Goals: {player.goals}</p>
        </div>
      );
    });
  },
  render() {
    if (this.props.isFetched === false) {
      return <div></div>;
    }
    return (
      <div>
        {this.renderPagination()}
        <div className="container">
          {this.renderItems()}
        </div>
        {this.renderPagination()}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    stream: state.PlayerList.body,
    isFetched: state.PlayerList.isFetched
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default function () {
  state.dispatch(PlayerListActions.fetch());
  return <Provider store={state}>
    <ConnectedApp />
  </Provider>;
}
