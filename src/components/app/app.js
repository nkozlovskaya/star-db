import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorIndicator from '../error-indicator/error-indicator';
import { PeoplePage, PlanetPage, StarshipPage, SecretPage, LoginPage } from '../pages';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';
import { StarshipDetails } from '../sw-components';
export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      console.log('switched to', Service.name);

      return {
        swapiService: new Service()
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">

              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Switch>
                <Route path='/people/:id?' component={PeoplePage} />
                <Route path='/planets' component={PlanetPage} />
                <Route path='/starships' exact component={StarshipPage} />
                <Route path='/starships/:id'
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />
                  }} />
                <Route
                  path='/login'
                  render={() => (
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path='/secret'
                  render={() => (
                    <SecretPage
                      isLoggedIn={isLoggedIn}
                    />)} />
                <Route render={() => <h2>Page not found</h2>} />

              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
}

