import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssueList, Select } from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoName: '',
    repository: {},
    issues: [],
    loading: true,
    filter: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${this.state.filter || 'open'}`,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repoName,
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.filter !== this.state.filter) {
      const { repoName } = this.state;
      const newState = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${this.state.filter}`,
          per_page: 5,
        },
      });

      this.setState({
        issues: newState.data,
      });
    }
  }

  handleOptionChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    const { repository, issues, loading } = this.state;

    if (loading === true) {
      return <Loading>Carregando.. .</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft /> Voltar
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Select onChange={this.handleOptionChange}>
          <option value="open">open</option>
          <option value="all">all</option>
          <option value="closed">closed</option>
        </Select>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
