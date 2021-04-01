import React, { Component } from 'react'
import { getAllCategories } from '../../../model/CategoryModel'
import MaterialTable from 'material-table'

//material table
import { forwardRef } from 'react';
import { AddBox, ArrowDownward, Check, Clear, DeleteOutline, ChevronRight, Edit, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, Search, Remove, ViewColumn } from "@material-ui/icons";
import { Label,Button,Icon } from 'semantic-ui-react';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            category: {
                root: null,
                map: null,
            }
        }

        this.props.setTitle("Category")
        let breadCrumbs = [
            { to: '/', content: 'Home', link: true },
            { to: '', content: 'Category', link: false },
        ]
        this.props.setBreadCrumbs(breadCrumbs)
    }

    componentDidMount() {
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
            delete (category.id)

            let parentId = category.parentId;
            if (parentId == null) { // root
                root.push(category)
                return;
            }

            let parent = data[parentId]
            delete (category.parentId)
            if (parent == null) { // unparent
                unParent.push(category)
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

    materialTable() {
        let data = [];
        this.state.category.unParent?.forEach((category, index) => {
            data.push({ ...category, status: <Label tag>no parent</Label>, action: this.renderAction()})
        })

        this.state.category.root?.forEach((category, index) => {
            data.push({ ...category, status: <Label tag color="red">root</Label>,  action: this.renderAction() })
        })
        return <MaterialTable title="Category"
            columns={[
                { title: "Category", field: "name" },
                // { title: "Slug", field: "slug" },
                { title: "Status", field: "status" },
                { title: "Parent", field: "parent" },
                { title: "Action", field: "action" },
            ]}
            data={data}
            icons={tableIcons}
        />
    }

    render() {
        let table = this.materialTable()
        return (
            <div>
                {table}
            </div>
        )
    }
}

export default Category
