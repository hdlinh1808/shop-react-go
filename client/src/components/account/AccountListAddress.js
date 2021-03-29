import React, { Component, Fragment } from 'react'
import { Grid, Header, Button, Icon, Divider, Message } from 'semantic-ui-react'
import ModalAddress from './ModalAddress';


export class AccountAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            addresses: [{ type: "home", "addr": "VNG Campus Lô Z.06 Đường 13, Khu Chế Xuất Tân Thuận, Phường Tân Thuận Đông, Quận 7, Hồ Chí Minh" }],
            updateAddress: null,
            updateAddressIndex: -1,
        }
    }


    closeModal() {
        this.setState({
            open: false,
            updateAddress: null,
            updateAddressIndex: -1,
        })
    }

    openModal() {
        this.setState({
            open: true,
        })
    }

    genNewAddress() {
        return {
            addr: "",
            type: "home",
        }
    }

    updateAddresses(address) {

        if (this.state.updateAddressIndex >= -1 && this.state.updateAddress) { //update
            let addresses = [...this.state.addresses]
            let index = this.state.updateAddressIndex
            if (index < addresses.length) {
                addresses[index] = address;
                this.setState({
                    addresses: addresses
                })
            }

            return;
        }

        //add new Address
        this.setState({
            addresses: [...this.state.addresses, address]
        })
    }

    removeAddress(index) {
        if (index < 0) {
            return;
        }
        let addresses = [...this.state.addresses];
        addresses.splice(index, 1)
        this.setState({
            addresses: addresses,
        })
    }

    changeAddress(address, index) {
        this.setState({
            updateAddress: address,
            updateAddressIndex: index,
            open: true,
        })
    }

    render() {
        let addresses = this.state.addresses.map((address, index) =>
            (<Message style={{ fontSize: "12px" }} icon key={index}>
                <Message.Content>
                    <Message.Header>{address.type == "home" ? "Nhà riêng" : "công ti"}</Message.Header>
                    {address.addr}
                </Message.Content>
                <Button icon style={{ fontSize: "12px" }} basic color="teal" onClick={() => this.changeAddress(address, index)}>
                    <Icon name='edit' />
                </Button>

                <Button icon style={{ fontSize: "12px" }} basic color="red" onClick={() => this.removeAddress(index)}>
                    <Icon name='trash alternate' />
                </Button>
            </Message>)
        )
        return (
            <Grid verticalAlign='middle' textAlign="center" style={{ marginTop: "20px" }}>
                <Grid.Column mobile={16} tablet={16} computer={12} textAlign="left">
                    <Header as='h2'>
                        Sổ địa chỉ
                    </Header>

                    <Button color="black" onClick={() => this.openModal()}>
                        <Icon name='plus' /> Thêm địa chỉ mới
                    </Button>
                    <Divider></Divider>
                    {addresses}

                    <ModalAddress open={this.state.open} closeModal={() => this.closeModal()} type={this.state.type} updateAddress={(address) => this.updateAddresses(address)}
                        address={this.state.updateAddress} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default AccountAddress
