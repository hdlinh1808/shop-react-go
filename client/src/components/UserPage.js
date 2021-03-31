import React, { Component } from 'react'
import { Container} from "semantic-ui-react";
import AppHeader from './AppHeader';
import AppBody from './AppBody';
import AppFooter from './AppFooter';

class UserPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <Container>
                    <AppHeader></AppHeader>
                    <AppBody></AppBody>
                </Container>
                <AppFooter></AppFooter>
            </div>
        )
    }
}

export default UserPage
