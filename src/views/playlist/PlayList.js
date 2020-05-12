import React, { useEffect, useState } from 'react'
import { useParams ,useHistory} from 'react-router-dom'
import "./playlist.scss"
import { GET_PLAYLIST } from '../../api'
import MusicList from '../../containers/ContainerMusic'
import { Icon } from 'antd-mobile';
function PlayList() {
    const params = useParams()
    const histoty = useHistory()
    const [songList, setSongList] = useState([])
    const [name, setName] = useState([])
    useEffect(() => {
        window.scrollTo(0,0)
        fetch(GET_PLAYLIST(params.id))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setName(data.playlist.name)
                setSongList(data.playlist.tracks.slice(0, 20))
            })
    },[params])
    function goback(){
        histoty.go(-1)
    }
    return (
        <div className='playlist'>
            <div className='header'><Icon type='left' className='icon' onClick={()=>goback()} /><span>{name}</span></div>
            {songList.map(s => (
                <MusicList key={s.id} id={s.id} picUrl={s.al.picUrl} name={s.name} alias={s.alia} artists={s.ar} />
            ))}
        </div>
    )
}
export default PlayList