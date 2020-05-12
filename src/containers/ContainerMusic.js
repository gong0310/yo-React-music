import {connect} from 'react-redux'
import MusicList from '../widget/musiclist/MusicList'
import {addmusic} from '../actions/index'
const mapStateToProps=(state,ownProps)=>{
    return{
        music:state,
        test:state+ownProps
    }
}
const mapDispatchToProps = {
    addmusic
}
export default connect(mapStateToProps,mapDispatchToProps)(MusicList)