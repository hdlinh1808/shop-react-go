import React, { Component } from 'react'

import "../../styles/product-detail.css"
import { Grid, GridColumn, Label, Input, Button, Icon } from 'semantic-ui-react';
import DirectionImage from '../DirectionImage';
import ContentLoader from 'react-content-loader';

const getContentDetailLoader = () => (
    <ContentLoader viewBox="0 0 550 550">
        {/* Only SVG shapes */}
        <rect x="0" y="20" rx="5" ry="5" width="400" height="30" />
        <rect x="0" y="70" rx="5" ry="5" width="150" height="26" />
        <rect x="0" y="111" rx="5" ry="5" width="170" height="23" />
        <rect x="0" y="151" rx="5" ry="5" width="160" height="23" />
        <rect x="0" y="195" rx="2" ry="2" width="500" height="15" />
        <rect x="0" y="217" rx="2" ry="2" width="500" height="15" />
        <rect x="0" y="239" rx="2" ry="2" width="500" height="15" />
        <rect x="0" y="261" rx="2" ry="2" width="500" height="15" />
        <rect x="0" y="283" rx="2" ry="2" width="200" height="15" />
        <rect x="0" y="330" rx="2" ry="2" width="100" height="19" />
        <rect x="0" y="363" rx="2" ry="2" width="150" height="37" />
        <rect x="0" y="430" rx="2" ry="2" width="120" height="45" />
    </ContentLoader>
)

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
            loaded: false,
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
            loaded: true,
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

    getContentInfo() {
        return (<div className="content">
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
        </div>);
    }

    render() {
        let mainImageIndex = this.state.mainImageIndex;
        let listImages = this.state.imageSrc.map((src, index) => {
            return (
                <Grid.Column className="child-image-wrapper" mobile={8} computer={3} key={index}>
                    <div className={"child-image" + (index == mainImageIndex ? " active" : "")} onClick={() => this.changeMainImage(index)}>
                        <DirectionImage imgSrc={src} loaded></DirectionImage>
                    </div>
                </Grid.Column>
            )
        });

        let mainImage = this.state.imageSrc[this.state.mainImageIndex];
        let content = null;

        if (this.state.loaded) {
            content = this.getContentInfo();
        } else {
            content = getContentDetailLoader();
        }

        return (
            <div className='item-detail-container'>
                <Grid>
                    <Grid.Column mobile={16} computer={8}>
                        <div className="main-image">
                            <DirectionImage imgSrc={mainImage} loaded={true}></DirectionImage>
                        </div>
                        <Grid>
                            {listImages}
                        </Grid>
                    </Grid.Column>
                    <GridColumn mobile={16} computer={8}>   
                        {content}
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}

export default ProductDetail
