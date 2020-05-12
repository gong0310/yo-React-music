import React, { Component } from 'react'
import { Toast, Icon } from 'antd-mobile'
import BScroll from 'better-scroll'
import './playerview.scss'
import { CHECK_MUSIC, GET_LYRIC, GET_MUSIC_DETAIL } from '../../api'


class PlayerView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: null,
            artists: null,
            lyric: null,
            lyricTimeArr: [],
            lyricIndex: 0,
            rotate: 0,
        }
        this.anm=this.anm.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.checkMusic(id)
        setInterval(this.anm,100)
    }
    //光碟旋转动画
    anm(){
        if(this.props.music.play){
            this.setState({
                rotate:this.state.rotate>360?1:this.state.rotate+5
            })
        }
        
    }
    checkMusic(id) { // 判断当前歌曲是否可用
        fetch(CHECK_MUSIC(id))
            .then(res => res.json())
            .then(data => {
                if (data.success) { // 可用请求歌曲mp3文件

                    this.getMusicDetail(id)
                    this.getLyric(id)

                } else { // 歌曲不可用
                    Toast.fail(data.message, 2, () => {
                        this.props.history.go(-1)
                    });
                }
            })
    }
    // 获取音乐详情
    getMusicDetail(id) {
        fetch(GET_MUSIC_DETAIL(id))
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    detail: data.songs[0].al,
                    artists: data.songs[0].ar
                })
            })
    }
    // 获取歌词
    getLyric(id) {
        fetch(GET_LYRIC(id))
            .then(res => res.json())
            .then((data) => {
                let lrc = ['[0:0]当前歌曲暂无歌词']
                if (data.lrc) {
                    lrc = data.lrc.lyric.split(/\n/g)
                }
                this.setState({ lyric: lrc })
                this.refreshLyricTimeArr(lrc)
            })
    }
    // 从歌词中解析出每一句话的歌唱时间
    refreshLyricTimeArr(lrc) {
        let timeArr = lrc.map(l => {
            // [01:27.1255] sssss
            let str = l.split(']')[0]   // [01:27.1255
            str = str.substr(1) // 01:27.1255
            let arr = str.split(':') // [01,27.1255]
            let time = arr[0] * 60 + Number(arr[1])
            return time
        })

        timeArr = timeArr.filter(t => t === t)
        this.setState({ lyricTimeArr: timeArr })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.lyric) { // 数据更新完毕，歌词列表已经渲染在页面上
            if (!this.lyricScroll) {
                this.lyricScroll = new BScroll(this.lyric, {
                    // disableTouch: true
                    disableMouse: true
                })
            }
        }
        if (prevProps.music.playedSeconds !== this.props.music.playedSeconds) {
            
            // 根据当前播放时间判断唱到哪一句歌词了
            for (let i = 0; i < this.state.lyricTimeArr.length; i++) {
                // 获取当前遍历的歌词时间下一句歌词时间的下标
                let j = i + 1
                // 避免越界
                if (j >= this.state.lyricTimeArr.length) {
                    this.setState({ lyricIndex: i })
                    break
                }

                let time = this.state.lyricTimeArr[i]
                let nextTime = this.state.lyricTimeArr[j]
                if (this.props.music.playedSeconds >= time && this.props.music.playedSeconds < nextTime) {
                    this.setState({ lyricIndex: i })
                    break
                }
            }
        }
        if (prevState.lyricIndex !== this.state.lyricIndex && this.lyricScroll) {
            this.lyricScroll.scrollToElement(`li:nth-child(${this.state.lyricIndex + 1})`, 500)
        }

    }

    componentWillUnmount() {
        if (this.lyricScroll) {
            this.lyricScroll.destroy()
        }
    }
    goback(){
        this.props.history.go(-1)
    }
    render() {
        let { detail, rotate, lyric, artists, lyricIndex } = this.state

        return (
            <div className="play-view">
                {/*  背景  */}
                {detail && (
                    <div className="play-view-bg" style={{
                        backgroundImage: `url(${detail.picUrl})`,
                    }} />
                )}
                <span className='icon' onClick={()=>this.goback()}><Icon  type='left' /></span>
                <div className="music-container">
                    {detail && (
                        <div className="music-wrap" onClick={this.pauseOrPlay}>
                            <div className="music-disc">
                                <div className="music-turn">
                                    <div className="music-light" style={{ transform: `rotate(${rotate}deg)` }}></div>
                                    <div className="music-cover" style={{
                                        backgroundImage: `url(${detail.picUrl})`,
                                        transform: `rotate(${rotate}deg)`
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {lyric && artists && detail && (
                        <div className="music-info">
                            <h2 className="music-header">{detail.name} - <span className="music-header-sname">{artists.map(ar => ar.name).join('/')}</span></h2>
                            <div className="music-lyric-wrapper" ref={el => this.lyric = el}>
                                <ul>
                                    {lyric.map((lrc, i) => (
                                        <li key={i} style={{ color: i === lyricIndex ? 'rgb(254,254,254)' : 'rgba(255, 255, 255, 0.6)' }} className="music-lyric-item">{lrc.split(']')[1]}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default PlayerView