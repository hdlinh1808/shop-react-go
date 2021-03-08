import React, { Component } from 'react'

import "../../styles/product-detail.css"
import { Grid, GridColumn } from 'semantic-ui-react';
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

    render() {
        let index = 0;
        let mainImageIndex = this.state.mainImageIndex;
        let listImages = this.state.imageSrc.map(src =>
            <Grid.Column className="child-image-wrapper" mobile={8} computer={3} key={index++}>
                <div className={"child-image" + (index == mainImageIndex ? " active" : "")}>
                    <DirectionImage imgSrc={src}></DirectionImage>
                </div>
            </Grid.Column>);

        let mainImage = this.state.imageSrc[this.state.mainImageIndex];
        return (

            <div className='item-container'>
                {JSON.stringify(this.state.itemInfo)}
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
                        This is test column
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}

export default ProductDetail
