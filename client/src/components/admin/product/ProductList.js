import React, { Component } from 'react'
import LTable from '../../table/LTable'
import { Menu, Grid } from 'semantic-ui-react'

export class ProductList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            table: {
                header: ["Product", "SKU", "Category", "Action"],
                body: this.test([["test", "t-est", "123", "Action"]]),
            }
        }

        this.props.setTitle("Product")
        this.props.setBreadCrumbs([])
        
    }

    test(testData) {
        let body = [];
        for (let i = 0; i < 134; i++) {
            let row = JSON.parse(JSON.stringify(testData[0]));
            row[0] += i;
            body.push(row)
        }
        return body;
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <LTable header={this.state.table.header}
                            body={this.state.table.body}
                            semanticProps={{ celled: true, selectable: true }}>

                        </LTable>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ProductList
