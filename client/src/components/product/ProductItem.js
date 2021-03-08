import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { GridColumn, Label } from 'semantic-ui-react'
import StyledContentLoader from 'styled-content-loader';
import ContentLoader from 'react-content-loader';

import "../../styles/img.css"
import DirectionImage from '../DirectionImage';

export class ProductItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const item = this.props.item
        return (
            <GridColumn as={Link} className="item-wrapper" to={`/product/${item.id}`}>
                <div className="item">
                    <DirectionImage imgSrc={item.image}></DirectionImage>

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
