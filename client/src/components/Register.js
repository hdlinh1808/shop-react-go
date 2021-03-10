import React, { Component } from 'react'
import { Grid, Form, Header, Icon, Label, Dropdown, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import "../styles/register.css"
const genderOptions = [
    { key: 'male', value: 'male', text: 'Male' },
    { key: 'female', value: 'female', text: 'Female' },
    { key: 'other', value: 'other', text: 'Other' },
]
export class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            gender: 'male',
            birthday: new Date(),
            name: { valid: true, value: "", error: null },
            email: { valid: true, value: "", error: null },
            password: { valid: true, value: "", error: null },
            repassword: { valid: true, value: "", error: null },
            isClickRegister: false,
        }

    }

    componentDidMount() {
        this.setState({
            isClickRegister: false,
        })

        this.handleNameInputChange({ target: { value: "" } })
        this.handleEmailInputChange({ target: { value: "" } })
        this.handlePasswordInputChange({ target: { value: "" } })
        // this.handleRepasswordInputChange({ target: { value: "" } })
    }

    changeBirthday(date) {
        if (date == this.state.birthday) {
            return;
        }
        this.setState({
            birthday: date,
        })
    }

    handleNameInputChange(e) {
        let value = e.target.value;
        let valid = true;
        let error = null;
        if (value == "") {
            valid = false;
            error = "Vui lòng nhập họ và tên!";
        } else if (value.length < 5 || value.length > 50) {
            valid = false;
            error = "Họ và tên yêu cầu từ 5 đến 50 kí tự."
        }

        this.setState({
            name: { valid: valid, value: value, error: error },
        })
    }

    handleEmailInputChange(e) {
        let value = e.target.value;
        let valid = true;
        let error = null;
        if (value == "") {
            valid = false;
            error = "Vui lòng nhập Email!";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            valid = false;
            error = "Email không hợp lệ."
        }
        else if (value.length < 5 || value.length > 255) {
            valid = false;
            error = "Email yêu cầu từ 5 đến 255 kí tự."
        }

        this.setState({
            email: { valid: valid, value: value, error: error },
        })
    }

    handlePasswordInputChange(e) {
        let value = e.target.value;
        let valid = true;
        let error = null;
        if (value == "") {
            valid = false;
            error = "Vui lòng nhập mật khẩu!";
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(value)) {
            valid = false;
            error = "Mật khẩu không hợp lệ. Mật khẩu yêu cầu ít nhất 8 kí tự, bắt buộc có chữ thường, chữ hoa và số!"
        }
        
        this.setState({
            password: { valid: valid, value: value, error: error },
        }, () => {
            // console.log(this.state.repassword)
            this.handleRepasswordInputChange({target: {value: this.state.repassword.value}});
        })
    }

    handleRepasswordInputChange(e) {
        let value = e.target.value;
        let valid = true;
        let error = null;
        if (value == "") {
            valid = false;
            error = "Không được bỏ trống!";
        } else if (value != this.state.password.value) {
            valid = false;
            error = "Không khớp với mật khẩu"
        }
        this.setState({
            repassword: { valid: valid, value: value, error: error },
        })
    }

    handleGenderChange({ value }) {
        this.setState({
            gender: value,
        })
    }

    submitRegister() {
        this.setState({
            isClickRegister: true,
        })

        let data = {
            name: this.state.name.value,
            email: this.state.email.value,
            password: this.state.password.value,
            gender: this.state.gender,
            birthday: this.state.birthday,
        }

        console.log(data);
    }

    render() {
        return (
            <Grid className="register-wrapper">
                <Grid.Column computer={4}></Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                    <Header as='h2' icon>
                        <Icon name='address card' />
                            Đăng kí tài khoản
                            <Header.Subheader>
                            Đăng kí tài khoản để bắt đầu mua hàng
                            </Header.Subheader>
                    </Header>
                    <Form className="register-form">
                        <Form.Field error={!this.state.name?.valid && this.state.isClickRegister}>
                            <label>Họ và tên<span className="required" /></label>
                            <input placeholder='Họ và tên' onChange={(e) => this.handleNameInputChange(e)} value={this.state.name?.value} />
                            <Label pointing prompt style={{ display: !this.state.name?.valid && this.state.isClickRegister ? "" : "none" }}>{this.state.name?.error}</Label>
                        </Form.Field>
                        <Form.Field error={!this.state.email?.valid && this.state.isClickRegister}>
                            <label>Email<span className="required" /></label>
                            <input placeholder='Email' type="email" onChange={(e) => this.handleEmailInputChange(e)} value={this.state.email?.value} />
                            <Label pointing prompt style={{ display: !this.state.email?.valid && this.state.isClickRegister ? "" : "none" }}>{this.state.email?.error}</Label>
                        </Form.Field>
                        <Form.Field error={!this.state.password?.valid && this.state.isClickRegister}>
                            <label>Mật khẩu<span className="required" /></label>
                            <input placeholder='Password' type="password" onChange={(e) => this.handlePasswordInputChange(e)} value={this.state.password?.value} />
                            <Label pointing prompt style={{ display: !this.state.password?.valid && this.state.isClickRegister ? "" : "none" }}>{this.state.password?.error}</Label>
                        </Form.Field>
                        <Form.Field error={!this.state.repassword?.valid && this.state.isClickRegister}>
                            <label>Nhập lại mật khẩu<span className="required" /></label>
                            <input placeholder='Password' type="password" onChange={(e) => this.handleRepasswordInputChange(e)} value={this.state.repassword?.value} />
                            <Label pointing prompt style={{ display: !this.state.repassword?.valid && this.state.isClickRegister ? "" : "none" }}>{this.state.repassword?.error}</Label>
                        </Form.Field>
                        <Form.Field>
                            <label>Giới tính<span className="required" /></label>
                            <Dropdown selection placeholder='' options={genderOptions}
                                onChange={(e, data) => this.handleGenderChange(data)}
                                defaultValue={this.state.gender} />
                        </Form.Field>
                        <Form.Field className="date-picker">
                            <label>Ngày sinh<span className="required" /></label>
                            <SemanticDatepicker clearable={false} onChange={(e, data) => { this.changeBirthday(data.value) }}
                                format="DD-MM-YYYY"
                                value={this.state.birthday}
                            ></SemanticDatepicker>
                        </Form.Field>
                        <div className="form-footer">
                            <Button type="submit" size='large' color='blue' onClick={() => this.submitRegister()}>
                                <Icon name='address card' /> Register
                            </Button>
                        </div>
                    </Form>

                </Grid.Column>
            </Grid>
        )
    }
}

export default Register
