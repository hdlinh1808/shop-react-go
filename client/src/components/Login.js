import React, { Component } from 'react'
import { Grid, Header, Image, Form, Segment, Button, Message } from 'semantic-ui-react'
import "../styles/login.css"
import { Link } from 'react-router-dom'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }


    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className="login-form-wrapper">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='black' textAlign='center'>
                        {/* <Image src='/logo.png' />  */}
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e, data) => this.setState({ email: data?.value })} />
                            <Form.Input onChange={(e, data) => this.setState({ password: data?.value })}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='black' fluid size='large'>
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

export default Login
