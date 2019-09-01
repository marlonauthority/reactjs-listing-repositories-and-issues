import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
  };

  // -> Carregar os dados do LocalStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repos');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // -> Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    // verifica se o estado anterior mudou em relacao ao estado atual
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repos', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;
    this.setState({ loading: true });

    try {
      // Checagem
      if (newRepo === '') throw new Error('Vazio');
      const repoExists = repositories.find(r => r.name === newRepo);
      if (repoExists) throw new Error('Repositório Duplicado');

      //Chamada a api
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
        avatar: response.data.owner.avatar_url,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (err) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form withError={error} onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>
                {' '}
                <img src={repo.avatar} alt={repo.name} width="14px" />
                {repo.name}
              </span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
