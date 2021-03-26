import React, { Component } from 'react'
import { getUser } from '../../authen/Authenticate'
import { Grid, Header, Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export class Account extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isUpdate: false
        }
    }

    componentDidMount() {
        getUser()
            .then(data => {
                this.setState({
                    user: data?.data
                })
            })
    }

    validateName(value) {
        if (value == null || value == "") {
            return "Vui lòng nhập họ và tên!";
        } else if (value.length < 5 || value.length > 50) {
            return "Họ và tên yêu cầu từ 5 đến 50 kí tự."
        }

        return null;
    }

    update() {
        if (!this.state.isUpdate) {
            this.setState({
                isUpdate: true,
            })
        }
    }

    render() {
        let validateName = this.validateName(this.state.user?.name)
        let error = validateName && this.state.isUpdate ? { content: validateName } : null
        return (
            <Grid verticalAlign='middle' textAlign="center" style={{ marginTop: "20px" }}>
                <Grid.Column mobile={16} tablet={16} computer={8} >
                    <Header as='h2'>
                        Thông tin cá nhân
                    </Header>

                    <Form size="small" style={{ textAlign: "left" }}>
                        <Form.Input
                            label="Họ và tên"
                            value={this.state.user?.name ? this.state.user.name : ""}
                            onChange={(e) => this.setState({ user: { ...this.state.user, name: e.target.value } })}
                            error={error}
                        />

                        <Form.Input
                            label="Email"
                            value={this.state.user?.email ? this.state.user.email : ""}
                            readOnly
                        />

                        <Form.Input
                            type="number"
                            label="Số điện thoại"
                            value={this.state.user?.phone ? this.state.user.phone : ""}
                            onChange={(e) => this.setState({ user: { ...this.state.user, phone: e.target.value } })}
                        />

                        <div className="form-footer">
                            <Button color='black' size='large'  onClick={() => this.update()} >
                                <Icon name='edit outline'/> Cập nhật
                            </Button>

                            <Button color='black' size='large'
                            as={Link} to="/account/address"
                            >
                                <Icon name='address card' /> Sổ địa chỉ
                            </Button>
                        </div>

                    </Form>

                </Grid.Column>
            </Grid>
        )
    }
}

export default Account
