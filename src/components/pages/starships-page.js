import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const StarshipPage = ({ history }) => {
  return (
    <StarshipList
      onItemSelected={(id) => history.push(id)} />
  );
};

export default withRouter(StarshipPage);