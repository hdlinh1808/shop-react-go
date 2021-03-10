import React, { Component } from 'react'
import "../styles/footer.css"
import { Container, Grid, Item, Feed, Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const necessaryInfo = [
    { title: "Giới thiệu shop", to: { pathname: "/about", state: { active: "about" } } },
    { title: "Chính sách bảo mật thông tin" },
    { title: "Hướng dẫn đặt hàng" },
    { title: "Phương thức đổi trả" },
    { title: "Phương thức vận chuyển" },
]

class AppFooter extends Component {
    render() {
        let necessaryInfoList = necessaryInfo.map((info, index) =>
            <List.Item as={Link} to={info.to ? info.to : ""} key={index}>
                <Icon name='right triangle' />
                <List.Content>
                    <List.Description>
                        {info.title}
                    </List.Description>
                </List.Content>
            </List.Item>)

        return (
            <div className="footer">
                <Container>
                    <Grid>
                        <Grid.Column tablet={16} computer={6}>
                            <div className="title">
                                Thông tin liên hệ
                            </div>
                            <List relaxed>
                                <List.Item>
                                    <List.Icon name='address book' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>Địa chỉ</List.Header>
                                        <List.Description>146A Phan Văn Trị, phường 12, quận Bình Thạnh, TP.HCM.</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='phone square' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>Số điện thoại</List.Header>
                                        <List.Description>028 3841 0316</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='mail outline' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>Email</List.Header>
                                        <List.Description>takishop2012@gmail.com</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='clock outline' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>Thời gian làm việc</List.Header>
                                        <List.Description>Tất cả các ngày trong tuần / 9:00 AM - 8:00 PM</List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column tablet={16} computer={5}>
                            <div className="title">
                                Thông tin cần biết
                            </div>
                            <List divided relaxed>
                                {necessaryInfoList}
                            </List>
                        </Grid.Column>

                    </Grid>

                </Container>
            </div>
        )
    }
}

export default AppFooter
