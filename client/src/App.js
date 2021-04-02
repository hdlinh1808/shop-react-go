import logo from './logo.svg';
import './App.css';
import './styles/sidebar.css'


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';

import { Container} from "semantic-ui-react";
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';
import AppFooter from './components/AppFooter';


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin">
                    <AdminPage />
                </Route>

                {/* <Route path="/"> */}
                    {/* <UserPage></UserPage> */}
                {/* </Route> */}

                <Container>
                    <AppHeader></AppHeader>
                    <AppBody></AppBody>
                </Container>
                <AppFooter></AppFooter>
            </Switch>
        </Router>
    );
}

export default App;