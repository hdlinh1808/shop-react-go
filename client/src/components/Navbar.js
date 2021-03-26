import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom'
import "../authen/Authenticate"
import { isAuthenticated } from '../authen/Authenticate'
import { PATH_HOME } from "../pathname/Pathname"
import Cookies from 'js-cookies'
class Navbar extends Component {

    constructor(props) {
        super(props)

        let activeItem = '';
        if (this.props?.location?.state?.active) {
            activeItem = this.props.location.state.active;
        } else {
            activeItem = "";
        }

        this.state = {
            activeItem: activeItem,
            isAuthenticated: false,
        }
    }

    componentDidMount() {
        this.setState({
            isAuthenticated: isAuthenticated()
        })
    }

    componentWillReceiveProps(newProps) {
        let newActive = newProps?.location?.state?.active;
        if (newActive != this.state.activeItem) {
            this.setState({ activeItem: newActive })
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    logout() {
        fetch("/logout")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.error == 0 || result.error == -3) {
                    this.props.history.push(PATH_HOME)
                }
            })
    }

    render() {
        const { activeItem } = this.state;
        let rightMenu = !isAuthenticated() ? (<Menu.Menu position='right'>
            <Menu.Item as={Link}
                to={{ pathname: "/register", state: { active: "register" } }}
                name='register'
                active={activeItem === 'register'}
            />
            <Menu.Item as={Link}
                to={{ pathname: "/login", state: { active: "login" } }}
                name='login'
                active={activeItem === 'login'}
            />
        </Menu.Menu>) : (
                <Menu.Menu position='right'>
                    <Dropdown text='Cá nhân' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Header>hdlinh1808@gmail.com</Dropdown.Header>
                            <Dropdown.Item as={Link} to="/account">Thông tin cá nhân</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => this.logout()}>Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            )
        return (
            <div>
                <Menu style={{ marginTop: "20px" }} pointing secondary size='large'>
                    <Menu.Item as={Link}
                        to={{ pathname: "/", state: { active: "home" } }}
                        name='home'
                        active={activeItem === 'home'}
                    />
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                    />
                    <Menu.Item
                        name='friends'
                        active={activeItem === 'friends'}
                    />
                    <Menu.Item as={Link}
                        to={{ pathname: "/about", state: { active: "about" } }}
                        name='about'
                        active={activeItem === 'about'}
                    />
                    {rightMenu}
                </Menu>
            </div>
        )
    }
}

export default withRouter(Navbar)
// export default Navbar
