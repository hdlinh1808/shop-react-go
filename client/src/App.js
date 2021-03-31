import logo from './logo.svg';
import './App.css';
import './styles/sidebar.css'


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';
import UserPage from './components/UserPage';


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin">
                    <AdminPage />
                </Route>
                <Route path="/">
                    <UserPage></UserPage>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;