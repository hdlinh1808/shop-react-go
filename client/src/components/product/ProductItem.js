import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { GridColumn, Label } from 'semantic-ui-react'
import StyledContentLoader from 'styled-content-loader';
import ContentLoader from 'react-content-loader';

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
        const item = this.props.item
        return (
            <GridColumn as={Link} className="item-wrapper" to={`/product/${item.id}`}>
                <div className="item">
                    <div className="image-wrapper">
                        <img className={this.state.style} src={item.image} onLoad={(e) => this.onImgLoad(e.target)}
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
                                <Label className="price origin">$10.00</Label>
                                <Label className="price" color="blue">${item.price}</Label>
                            </Label.Group>
                        </div>

                        <div className="title">
                            {item.title}
                        </div>

                    </div>
                </div>
            </GridColumn>
        )
    }
}

export default ProductItem
