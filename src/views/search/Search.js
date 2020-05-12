import React, { useState, useEffect } from 'react'
import { SearchBar } from 'antd-mobile';
import MusicList from '../../widget/musiclist/MusicList'
import { SEARCH_HOT, SEARCH_KEYWORDS, SEAERCH_SUGGEST } from '../../api'
import './search.scss'

function Search() {
    const [mySearchBar, setMySearchBar] = useState() // 搜索框ref
    const [hots, setHots] = useState([]) // 热搜数组
    const [keyword, setKeyword] = useState('') // 搜索输入框的文本内容
    const [songs, setSongs] = useState([])   // 搜索单曲    数组
    const [showSuggest, setShowSuggest] = useState(false) // 是否显示搜索建议列表
    const [suggest, setSuggest] = useState([]) // 推荐搜索列表数组
    // 取消fetch 控制器
    const [controller, setController] = useState(null)
    // 函数防抖的timer
    const [timer, setTimer] = useState(null)
    const [searchHistoryList, setHistory] = useState([])



    useEffect(() => {
        fetch(SEARCH_HOT())
            .then(res => res.json())
            .then(data => setHots(data.result.hots))
    }, [])



    // 用户输入时触发
    function onChangeHandel(val) {

        setKeyword(val) 

        val = val.trim()

        if (val && !showSuggest) { 
            // 显示推荐搜索列表
            setShowSuggest(true)
        }
        if (!val && showSuggest) { 
            // 隐藏推荐搜索列表
            setShowSuggest(false)
        }

        if (val) {
            // 获取相关推荐搜索关键字
            debunceGetSuggestList(val)
        }
    }


    // 获取相关推荐搜索关键字的方法
    function getSuggestList(val) {

        if (controller) {
            controller.abort()
        }
        let c = new AbortController()
        setController(c)
        fetch(SEAERCH_SUGGEST(val), { signal: c.signal })
            .then(res => res.json())
            .then(data => {
                setSuggest(data.result.allMatch)
            })
    }

    function debunceGetSuggestList(val) {
        if (!timer) {
            let t = setTimeout(() => {
                setTimer(null)
            }, 150)
            setTimer(t)
            getSuggestList(val)
        }
    }

    // 搜索栏获取光标    
    function onFocusHandel() {
        if (mySearchBar.inputRef.value && !showSuggest) {
            // 显示推荐搜索列表
            setShowSuggest(true)
            debunceGetSuggestList(mySearchBar.inputRef.value)
        }
    }

    // 选中热搜关键词
    function selectHotLabel(val) {
        setKeyword(val) // 异步
        searchKeywords(val.trim())
    }

    // 查询
    function searchKeywords(val) {
        setShowSuggest(false)
        if (val) {
            // 清空上次请求的数据
            setSongs([])
            fetch(SEARCH_KEYWORDS(val))
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setSongs(data.result.songs)
                })
                searchHistory(val)
        }
    }
    //搜索历史
    function searchHistory(val) {
        let history = localStorage.getItem("search_history");
        if (history) {
            history = JSON.parse(history);
            if (history.length >= 5) {
                history.splice(4, history.length - 4);
            }
        } else {
            history = [];
        }
        // 判断是否已经存在
        if (history.find(item => item === val)) {
            return
        } else {
            history.push(val)
            localStorage.setItem("search_history", JSON.stringify(history));
            setHistory(JSON.parse(localStorage.getItem("search_history")))
        }
    }

    function clearsearch() {
        let history = localStorage.getItem("search_history");
        if (history) {
            localStorage.removeItem("search_history");
            setHistory([''])    
        }

    }
    return (
        <div className="search-view">
            <SearchBar
                placeholder="搜索歌曲、歌手"
                className="search-music"
                value={keyword}
                onChange={onChangeHandel}
                onFocus={onFocusHandel}
                ref={el => setMySearchBar(el)}
            />
            {/*热门搜索标签*/}
            <div className={`search-hot ${keyword.trim() ? 'hidden' : ''}`}>
                <h3 className="search-hot-title">热门搜索</h3>
                {hots.map((h, i) => <div className="search-label" onClick={() => selectHotLabel(h.first)} key={i}>{h.first}</div>)}
                <h3 className="search-hot-title">搜索历史<span className='clearsearch-title' onClick={() => clearsearch()}>清空历史记录</span></h3>
                {searchHistoryList.map((h, i) => <div className="search-label" onClick={() => selectHotLabel(h)} key={i}>{h}</div>)}
            </div>
            {/*搜索结果列表*/}
            <div className={`search-hot ${(songs.length && keyword.trim()) && !showSuggest ? '' : 'hidden'}`}>
                <h3 className="search-hot-title">最佳匹配</h3>
                {songs.map(s => (
                    <MusicList key={s.id} id={s.id} picUrl={s.artists[0].img1v1Url} name={s.name} alias={s.alias} artists={s.artists} />
                ))}
            </div>
            {/*建议搜索*/}
            {
                showSuggest && (
                    <div className="suggest-list">
                        <p className="suggest-title" onClick={() => selectHotLabel(keyword)}>搜索“{keyword}” </p>
                        {
                            suggest && (
                                <ul>
                                    {suggest.map((s, i) => (
                                        <li className="suggest-list-item" key={i} onClick={() => selectHotLabel(s.keyword)}>
                                            <i className="search-icon" />
                                            <span className="search-text">{s.keyword}</span>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                )
            }

        </div>
    )
}

export default Search