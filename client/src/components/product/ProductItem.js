import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { GridColumn, Label } from 'semantic-ui-react'

const VERTICAL_IMAGE_CLASS = "image-vertical";
const HORIZONTAL_IMAGE_CLASS = "image-horizontal";
const SQUARE_IMAGE_CLASS = "image";

export class ProductItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            style: SQUARE_IMAGE_CLASS,
            loaded: false,
        }
    }


    onImgLoad(img) {
        let naturalHeight = img.naturalHeight;
        let naturalWidth = img.naturalWidth;
        let style = "";
        if (naturalWidth > naturalHeight) {
            style = HORIZONTAL_IMAGE_CLASS;
        } else if (naturalHeight > naturalWidth) {
            style = VERTICAL_IMAGE_CLASS;
        } else {
            style = SQUARE_IMAGE_CLASS;
        }

        this.setState({
            style: style,
        }, () => {
            this.setState({
                loaded: true,
            })
        })
    }

    render() {
        return (
            <GridColumn className="item-wrapper" to="/product/detail/producttest">
                <div className="item">
                    <div className="image-wrapper">
                        <img className={this.state.style} src={this.props.imgUrl} onLoad={(e) => this.onImgLoad(e.target)}
                            style={{ display: !this.state.loaded ? "none" : "inherit" }}
                        />
                    </div>
                    
                    <div className="item-footer">
                        <div className="product-info">
                            <Label color='pink' className="sale">
                                -20%
                        </Label>
                        </div>

                        <div className="price-wrapper">
                            <Label.Group tag>
                                <Label as='a' className="price origin">$10.00</Label>
                                <Label as='a' className="price" color="blue">$19.99</Label>
                            </Label.Group>
                        </div>
                    </div>

                </div>
            </GridColumn>
        )
    }
}

export default ProductItem
