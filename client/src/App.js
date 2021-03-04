import logo from './logo.svg';
import './App.css';

import { Container, Button, Grid, Sidebar, Segment, Header, Image, Menu, GridRow, Checkbox } from "semantic-ui-react";
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';
import AppFooter from './components/AppFooter';


function App() {

    return (
        <div>
            <Container>
                <AppHeader></AppHeader>
                <AppBody></AppBody>
            </Container>

            <AppFooter></AppFooter>
        </div>

    );
}

export default App;