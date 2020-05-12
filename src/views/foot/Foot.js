import React, { Component } from 'react';
import './foot.css';
import { withRouter } from "react-router-dom";
import ReactPlayer from 'react-player'
import Menu from '../menu/Menu'
class Foot extends Component {
	constructor(props) {
		super(props)
		this.state = {
			playlist: [{
				url: null,
				name: '',
				artists: '',
				picUrl: '',
				id: 0,
			}],
			index: 0,
			hidden: true,
			loop:false
		}
		this.setindex = this.setindex.bind(this)
		this.clearindex = this.clearindex.bind(this)
	}
	componentDidUpdate(prevProps) {
		if (prevProps.music.playlist !== this.props.music.playlist) {
			if (this.props.music.playlist) {
				this.setState({
					playlist: this.props.music.playlist

				})
			}
		}
	}
	toView() {
		this.props.history.push('/play/' + this.state.playlist[this.state.index].id)
		console.log(this.props.music)
	}
	next() {
		if (this.state.index === this.state.playlist.length - 1) {
			return
		} else {
			this.setState({
				index: this.state.index + 1
			})
		}

	}
	prev() {
		if (this.state.index === 0) {
			return
		} else {
			this.setState({
				index: this.state.index - 1
			})
		}

	}
	list() {
		this.setState({
			hidden: !this.state.hidden
		})
	}
	setindex(index) {
		this.setState({
			index: index
		})
	}
	clearindex(id) {
		this.props.clearindex(id)
	}
	//播放结束
	playend() {
		console.log('end')
		if (this.state.index === this.state.playlist.length - 1) {
			return
		} else {
			this.setState({
				index: this.state.index + 1
			})
		}
	}
	setloop(){
		this.setState({
			loop: !this.state.loop
		})
	}
	render() {
		return (
			<div className="foot_index">
				<ReactPlayer onEnded={() => this.playend()} playing={this.props.music.play} progressInterval={1000} onProgress={({ playedSeconds }) => this.props.playedSeconds(playedSeconds)} url={this.state.playlist[this.state.index].url} loop={this.state.loop}  />
				<div className="footer">
					<img src={this.state.playlist[this.state.index].picUrl} onClick={() => this.toView()} alt='' className="footer_img" />
					<div className="footer_text">{this.state.playlist[this.state.index].name}</div>
					<div className="footer_text2">{this.state.playlist[this.state.index].artists}</div>
					<div className={this.props.music.play ? 'footer_pasue' : 'footer_play'} onClick={this.props.toggle}></div>
					<div className='footer_back' onClick={() => this.prev()}></div>
					<div className='footer_up' onClick={() => this.next()}></div>
					<div className='footer_list' onClick={() => this.list()}></div>
					<div className={this.state.loop?'playmode2':'playmode'} onClick={() => this.setloop()}></div>
					
				</div>
				<Menu clearindex={this.clearindex} setindex={this.setindex} hidden={this.state.hidden} list={this.state.playlist} />
			</div>
		);
	}
}

export default withRouter(Foot);
