import * as React from 'react';
import { fetchPopularRepos } from '../utils/api';

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
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
      </React.Fragment>
    );
  }
}
