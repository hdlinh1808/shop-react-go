import React, { Component } from 'react'

import "../../styles/product-detail.css"
import { Grid, GridColumn, Label, Input, Button, Icon } from 'semantic-ui-react';
import DirectionImage from '../DirectionImage';
class ProductDetail extends Component {

    constructor(props) {
        super(props)

        let id = this.props.match.params?.id;

        this.state = {
            id: id,
            itemInfo: {},
            imageSrc: [],
            mainImageSrc: "",
            buyNumber: 1,
        }
    }

    setItemInfo(itemInfo) {
        this.setState({
            itemInfo: itemInfo,
            mainImageIndex: 0,
            imageSrc: [
                itemInfo?.image,
                "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
                "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
                "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",

            ],
        }, () => {
            console.log(this.state.itemInfo.image)
        })
    }

    componentDidMount() {
        this.fetchItemInfo();
    }

    fetchItemInfo() {
        fetch(`https://fakestoreapi.com/products/${this.state.id}`)
            .then(response => response.json())
            .then(result => this.setItemInfo(result));
    }

    changeMainImage(index) {
        this.setState({ mainImageIndex: index })
    }

    handleButtonBuyNumberClick(changeNumber) {
        let newValue = this.state.buyNumber + changeNumber;
        this.changeBuyNumber(newValue)
    }

    handleBuyNumberChange(e, target) {
        let value = target?.value;
        this.changeBuyNumber(value);
    }

    changeBuyNumber(value) {
        if (value < 1) {
            value = 1;
        }
        this.setState({
            buyNumber: value,
        })
    }

    render() {
        let mainImageIndex = this.state.mainImageIndex;
        let listImages = this.state.imageSrc.map((src, index) => {
            return (
                <Grid.Column className="child-image-wrapper" mobile={8} computer={3} key={index}>
                    <div className={"child-image" + (index == mainImageIndex ? " active" : "")} onClick={() => this.changeMainImage(index)}>
                        <DirectionImage imgSrc={src}></DirectionImage>
                    </div>
                </Grid.Column>
            )
        });

        let mainImage = this.state.imageSrc[this.state.mainImageIndex];
        return (
            <div className='item-container'>
                {/* {JSON.stringify(this.state.itemInfo)} */}
                <Grid>
                    <Grid.Column mobile={16} computer={8}>
                        <div className="main-image">
                            <DirectionImage imgSrc={mainImage}></DirectionImage>
                        </div>
                        <Grid>
                            {listImages}
                        </Grid>
                    </Grid.Column>
                    <GridColumn mobile={16} computer={8}>
                        <div className="product-name">{this.state.itemInfo.title}</div>
                        <div className="category">
                            <Label as='a' color='teal' tag>
                                {this.state.itemInfo.category}
                            </Label>
                        </div>
                        <div className="price-wrapper">
                            <span className="origin-price">100 đ</span>
                            <span className="sale-price">{this.state.itemInfo.price}</span>
                        </div>
                        <div className="description">
                            <h3>Description: </h3>
                            <p className="content">{this.state.itemInfo.description}</p>
                        </div>

                        <div className="buy-wrapper">
                            <h4>Số lượng</h4>
                            <div>
                                <Input type='number' value={this.state.buyNumber} className='number' onChange={(e, target) => this.handleBuyNumberChange(e, target)}>
                                    <Button icon='minus' basic className='btn-control left' onClick={() => this.handleButtonBuyNumberClick(-1)}></Button>
                                    <input />
                                    <Button icon='plus' basic className='btn-control right' onClick={() => this.handleButtonBuyNumberClick(1)}></Button>
                                </Input>
                            </div>

                            <div className="btn-buy-wrapper">
                                <Button animated='fade' primary size='large'>
                                    <Button.Content visible className="text">Đặt mua</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='shop' />
                                    </Button.Content>
                                </Button>
                            </div>

                        </div>
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}

export default ProductDetail
