import React, { Component } from 'react'
import { getAllCategories, addCategory, deleteCategory, updateCategory } from '../../../model/CategoryModel'

import { Label, Button, Icon, Table, Pagination, Confirm } from 'semantic-ui-react';
import ModelCategory from './ModalCategory';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';



export class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            category: {
                root: null,
                map: null,
                unParent: null,
            },
            openModal: false,
            updateCategory: null,
            removeCategoryKey: null,
        }

        this.props.setTitle("Category")
        let breadCrumbs = [
            { to: '/', content: 'Home', link: true },
            { to: '', content: 'Category', link: false },
        ]
        this.props.setBreadCrumbs(breadCrumbs)
    }

    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {
        getAllCategories()
            .then((data) => {
                this.setState({
                    category: { ...this.state.category, map: data }
                })

                let result = this.buildCategoryTree(data);
                this.setState({
                    category: {
                        ...this.state.category,
                        root: result.root,
                        unParent: result.unParent,
                    }
                }, () => {
                    console.log(this.state.category)
                })
            })
    }

    buildCategoryTree(data) {
        let root = [];
        let unParent = [];
        let result = { root: root, unParent: unParent }

        // console.log(data)
        if (data == null) {
            return result;
        }
        let keys = Object.keys(data)
        keys.forEach(function (catId, index) {
            let category = data[catId]

            let parentId = category.parentId;
            if (parentId == null) { // root
                root.push(category)
                category.type = 0;
                return;
            }

            // delete (category.id)
            let parent = data[parentId]
            if (parent == null) { // unparent
                unParent.push(category)
                category.type = 1;
                return;
            }

            if (parent.childs == null) {
                parent.childs = []
            }
            category.parent = parent;
            parent.childs.push(category);
        })

        return {
            root: root, unParent: unParent,
        }
    }

    renderAction() {
        return (
            <>
                <Button icon style={{ fontSize: "12px" }} basic color="teal">
                    <Icon name='edit' />
                </Button>

                <Button icon style={{ fontSize: "12px" }} basic color="red" >
                    <Icon name='trash alternate' />
                </Button>
            </>
        )
    }

    table() {
        return (
            <Table celled selectable>
                {this.tableHeader(["Name", "Type", "Parent", "Action"])}
                {this.tableBody()}
                {this.tableFooter()}
            </Table>
        )
    }

    tableHeader(titles) {
        let header = <Table.Header>
            <Table.Row>
                {titles.map(title => <Table.HeaderCell key={title}>{title}</Table.HeaderCell>)}
            </Table.Row>
        </Table.Header>
        return header;
    }

    renderAction(key) {
        return (
            <>
                <Button icon style={{ fontSize: "12px" }} basic color="teal" onClick={(e) => this.openModalEdit(key)}>
                    <Icon name='edit' />
                </Button>

                <Button icon style={{ fontSize: "12px" }} basic color="red" onClick={() => this.showConfirmBox(key)}>
                    <Icon name='trash alternate' />
                </Button>
            </>
        )
    }

    tableBody() {
        let data = []
        let entries = this.state.category?.map ? Object.entries(this.state.category.map) : [];
        // console.log(entries)
        for (const [key, c] of entries) {
            let parentlist = []
            let type = "";
            if (c.type == 0) {
                type = <Label tag color="red">root</Label>
            } else if (c.type == 1) {
                type = <Label tag>no parent</Label>
            } else {
                let p = null;
                p = c.parent
                while (p != null) {
                    parentlist.unshift(p.name)
                    p = p.parent
                }
            }
            data.push(this.tableBodyRow(key, [c.name, type, parentlist.join(","), this.renderAction(key)]))
        }

        return (
            <Table.Body>
                {data}
            </Table.Body>
        );
    }

    tableBodyRow(key, data) {
        let row = <Table.Row key={key}>
            {data.map((cell, index) => <Table.Cell key={index}>{cell}</Table.Cell>)}
        </Table.Row>
        return row;
    }

    tableFooter() {
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Pagination floated='right'
                            siblingRange={1}
                            boundaryRange={0}
                            firstItem={null}
                            lastItem={null}
                            activePage={this.state.activePage}
                            // onPageChange={(e, target) => this.handlePaginationChange(e, target)}
                            totalPages={50}

                        />

                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }

    openModalAdd() {
        this.setState({
            openModal: true,
            updateCategory: {},
        })
    }

    openModalEdit(key) {
        let c = this.state.category.map[key]
        this.setState({
            openModal: true,
            updateCategory: {
                ...c,
                id: key,
            }
        })
    }

    editCategory(category) {
        category.parent = null;
        category.childs = null;
        let handleResult = (data) => {
            if (data.error < 0) { // fail
                this.notification("error", data.message)
            } else { // success
                this.notification("success", data.message)
                this.loadCategories();
            }
            this.closeModal();
        }

        if (category.id == null) { // add
            addCategory(category)
                .then(data => {
                    handleResult(data)
                })
        } else { // update
            updateCategory(category, category.id)
                .then(data => {
                    // console.log(category, data)
                    handleResult(data)
                })
        }
    }


    deleteCategory(callback) {
        if (this.state.removeCategoryKey == null) {
            callback();
            return;
        }

        deleteCategory(this.state.removeCategoryKey)
            .then(data => {
                if (data.error < 0) {
                    this.notification("error", data.message)
                } else {
                    this.notification("success", data.message)
                    this.loadCategories();
                }
                callback();
            })
    }

    closeModal() {
        this.setState({
            openModal: false,
            updateCategory: null,
        })
    }

    showConfirmBox(id) {
        this.setState({
            removeCategoryKey: id,
        })
    }

    closeConfirmBox() {
        this.setState({
            removeCategoryKey: null,
        })
    }

    notification(type, message) {
        toast({
            type: type,
            description: message,
            animation: 'bounce',
            time: 3000,
            size: "tiny",
        })
    }

    render() {
        let table = this.table()
        let modal = this.state.openModal ? <ModelCategory category={this.state.updateCategory} close={() => this.closeModal()}
            update={(category) => this.editCategory(category)}
            root={this.state.category.root}
            map={this.state.category.map}
        /> : null


        let confirmRemove = this.state.removeCategoryKey ? <Confirm
            open={true}
            header='Confirm'
            content={"Are you sure to remove category: " +
                this.state.category.map[this.state.removeCategoryKey].name}
            onCancel={() => this.closeConfirmBox()}
            onConfirm={() => this.deleteCategory(() => this.closeConfirmBox())}
        /> : null
        return (
            <div>
                <Button color="green" basic onClick={() => this.openModalAdd()}>
                    <Icon name='plus' /> Add new category
                </Button>
                {table}

                {modal} {/* modal add or edit */}
                {confirmRemove} {/* confirm delete */}
                <SemanticToastContainer position="top-right" />
            </div>
        )
    }
}

export default Category
