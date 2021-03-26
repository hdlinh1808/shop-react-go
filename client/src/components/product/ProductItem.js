import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { GridColumn, Label } from 'semantic-ui-react'
import ContentLoader from 'react-content-loader';

import "../../styles/img.css"
import DirectionImage from '../DirectionImage';

const getItemLoader = () => (
    <ContentLoader viewBox="0 0 400 635">
        {/* Only SVG shapes */}
        <rect x="3" y="3" rx="5" ry="5" width="393" height="393" />
        <rect x="8" y="424" rx="5" ry="5" width="64" height="41.5" />
        <rect x="8" y="480" rx="5" ry="5" width="130" height="51.2" />
        <rect x="150" y="480" rx="5" ry="5" width="130" height="51.2" />
        <rect x="8" y="544" rx="5" ry="5" width="390" height="51.2" />
    </ContentLoader>
)

export class ProductItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const item = this.props.item
        if (item == null) {
            return (
                <GridColumn className="item-wrapper">
                    {getItemLoader()}
                </GridColumn>
            )
        }
        return (
            <GridColumn as={Link} className="item-wrapper" to={`/product/${item.id}`}>
                <div className="item">
                    <DirectionImage imgSrc={item.image} loaded={false}></DirectionImage>

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
