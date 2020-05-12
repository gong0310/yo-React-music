const url = "http://106.52.251.50:9527"
// 榜单id
export const newsong = 0
export const hotsong = 1

export const BANNER = () => url+'/banner'
// 推荐歌单
export const RECOMMEND_MUSIC = function (limit = 30) { return url + '/personalized?limit=' + limit }

// 推荐最新音乐
export const RECOMMEND_MEWSONG = () => url + '/personalized/newsong'

// 排行榜
export const RANK_LIST = function (idx = newsong) { return url + '/top/list?idx=' + idx }

// 热门搜索列表
export const SEARCH_HOT = () => url + '/search/hot'


// encodeURIComponent 解决特殊符号问题
// 搜素音乐/专辑/歌手/歌单/用户
export const SEARCH_KEYWORDS = function (keywords, limit = 30, type = 1) {
    return url + '/search?type=' + type + '&limit=' + limit + '&keywords=' + encodeURIComponent(keywords)
}

// 搜索建议
export const SEAERCH_SUGGEST = (keywords) => `${url}/search/suggest?keywords=${keywords}&type=mobile`

//获取歌单内列表
export const GET_PLAYLIST=(id)=>url + `/playlist/detail?id=${id}`

// 获取音乐
export const GET_MUSIC = (id) => `${url}/song/url?id=${id}`

// 音乐是否可用
export const CHECK_MUSIC = (id) => `${url}/check/music?id=${id}`

// 获取歌词
export const GET_LYRIC = (id) => `${url}/lyric?id=${id}`

// 获取歌曲详情
export const GET_MUSIC_DETAIL = (id) => `${url}/song/detail?ids=${id}`

//获取用户详情
export const GET_MINE = (id) => `${url}/user/detail?uid=${id}`

// 获取用户歌单
export const GET_MINE_DETAIL = (id) => `${url}/user/playlist?uid=${id}`

