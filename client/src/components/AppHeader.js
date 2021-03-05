import React, { Component } from 'react'
import Navbar from './Navbar';
import { Grid } from "semantic-ui-react"
import { useHistory, useLocation } from 'react-router-dom'


class AppHeader extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <Grid.Row>
                <Navbar />
            </Grid.Row>
        )
    }
}

export default AppHeader
