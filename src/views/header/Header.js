import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react'
import { BANNER } from '../../api'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            imgHeight: 176,
        }
    }
    componentDidMount() {
        fetch(BANNER())
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.banners,
                });
            })
    }
    render() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    autoplayInterval={2000}
                    infinite
                >
                    {this.state.data.map(val => (
                        <img
                            key={val}
                            src={val.imageUrl}
                            alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        />
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}
export default Header