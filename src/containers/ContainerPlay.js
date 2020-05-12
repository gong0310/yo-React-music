import {connect} from 'react-redux'
import PlayerView from '../views/playerview/PlayerView'
import {playedSeconds} from '../actions/index'
const mapStateToProps=(state,ownProps)=>{
    return{
        music:state,
        test:state+ownProps
    }
}
const mapDispatchToProps = {
    playedSeconds
}
export default connect(mapStateToProps,mapDispatchToProps)(PlayerView)