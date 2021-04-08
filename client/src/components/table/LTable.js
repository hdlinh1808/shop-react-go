import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Table, Pagination, Form, Input, Divider, Grid, Dropdown, TableCell } from 'semantic-ui-react';


/**
* @extends {React.Component<{page:number, semanticProps:any, totalPage:number, header:arrayOf(string), body:arrayOf(arrayOf(any)), searchable:boolean}>}
*/
class LTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 1,
            header: [],
            body: [],
            lengthMenu: [10, 25, 50, 100],
            displayLength: 10,
            totalPage: 3,
            search: "",
            filterRows: [],
        }
    }

    componentWillReceiveProps(newProps) {

    }

    onSearchValue(value) {
        // let filterRows = [];
        // let body = this.props.body ?? this.state.body;
        // let keys = Object.keys(body);

        // let oldSearch = this.state.search;
        // let newSearch = value;

        // keys.map(key => {
        //     let rowData = body[key];
        //     rowData.map(cell => {
        //         if (cell.toLowerCase().includes(value.toLowerCase())) {
        //             filterRows.push(key);
        //         }
        //     })
        // })
        this.setState({
            search: value,
            page: 1,
            // filterRows: filterRows
        });
    }

    onhandlePaginationChange(e, target) {
        this.setState({
            page: target.activePage,
        })
    }

    onHandleDisplayLengthChange(e, { value }) {
        console.log(value)
        this.setState({
            displayLength: value,
            page: 1,
        })
    }

    filter() {
        let searchDevice = [{ device: "computer tablet", style: { textAlign: "right" }, width: 8 },
        { device: "mobile", style: { textAlign: "left" }, width: 16 }]

        let lengthMenu = this.props.lengthMenu ?? this.state.lengthMenu;
        let options = lengthMenu.map((number, index) => ({ key: index, text: number, value: number }))
        let search = searchDevice.map((ele, index) => {
            return (
                <Grid.Column key={index} only={ele.device} width={ele.width} textAlign={ele.style.textAlign}>
                    <Form size="small">
                        <Form.Field inline>
                            <label>Search</label>
                            <Input placeholder='Search' onChange={(e) => this.onSearchValue(e.target.value)} />
                        </Form.Field>
                    </Form>
                </Grid.Column>
            )
        })

        return (
            <><Grid>
                <Grid.Column floated='left' computer={6} tablet={8} mobile={16}>
                    <Form>
                        <Form.Field inline>
                            <label>Show</label>
                            <Dropdown
                                placeholder='Compact'
                                compact
                                selection
                                options={options}
                                defaultValue={options && options.length ? options[0].value : null}
                                onChange={(e, target) => this.onHandleDisplayLengthChange(e, target)}
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
                {search}

            </Grid>
                <Divider></Divider>
            </>
        )

    }

    header() {
        let header = this.props.header ?? this.state.header;
        return <Table.Header>
            <Table.Row>
                {header.map((item, index) => <Table.HeaderCell key={index}>
                    {item}
                </Table.HeaderCell>)}
            </Table.Row>
        </Table.Header>
    }

    getDisplayRange() {
        let displayLength = this.props.displayLength ?? this.state.displayLength;
        let page = this.getPage();
        let from = (page - 1) * displayLength;
        let to = page * displayLength - 1;
        return {
            from: from, to: to,
        }
    }

    getNumPage() {
        return this.state.displayLength;
    }

    getPage() {
        return this.state.page;
    }

    body(data) {
        if (data == null || data.length == 0) {
            return <Table.Body>
                <Table.Row>
                    <Table.Cell textAlign="center" colSpan={4}>
                        No data available in table
                    </Table.Cell>

                </Table.Row>
            </Table.Body>
        }
        let body = [];
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let rowData = data[key];
            body.push(this.bodyRow(key, rowData))
        }
        return <Table.Body>
            {body}
        </Table.Body>
    }

    bodyRow(key, rowData) {

        return <Table.Row key={key}>
            {rowData.map((cell, index) => <Table.Cell key={index}>{cell}</Table.Cell>)}
        </Table.Row>
        // let cells = [];
        // let isContainSearch = false;

        // for (let i = 0; i < rowData.length; i++) {
        //     let cellData = rowData[i]
        //     if (cellData.toLowerCase().includes(this.state.search.toLowerCase())) {
        //         isContainSearch = true;
        //     }
        //     cells.push(<Table.Cell key={i}>{cellData}</Table.Cell>)
        // }
        // let row = null;
        // if (isContainSearch) {
        //     row = <Table.Row key={key}>{cells}</Table.Row>
        // }

        // return row;
    }

    footer(numPages, from, to, numFilterRow, totalRow) {
        let filter = ""
        if (numFilterRow != totalRow) {
            filter = `(filtered from ${totalRow} total entries)`
        }
        return <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>
                    Showing {from + 1} to {Math.min(to + 1, numFilterRow)} of {numFilterRow} entries {filter}
                    <Pagination floated='right'
                        siblingRange={1}
                        boundaryRange={0}
                        firstItem={null}
                        lastItem={null}
                        activePage={this.state.page}
                        onPageChange={(e, target) => this.onhandlePaginationChange(e, target)}
                        totalPages={numPages ?? 1}
                    />
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    }

    filterData() {
        let body = this.props.body ?? this.state.body;
        let keys = Object.keys(body);
        let rows = []
        let { from, to } = this.getDisplayRange();
        let numFilterRow = 0;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let rowData = body[key];
            let isFilter = false;
            for (let j = 0; j < rowData.length; j++) {
                let cell = rowData[j]

                //filter
                if (cell.toLowerCase().includes(this.state.search.toLowerCase())) {
                    isFilter = true;
                    continue;
                }
            }

            if (isFilter) {
                //page
                if (numFilterRow >= from && numFilterRow <= to) {
                    rows[key] = rowData;
                }

                numFilterRow++;
            } 
        }

        let numPages = parseInt(numFilterRow / this.getNumPage()) + 1;

        return {
            data: rows,
            numFilterRow: numFilterRow,
            numPages: numPages,
            from: from,
            to: to,
            totalRow: body.length,
        }
    }

    table() {
        // console.log(this.props.semanticProps)
        let { data, numFilterRow, numPages, from, to, totalRow } = this.filterData();
        return <>
            {this.filter()}
            <Table {...this.props.semanticProps}>
                {this.header()}
                {this.body(data)}
                {this.footer(numPages, from, to, numFilterRow, totalRow)}
            </Table>
        </>
    }

    render() {
        return (
            <div>
                {this.table()}
            </div>
        )
    }
}

LTable.propTypes = {
    page: PropTypes.number,
    semanticProps: PropTypes.any,
    totalPage: PropTypes.number,
    header: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    searchable: PropTypes.bool,
};

export default LTable