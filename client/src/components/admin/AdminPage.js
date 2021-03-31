import React, { Component } from 'react'
import { Menu, Header, Image, Grid, Sidebar, Segment, Container } from 'semantic-ui-react'
import AdminSidebar from './AdminSidebar'
import AdminBody from './AdminBody'
import "../../styles/semantic-custom.css"
import "../../styles/admin.css"

export class AdminPage extends Component {
    render() {
        return (
            <div className="admin">
                <Grid className="no-margin">
                    <Grid.Row className="no-padding">
                        <Grid.Column stretched computer={2} className="no-padding sidebar-wrapper">
                            <AdminSidebar />
                        </Grid.Column>
                        <Grid.Column stretched computer={14} className="no-padding">
                            <AdminBody/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
             </div>

        )
    }
}

export default AdminPage
