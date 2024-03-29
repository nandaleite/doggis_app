import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { AtendentePage } from '@/AtendentePage';
import { ClientePage } from '@/ClientePage';
import { LoginPage } from '@/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            isAtendente: false,
            isCliente: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin,
            isAtendente: x && x.role === Role.Atendente,
            isCliente: x && x.role === Role.Cliente
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin, isAtendente, isCliente } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/cadastrar-produto" className="nav-item nav-link">Cadastrar Produto</Link>}
                                {isAtendente && <Link to="/cadastrar-pet" className="nav-item nav-link">Cadastrar Pet</Link>}
                                {isCliente && <Link to="/servicos-realizados" className="nav-item nav-link">Serviços Realizados</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/cadastrar-produto" roles={[Role.Admin]} component={AdminPage} />
                                    <PrivateRoute path="/cadastrar-pet" roles={[Role.Atendente]} component={AtendentePage} />
                                    <PrivateRoute path="/servicos-realizados" roles={[Role.Cliente]} component={ClientePage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 