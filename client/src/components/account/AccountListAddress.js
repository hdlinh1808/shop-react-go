import React, { Component } from 'react'
import { Grid, Header, Button, Icon, Divider, Card, Segment } from 'semantic-ui-react'

export class AccountAddress extends Component {
    render() {
        return (
            <Grid verticalAlign='middle' textAlign="center" style={{ marginTop: "20px" }}>
                <Grid.Column mobile={16} tablet={16} computer={10} textAlign="left">
                    <Header as='h2'>
                        Sổ địa chỉ
                    </Header>

                    <Button color="black">
                        <Icon name='plus' /> Thêm địa chỉ mới
                    </Button>

                    <Divider></Divider>

                    <Segment placeholder>

                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default AccountAddress
