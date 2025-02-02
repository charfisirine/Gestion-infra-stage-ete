import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { CategoryApplicationSlice } from '../Components/CategoryApplication/CategoryApplicationSlice';
import { appcategoriesSaga } from '../Components/CategoryApplication/categoryApplicationSaga';

import { CategoryServeurSlice } from '../Components/CategoryServeur/CategoryServeurSlice';
import { categoryServeurSaga } from '../Components/CategoryServeur/categoryServeurSaga';

import { SiteSlice } from '../Components/Site/siteSlice';
import sitesSaga from '../Components/Site/siteSaga';

import { ApplicationSlice } from '../Components/Application/ApplicationSlice';

import { ClusterApplicationSlice} from '../Components/ClusterApplication/ClusterApplicationSlice';
import clusterApplicationSaga from '../Components/ClusterApplication/clusterApplicationSaga';

import { ClusterSlice} from '../Components/Cluster/ClusterSlice';
import {clusterSaga} from '../Components/Cluster/clusterSaga';

import { ServeurApplicationSlice} from '../Components/ServeurApplication/ServeurApplicationSlice';
import {serveurApplicationSaga} from '../Components/ServeurApplication/serveurApplicationSaga';

import { ServeurSlice} from '../Components/Serveur/ServeurSlice';
import {serveurSaga} from '../Components/Serveur/serveurSaga';

import {SousReseauSlice} from '../Components/SousReseau/SousReseauSlice';
import {sousReseauSaga} from '../Components/SousReseau/sousReseauSaga';

import {ReseauSlice} from '../Components/Reseau/ReseauSlice';
import {reseauSaga} from '../Components/Reseau/reseauSaga';
import {applicationsSaga} from '../Components/Application/applicationSaga';
import { AuthSlice } from '../Components/Authentification/AuthSlice';
import { authSaga } from '../Components/Authentification/AuthSaga';

const rootReducers = combineReducers({
  appcategorie: CategoryApplicationSlice.reducer,
  categoryServeur: CategoryServeurSlice.reducer, 
  site: SiteSlice.reducer,
  application: ApplicationSlice.reducer, 
  clusterApplication:ClusterApplicationSlice.reducer,
  cluster:ClusterSlice.reducer,
  serveurApplication:ServeurApplicationSlice.reducer,
  serveur:ServeurSlice.reducer,
  sousReseau:SousReseauSlice.reducer,
  reseau: ReseauSlice.reducer,
  auth: AuthSlice.reducer,
});

const rootSagas = function* rootSaga() {
  yield all([
    appcategoriesSaga.saga(),
    categoryServeurSaga.saga(),
    sitesSaga.saga(),
    clusterApplicationSaga.saga(),
    applicationsSaga.saga(),
    serveurApplicationSaga.saga(),
    reseauSaga.saga(),
    clusterSaga.saga(),
    serveurSaga.saga(),
    sousReseauSaga.saga(),
    authSaga.saga(),
  ]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);