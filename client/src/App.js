import logo from './logo.svg';
import './App.css';
import './styles/sidebar.css'

import { Container, Button, Grid, Sidebar, Segment, Header, Image, Menu, GridRow, Checkbox } from "semantic-ui-react";
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';
import AppFooter from './components/AppFooter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

    
    return (
        <Router>
            <Container>
                <AppHeader></AppHeader>
                <AppBody></AppBody>
            </Container>
            <AppFooter></AppFooter>
        </Router>

    );
}

export default App;