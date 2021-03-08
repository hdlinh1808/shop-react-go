import React, { Component } from 'react'
import "../../styles/product-detail.css"
import { Grid, GridColumn } from 'semantic-ui-react';
class ProductDetail extends Component {

    constructor(props) {
        super(props)

        let id = this.props.match.params?.id;

        this.state = {
            id: id,
            itemInfo: {},
        }
    }

    setItemInfo(itemInfo) {
        this.setState({
            itemInfo: itemInfo,
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
        return (
            <div className='item-container'>
                {JSON.stringify(this.state.itemInfo)}
                <Grid>
                    <Grid.Column mobile={16} computer={8}>
                        This is test column
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
