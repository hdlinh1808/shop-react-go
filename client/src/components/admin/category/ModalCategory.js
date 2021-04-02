import React, { Component } from 'react'
import { Modal, Form, Button, ButtonGroup, Step } from 'semantic-ui-react'

export class ModelCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: this.props.category,
            listLevel: [[]],
            listParent: [],
        }
    }

    componentDidMount() {
        let root = this.props.root;
        let map = this.props.map;
        if (root == null) {
            return;
        }

        let listLevel = [];

        let p = this.state.category.parent;
        let listParent = [];
        while (p != null) {
            listParent.push(p.id)
            p = p.parent;
        }

        listParent = listParent.reverse()

        listLevel.push(root.map(c => c.id))
        for (let i = 0; i < listParent.length; i++) {
            let id = listParent[i]
            let childs = map[id]?.childs;
            if (childs != null) {
                listLevel.push(childs.map(c => c.id))
            }
        }

        this.setState({
            listLevel: listLevel,
            listParent: listParent,
        })
    }

    update() {
        //validate
        // console.log(this.state.category)
        this.props.update(this.state.category)
    }

    handleOnClickParent(id, index) {

        // if(id == this.state.listParent[index]){
        //     return;
        // }

        let listParent = [...this.state.listParent].slice(0, index + 1)
        let listLevel = [...this.state.listLevel].slice(0, index + 1)
        listParent[index] = id;
        let childs = this.props.map[id]?.childs;
        if (childs != null) {
            listLevel.push(childs.map(c => c.id));
        }

        this.setState({
            listParent: listParent,
            category: { ...this.state.category, parentId: id },
            listLevel: listLevel,
        })

    }

    renderLevel() {
        let map = this.props.map;
        let parentPicker = this.state.listLevel.map((lv, index) => {
            if (lv.length > 1 || (lv.length == 1 && lv[0] != this.state.category.id)){
                return (<div style={{ marginTop: "10px" }} key={index}>
                    <ButtonGroup>
                        {lv.map(id => {
                            let c = map[id];
                            return id != this.state.category.id ? <Button key={id} color='violet' content={c?.name} inverted
                                onClick={() => this.handleOnClickParent(id, index)}
                                active={this.state.listParent[index] == id}
                            /> : null
                        }
                        )}
                    </ButtonGroup>
                </div>)
            }
        })

        let parentDisplay = <Step.Group>
            {this.state.listParent.map(id => <Step key={id}>{map[id]?.name}</Step>)}
        </Step.Group>
        return <>
            <div>{parentPicker}</div>

            <div style={{ marginTop: "10px" }}>{parentDisplay}</div>
        </>
    }

    render() {
        return (
            <div>
                <Modal size="small" open>
                    <Modal.Header>Category</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Input
                                label={"Category"}
                                value={this.state.category?.name ?? ""}
                                onChange={(e) => this.setState({ category: { ...this.state.category, name: e.target.value } })}
                            />
                            <Form.Input
                                label="Slug"
                                value={this.state.category?.slug ?? ""}
                                onChange={(e) => this.setState({ category: { ...this.state.category, slug: e.target.value } })}
                            />
                            <Form.Field>
                                <label>Parent</label>
                                {this.renderLevel()}
                            </Form.Field>
                            <Form.TextArea
                                label="Description"
                                value={this.state.category?.description ?? ""}
                                onChange={(e) => this.setState({ category: { ...this.state.category, description: e.target.value } })}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.props.close()}>Hủy</Button>
                        <Button positive onClick={() => this.update()}>Cập nhật</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default ModelCategory
