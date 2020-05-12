import {connect} from 'react-redux'
import Foot from '../views/foot/Foot'
import {toggle,playedSeconds,clearindex} from '../actions/index'

const mapStateToProps=(state,ownProps)=>{
    return{
        music:state,
        test:state+ownProps
    }
}
const mapDispatchToProps = {
    toggle,
    playedSeconds,
    clearindex
}
export default connect(mapStateToProps,mapDispatchToProps)(Foot)