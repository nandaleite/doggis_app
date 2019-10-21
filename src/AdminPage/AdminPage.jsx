import React from 'react';

import { userService } from '@/_services';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Cadastrar Produto</h1>
                <form>
                    <input placeholder="Título" name="titulo"></input><br />
                    <input placeholder="Fabricante" name="fabricante"></input><br />
                    <textarea name="especificacoes">Especificações</textarea><br />
                    <input placeholder="Preço" name="preco"></input><br />
                    <input placeholder="Código" name="codigo"></input><br />
                    <input placeholder="Fotos" type="file" name="fotos"></input><br />
                    <input type="submit" value="Salvar"></input>
                    <button>Cancelar</button>
                </form>
            </div>
        );
    }
}

export { AdminPage };