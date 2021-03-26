import React, { Component } from 'react'
import "../styles/img.css"
import ContentLoader from 'react-content-loader';

const VERTICAL_IMAGE_CLASS = "image-vertical";
const HORIZONTAL_IMAGE_CLASS = "image-horizontal";
const SQUARE_IMAGE_CLASS = "image";

const getItemLoader = () => (
    <div className="image">
        <ContentLoader viewBox="0 0 400 400">
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="5" ry="5" width="400" height="400" />
        </ContentLoader>
    </div>

)
export class DirectionImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            style: SQUARE_IMAGE_CLASS,
            loaded: false,
        }
    }

    onImgLoad(img) {
        try {
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
        } catch (ex) {
            console.log(ex)
        }
    }

    onImgError(){
        this.setState({
            loaded: true
        })
    }

    renderImage(src) {
        let img = <img src={src} alt="" />;

    }

    render() {
        let loader = null;
        if (!this.state.loaded && this.props.loaded) {
            loader = getItemLoader();
        }
        return (
            <div className="image-wrapper">
                {loader}
                <img className={this.state.style} src={this.props.imgSrc} alt="none" onLoad={(e) => this.onImgLoad(e.target)} onError={(e) => this.onImgError()}
                style={{ display: !this.state.loaded ? "none" : "inherit" }}
                />
            </div>
        )
    }
}

export default DirectionImage
