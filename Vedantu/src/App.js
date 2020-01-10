import { connect } from 'react-redux';
import './sass/App.scss';
import React, { Component } from 'react';
import Profile from './componnents/Profile';
import Repo from './componnents/Repo';

import { fetchUser, fetchRepos, searchRepo } from './reducer';

export class App extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      showLoader: false,
      repoName: '',
      searchBy: 'name',
    };
  }

  componentDidMount() {
    this.props.dispatchFetchUser();
    this.props.dispatchFetchRepos();
  }

  handleSearch(e) {
    this.setState({ repoName: e.target.value });
    this.props.dispatchSearchRepo(e.target.value, this.state.searchBy);
  }
  handleSelect(e) {
    this.setState({ searchBy: e.target.value });
    if (this.state.repoName !== '') {
      this.props.dispatchSearchRepo(this.state.repoName, e.target.value);
    }
  }

  render() {
    const { user, repos } = this.props;
    const { showLoader, repoName, searchBy } = this.state;
    return (
      <div className="App">
        {showLoader && <div className="loader">
          <img src="./loader.gif" alt="Loading..." width="400" height="400" />
        </div>}
        <div className="row">
          <div className="col-left">
            <Profile data={user} />
          </div>
          <div className="col-right">
            <nav>
              <ul>
                <li>overview</li>
                <li className="active">repository <span className="Counter">{repos.length}</span></li>
                <li>projects</li>
                <li>stars</li>
              </ul>
            </nav>
            <div className="search">
              <form>
                <input type="text" onChange={this.handleSearch} value={repoName} />
                <select onChange={this.handleSelect} value={searchBy}>
                  <option value="name">Name</option>
                  <option value="language">language</option>
                </select>
              </form>
            </div>
            <div className="repo-container">
              <ul>
                {repos.map(i => <Repo data={i} key={i.id}></Repo>)}
              </ul>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  repos: state.repos,
})

const mapDispatchToProps = {
  dispatchFetchUser: fetchUser,
  dispatchFetchRepos: fetchRepos,
  dispatchSearchRepo: searchRepo,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



