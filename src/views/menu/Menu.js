import React, { Component } from 'react';
import './menu.css';
class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    url: null,
                    name: '',
                    artists: '',
                    picUrl: '',
                    id: 0,
                }
            ]
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.list !== this.props.list) {
            if (this.props.list) {
                this.setState({
                    list: this.props.list
                })
            }
        }
    }
    setindex(i) {
        this.props.setindex(i)
    }
    clearindex(id) {
        this.props.clearindex(id)
    }
    render() {
        return (
            <div className={this.props.hidden ? 'hidden' : "menu_index"}>
                <h3>正在播放</h3>
                <div className="songBody2">
                    {
                        this.state.list.map((item, index) => {
                            return <div className="songList" key={index}>
                                <div onClick={() => this.setindex(index)}>
                                    <div className="songName">{item.name}</div>
                                    <div className="songArtists">
                                        {item.artists}
                                    </div>
                                </div>
                                <span className='songClear' onClick={() => this.clearindex(item.id)}>X</span>
                            </div>
                        })
                    }
                </div>

            </div>
        );
    }
}

export default Menu;