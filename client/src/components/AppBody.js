import React, { Component } from 'react'
import { Grid, Sidebar, Segment, Header, Image, GridRow, Checkbox } from "semantic-ui-react";
import AppSidebar from "./AppSidebar.js"
import "../styles/sidebar.css"
class AppBody extends Component {

    constructor(props) {
        super(props)
        let visible = false;
        if (window.innerWidth >= 991) {
            visible = true;
        }
        this.state = {
            visibleSidebar: visible,
        }
    }

    setVisibleSidebar(visible) {
        if (window.innerWidth >= 991) {
            visible = true;
        }
        this.setState({
            visibleSidebar: visible
        })
    }

    render() {

        var rows = [];
        for (let i = 0; i < 20; i++) {
            rows.push(<Grid.Column>
                <Segment>Mobile</Segment>
            </Grid.Column>)
        }
        return (
            <div className="app-body">
                <Grid>
                    <GridRow only='mobile tablet'>
                        <Grid.Column>
                            <Checkbox
                                checked={this.state.visibleSidebar}
                                label={{ children: <code>visible</code> }}
                                onChange={(e, data) => this.setVisibleSidebar(data.checked)}
                            />
                        </Grid.Column>
                    </GridRow>
                    <GridRow>
                        <Sidebar.Pushable className='custom'>
                            <AppSidebar visible={this.state.visibleSidebar} setVisibleSidebar={(visible) => this.setVisibleSidebar(visible)} />
                            <div className="pusher-computer">
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eleifend faucibus magna, ut vulputate velit. Phasellus volutpat tempor arcu, in sollicitudin enim lobortis et. Suspendisse vestibulum neque eu purus consectetur ullamcorper eget eget augue. Ut finibus urna sed pretium posuere. Vestibulum quis ipsum tellus. Mauris posuere vitae purus a dignissim. Ut gravida non dolor et vehicula. Maecenas id massa risus. Vivamus purus purus, volutpat in ligula pellentesque, tempor pellentesque lectus.

                                Duis ut arcu sit amet metus scelerisque efficitur rhoncus imperdiet augue. Nullam imperdiet dui et dignissim tincidunt. In semper sapien vel sapien tristique, at sollicitudin risus tincidunt. Nam facilisis nisi sit amet diam bibendum, et rhoncus ex luctus. In eget lorem quis libero tincidunt posuere sit amet et sem. Proin a purus faucibus, bibendum elit vel, imperdiet arcu. Etiam nec tincidunt arcu, at suscipit libero. Cras bibendum tristique risus, vel laoreet ligula pretium vitae. Pellentesque posuere sagittis urna, nec dignissim augue ullamcorper ac.
                                adsf */}
                                <Grid stackable columns={3} className="content">
                                    {rows}
                                </Grid>
                            </div>
                        </Sidebar.Pushable>
                    </GridRow>
                </Grid>
            </div>
        )
    }
}

export default AppBody
