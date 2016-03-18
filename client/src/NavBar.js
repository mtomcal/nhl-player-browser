import React from 'react';
import jQuery from 'jquery';

export default React.createClass({
    propTypes: {
        children: React.PropTypes.any.isRequired,
        arg1: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            coolColor: 'white'
        };
    },
    onClickHandler(e) {
        this.setState({coolColor: 'red'});
    },
    renderPlayerList() {
        if (this.props.playerList) {
            return this.props.playerList.map((player, index) => {
                return <li key={`player-${index}`}>{player.name}</li>;
            })
        }
    },
    componentDidMount() {
        jQuery(this.refs.videoPlayerEmbed).html('<div id="cool"></div>');
    },
    componentWillUnmount() {
        jQuery(this.refs.videoPlayerEmbed).html('');
    },
    render() {
        return (
            <nav>
                {/*<div ref="videoPlayerEmbed"></div>*/}
                {/*<h1 style={{color: this.state.coolColor}} onClick={this.onClickHandler}>{this.props.arg1}</h1>*/}
                <ul>
                {this.renderPlayerList()}
                </ul>
                <p className="nav-option">Patrick Kane</p>
                <p className="nav-option" style={{color: '#3f4153'}}>Team</p>
                <p className="nav-option" style={{color: '#3f4153'}}>Stats</p>
                {/*{this.props.children}*/}
            </nav>
        );
    }
});
