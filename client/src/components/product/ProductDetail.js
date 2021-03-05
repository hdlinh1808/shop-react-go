import React, { Component } from 'react'

class ProductDetail extends Component {
    render() {
        return (
            <div>
                {this.props.match.params}
            </div>
        )
    }
}

export default ProductDetail
