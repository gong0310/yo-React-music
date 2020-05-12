import React from 'react';
import { Tabs } from 'antd-mobile';
import Hot from '../hot/Hot'
import Recommend from '../recommend/Recommend'
import Mine from '../my/My'
import Search from '../search/Search'
import './home.scss'

const tabs = [
  { title: '推荐音乐' },
  { title: '热歌榜'},
  { title: '搜索'},
  { title: '我的'},
];

function Home() {
  return (
    <div className="Home">
      <Tabs tabs={tabs}
        initialPage={0}
        animated={true}
        tabBarUnderlineStyle={{ borderColor: 'rgb(240,20,20)' }}
        tabBarActiveTextColor='rgb(240,20,20)'
        swipeable={false}
      >
        <Recommend />
        <Hot />
        <Search />
        <Mine/>
      </Tabs>    
    </div>
  );
}

export default Home;
