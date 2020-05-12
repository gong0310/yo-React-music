import React, { useEffect, useState } from 'react'
import MusicList from '../../containers/ContainerMusic'
import { hotsong, RANK_LIST } from '../../api'
import './hot.scss'

function addZero(num) {
    return num >= 10 ? num : '0' + num
}

function Hot() {
    const [date] = useState(new Date())
    const [song, setSong] = useState([]) // 完整歌单
    const [index, setIndex] = useState(20) 
    useEffect(() => {
        console.log(RANK_LIST(hotsong))
        fetch(RANK_LIST(hotsong))
            .then(res => res.json())
            .then(data => {
                setSong(data.playlist.tracks)
            })
    }, [])
    //加载更多
   function more(){
    setIndex(index+10-0)
    }
    return (
        <div className="hot-music">
            <div className="hot-music-top">
                <div className="hot-muisc-logo"></div>
                <div className="hot-muisc-update"> 更新日期: {addZero(date.getMonth() + 1)}月{addZero(date.getDate())}日</div>
            </div>
             {song.slice(0,index).map((s, i) => (
                <div key={s.id} className="hot-music-list">
                    <div className="hot-music-rank">{i + 1 >= 10 ? i + 1 : '0' + (i + 1)}</div> <MusicList id={s.id}  picUrl={s.al.picUrl} name={s.name} alias={s.alia} artists={s.ar} />
                </div>
            ))}
            <p onClick={()=>more()}>查看更多</p>
        </div>
    )
}

export default Hot