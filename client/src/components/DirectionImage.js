import React, { Component } from 'react'
import "../styles/img.css"

const VERTICAL_IMAGE_CLASS = "image-vertical";
const HORIZONTAL_IMAGE_CLASS = "image-horizontal";
const SQUARE_IMAGE_CLASS = "image";
export class DirectionImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            style: SQUARE_IMAGE_CLASS,
            loaded: false,
        }
    }

    onImgLoad(img) {
        let naturalHeight = img.naturalHeight;
        let naturalWidth = img.naturalWidth;
        let style = "";
        if (naturalWidth > naturalHeight) {
            style = HORIZONTAL_IMAGE_CLASS;
        } else if (naturalHeight > naturalWidth) {
            style = VERTICAL_IMAGE_CLASS;
        } else {
            style = SQUARE_IMAGE_CLASS;
        }

        this.setState({
            style: style,
        }, () => {
            this.setState({
                loaded: true,
            })
        })
    }

    renderImage(src){
        let img = <img src={src} alt="" />;
        
    }

    render() {
        return (
            <div className="image-wrapper">
                <img className={this.state.style} src={this.props.imgSrc} onLoad={(e) => this.onImgLoad(e.target)}
                    style={{ display: !this.state.loaded ? "none" : "inherit" }}
                />
            </div>
        )
    }
}

export default DirectionImage
