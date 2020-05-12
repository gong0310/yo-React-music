import React from 'react'
import { List } from 'antd-mobile'
import './musiclist.scss'
import { GET_MUSIC } from '../../api'
const Item = List.Item;
const Brief = Item.Brief;

function MusicList(props) {
    function add(){
        fetch(GET_MUSIC(props.id))
            .then(res => res.json())
            .then( data => {
                let music={
                    id:props.id,
                    name:props.name,
                    artists:props.artists[0].name,
                    url:data.data[0].url,
                    picUrl:props.picUrl
                }
                props.addmusic(music)
            })
        
    }    
    return (
        <div className="music-list" onClick={add} data-id={props.id}>
            <List className="song-list">
                <Item multipleLine extra={<div className="play-btn"></div>}>
                    {props.name}{props.alias[0] && <span className="song-alias">({props.alias[0]})</span>}
                    <Brief>
                        {props.artists.map(artist => artist.name).join(' / ')} - {props.name}
                    </Brief>
                </Item>
            </List>
        </div>
    )
}

export default MusicList