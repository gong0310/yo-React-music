import React from 'react'
import { GET_MINE_DETAIL, GET_MINE } from '../../api'
import { Button, List, Modal,Toast } from 'antd-mobile';
import './my.scss'
import { withRouter } from 'react-router-dom'
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;
class Mine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: '',
            nickname: '',
            playlist: [],
            login: false
        }
    }
    getuser(id) {
        // 获取用户详情
        fetch(GET_MINE(id)).then(res => res.json())
            .then(data => {
                this.setState({
                    nickname: data.profile.nickname,
                    avatarUrl: data.profile.avatarUrl
                })
                this.setState({
                    login: true
                })
            })
            .catch(()=>{
                Toast.info('你输入的uid错误');
            })
            // 获取用户歌单
        fetch(GET_MINE_DETAIL(id)).then(res => res.json())
            .then(data => {
                this.setState({
                    playlist: data.playlist
                })
            })
    }
    // 进入歌单
    goplaylist(id) {
        console.log(this.props)
        this.props.history.push(`/playlist/${id}`)
    }
    render() {
        return (
            <div>
                {this.state.login ? <div className='my_yes'>
                    <div className='my_detail'>
                        <img className='my_pic' alt='' src={this.state.avatarUrl} />
                        <span className='my_name'>{this.state.nickname}</span>
                    </div>
                    <div className='my_music'>
                        <span>我的歌单</span>
                        {this.state.playlist.map(i => {
                            return (
                                <div key={i.id}>
                                    <Item
                                        arrow="horizontal"
                                        thumb={i.coverImgUrl}
                                        multipleLine
                                        onClick={() => { this.goplaylist(i.id) }}
                                    >
                                        <Brief>{i.name}</Brief>
                                    </Item>
                                </div>
                            )
                        })}
                    </div>
                </div> : <div className='my_no'>
                        <h4 className='my_titel'>您还未登录哦！快快登录吧！</h4>
                        <Button onClick={() => prompt(
                            '登录网易云=>我的主页,在网址处查看uid',
                            ' 输入你的uid',
                            password =>this.getuser(password),
                            'secure-text',
                        )}
                        >登录</Button>
                    </div>}
            </div>
        )
    }
}
export default withRouter(Mine)