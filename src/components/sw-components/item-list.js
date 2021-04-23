import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService, compose, withChildFunction } from '../hoc-helper';



const renderName = ({ name }) => <span>{name}</span>;

const renderModelAndName = ({ model, name }) => <span>{name} {model}</span>;

const ListWithChildren = withChildFunction(
  ItemList, renderName);

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
};

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
};

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
}

const PersonList = compose(withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName))
  (ItemList);

const PlanetList = compose(withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName))
  (ItemList);

const StarshipList = compose(withSwapiService(mapStarshipMethodsToProps),
  withData,
  withChildFunction(renderModelAndName))
  (ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};