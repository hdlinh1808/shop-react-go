import React, { Component } from 'react'
import Navbar from './Navbar';
import { Grid } from "semantic-ui-react";
class AppHeader extends Component {
    render() {
        return (
            <Grid.Row>
                <Navbar />
            </Grid.Row>
        )
    }
}

export default AppHeader
