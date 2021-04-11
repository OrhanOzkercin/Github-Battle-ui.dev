import * as React from 'react';
import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
import Card from './Card';

function LangaugesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card header={`#${index + 1}`} avatar={avatar_url} name={login} href={html_url}>
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage('All');
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,

      error: null,
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: { ...repos, [selectedLanguage]: data },
          }));
        })
        .catch((err) => this.setState({ error: err.message }));
    }
  }

  isLoading() {
    const { repos, selectedLanguage, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LangaugesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />
        {this.isLoading() && <p>LOADING</p>}
        {error && <p className='error'>{error}</p>}
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    );
  }
}
