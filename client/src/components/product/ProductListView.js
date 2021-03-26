import React, { Component } from 'react'
import { Grid, Dropdown, GridRow, Pagination, GridColumn } from 'semantic-ui-react';
import ProductItem from './ProductItem';
import StyledContentLoader from 'styled-content-loader';


const sortOptions = [{ key: 'new', value: 'new', text: 'New' },
{ key: 'popular', value: 'popular', text: 'Popular' },
{ key: 'price_desc', value: 'price_desc', text: 'Price (desc)' },
{ key: 'price_asc', value: 'price_asc', text: 'Price (asc)' }];


class ProductListView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            numItemPerRow: 4,
            items: new Array(12).fill(null),
            sortOptionSelect: 'new',
            activePage: 1,
            totalPages: 1,
        }
    }

    setItem(items) {
        this.setState({
            items: items,
        })
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems() {
        fetch('https://fakestoreapi.herokuapp.com/products')
            .then(response => response.json())
            .then(result => this.setItem(result));
    }

    handleSortOptionChange(e, target) {
        let option = target?.value;
        this.setState({
            sortOptionSelect: option,
        }, () => {
            console.log(this.state)
        })
    }

    handlePaginationChange(e, target) {
        this.setState({
            activePage: target.activePage,
        })
    }

    render() {
        var rows = [];
        let items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            rows.push(<ProductItem item={item} key={item ? item.id : i} ></ProductItem>)
        }

        return (
            <div>
                <GridRow className="filter">
                    Sort by: <Dropdown selection placeholder='' options={sortOptions}
                        onChange={(e, target) => this.handleSortOptionChange(e, target)}
                        defaultValue={this.state.sortOptionSelect} />
                </GridRow>

                <Grid stackable doubling columns={this.state.numItemPerRow} className="content">
                    {rows}
                </Grid>

                <Grid className='listview-footer no-margin' >
                    <Grid.Column>
                        <Pagination floated='right'
                            siblingRange={1}
                            boundaryRange={0}
                            // ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            activePage={this.state.activePage}
                            onPageChange={(e, target) => this.handlePaginationChange(e, target)}
                            totalPages={50}
                        />
                    </Grid.Column>
                </Grid>

            </div>

        )
    }
}

export default ProductListView
