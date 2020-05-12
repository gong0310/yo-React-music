import React, { useEffect, useState } from 'react'
import { Flex } from 'antd-mobile'
import MusicList from '../../containers/ContainerMusic'
import { RECOMMEND_MEWSONG, RECOMMEND_MUSIC } from '../../api'
import "./recommend.scss"
import Header from '../header/Header'
import {Link} from 'react-router-dom'



function setPlayCount(num) {
    return num >= 100000 ? Math.floor(num / 1000) / 10 + '万' : num
}

function Recommend() {

    const [music, setMusic] = useState([])
    const [song, setSong] = useState([])

    useEffect(() => {
        fetch(RECOMMEND_MUSIC(6))
            .then(res => res.json())
            .then(music => {
                setMusic(music.result)
            })

        fetch(RECOMMEND_MEWSONG())
            .then(res => res.json())
            .then(song => {
                setSong(song.result)
            })
    }, [])
    return (
        <div className="recommend-view">
            <Header />
            <div className="recommend-title">
                <span className="title-text">最新音乐</span>
            </div>

            {song.map(s => (
                <MusicList key={s.id} id={s.id} picUrl={s.picUrl} name={s.name} alias={s.song.alias} artists={s.song.artists} />
            ))}
            <div className="recommend-title">
                <span className="title-text">推荐歌单</span>
            </div>
            <Flex wrap="wrap" justify="between" align="start">
                {music.map(m => (
                    <Link to={{
                        pathname:`/playlist/${m.id}`,
                    }} className="grid-item"
                    key={m.id}>
                    <div key={m.id} >
                        <div className="grid-item-icon">
                            <span className="grid-item-count">{setPlayCount(m.playCount)}</span>
                            <img className="grid-item-pic" alt={m.name} src={m.picUrl} />
                        </div>
                        <p className="grid-item-title">{m.name}</p>
                    </div>
                    </Link>
                ))}
            </Flex>
        </div>
    )
}



export default Recommend