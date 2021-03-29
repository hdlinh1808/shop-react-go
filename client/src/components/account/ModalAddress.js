import React, { Component } from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'

const sortOptions = [{ key: 'new', value: 'new', text: 'New' },
{ key: 'popular', value: 'popular', text: 'Popular' },
{ key: 'price_desc', value: 'price_desc', text: 'Price (desc)' },
{ key: 'price_asc', value: 'price_asc', text: 'Price (asc)' }];

export class ModalAddress extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: props.open,
            address: this.genNewAddress(),
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.open,
        })
        if (props.address) {
            this.setState({
                address: props.address
            })
        }
    }

    genNewAddress() {
        return {
            addr: "",
            type: "home",
        }
    }


    setNewAddress() {
        this.setState({
            address: this.genNewAddress(),
        })
    }

    update() {
        this.props.updateAddress(this.state.address)
        this.props.closeModal()
        this.setNewAddress();
    }

    close() {
        this.props.closeModal();
        this.setNewAddress();
    }

    // changeType
    render() {
        return (
            <Modal size="small" open={this.state.open}>
                <Modal.Header>Thêm một địa chỉ</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Dropdown selection
                            label="Tỉnh / Thành phố"
                            placeholder="Tỉnh / Thành phố"
                            options={sortOptions}
                        />
                        <Form.Dropdown selection
                            label="Quận / Huyện"
                            placeholder="Quận / Huyện"
                            options={sortOptions}
                        />
                        <Form.Dropdown selection
                            label="Phường xã"
                            placeholder="Phường xã"
                            options={sortOptions}
                        />
                        <Form.TextArea
                            label="Địa chỉ" value={this.state.address?.addr} onChange={(e) => this.setState({ address: { ...this.state.address, addr: e.target.value } })}
                        />

                        <Form.Group inline>
                            <label>Loại địa chỉ</label>
                            <Form.Radio
                                label="Nhà riêng / Chung cư"
                                name="radioType"
                                checked={this.state.address.type === 'home'}
                                onChange={() => this.setState({ address: { ...this.state.address, type: "home" } })}
                            />
                            <Form.Radio
                                label="Cơ quan / Công ty"
                                name="radioType"
                                checked={this.state.address.type === 'work'}
                                onChange={() => this.setState({ address: { ...this.state.address, type: "work" } })}
                            />
                        </Form.Group>
                        <Form.Checkbox label='Đặt làm địa chỉ mặc định' />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => this.close()}>
                        Hủy
                            </Button>
                    <Button positive onClick={() => this.update()}>
                        Cập nhật
                            </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ModalAddress
