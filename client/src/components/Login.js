import React, { Component } from 'react'
import { Grid, Header, Image, Form, Segment, Button, Message, Label } from 'semantic-ui-react'
import "../styles/login.css"
import { Link, Redirect, withRouter } from 'react-router-dom'
import { PATH_HOME } from "../pathname/Pathname"
import { isAuthenticated } from '../authen/Authenticate'
export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            onValidate: false,
            isClicked: false,
        }


        if (isAuthenticated()) {
            this.props.history.push(PATH_HOME)
        }
    }

    componentDidMount() {
        this.setState({
            isClicked: false,
        })
    }

    login() {
        this.setState({
            isClicked: true,
        })

        let data = {
            email: this.state.email,
            password: this.state.password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }


        fetch('/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error >= 0) {
                    this.props.history.push(PATH_HOME)
                }
            })
    }

    render() {
        let errorEmail = this.state.email == "" && this.state.isClicked ? {content: "Email không hợp lệ!"} : null
        let errorPassword = this.state.password == "" && this.state.isClicked ? {content: "Password không được để trống"} : null
        return (
            <Grid textAlign='center' verticalAlign='middle' className="login-form-wrapper">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='black' textAlign='center'>
                        {/* <Image src='/logo.png' />  */}
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e, data) => this.setState({ email: data?.value })}
                                error={errorEmail}
                            />
                            <Form.Input onChange={(e, data) => this.setState({ password: data?.value })}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                error={errorPassword}
                            />

                            <Button color='black' fluid size='large' onClick={() => this.login()}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to={{ pathname: "/register", state: { active: "register" } }}>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default withRouter(Login)
