import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import { withRouter } from 'react-router-dom'
class Navbar extends Component {

    constructor(props) {
        super(props)

        let activeItem = '';
        if(this.props?.location?.state?.active){
            activeItem = this.props.location.state.active;
        }else {
            activeItem = "home";
        }
        
        this.state = {
            activeItem: activeItem,
        }
    }

    componentWillMount(){

    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Menu style={{ marginTop: "20px" }} pointing secondary size='large'>
                    <Menu.Item as={Link}
                        to={{pathname: "/" , state: {active: "home"} }}
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='friends'
                        active={activeItem === 'friends'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link}
                         to={{pathname: "/about" , state: {active: "about"} }}
                        name='about'
                        active={activeItem === 'about'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link}
                            to="/login"
                            name='login'
                            active={activeItem === 'logout'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default withRouter(Navbar)
// export default Navbar
