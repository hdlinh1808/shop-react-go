import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react';
import ProductItem from './ProductItem';

class ProductListView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            numItemPerRow: 4,
        }
    }


    getDataTest() {
        return [{ imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" },
        { imgUrl: "https://image.freepik.com/free-vector/pack-colorful-square-emoticons_23-2147589525.jpg" },
        { imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/F-15_vertical_deploy.jpg" }]
    }


    render() {
        var rows = [];
        let data = this.getDataTest();
        for (let i = 0; i < 20; i++) {
            data.push(data[i % 3]);
        }
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            rows.push(<ProductItem imgUrl={item.imgUrl} key={i + ""}></ProductItem>)
            // rows.push(<div key={i + "" + i}>{i}</div>)
        }
        return (
            <Grid stackable doubling columns={this.state.numItemPerRow} className="content">
                {rows}
            </Grid>
        )
    }
}

export default ProductListView
