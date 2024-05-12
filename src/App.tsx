import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; // Import BrowserRouter
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { person, wallet, bookmark, home } from 'ionicons/icons';
import Home from './pages/Home';
import CryptoList from './pages/CryptoList';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './App.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Router> 
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/crypto-list">
              <CryptoList />
            </Route>
            <Route path="/watchlist">
              <Watchlist />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar  slot="bottom" className='tab-button' >
          <IonTabButton tab="home" href="/home" className="tab-button">
            <IonIcon aria-hidden="true" icon={home} className="tab-button-icon" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cryptolist" href="/crypto-list" className="tab-button">
            <IonIcon aria-hidden="true" icon={wallet} className="tab-button-icon" />
            <IonLabel>Crypto List</IonLabel>
          </IonTabButton>
          <IonTabButton tab="watchlist" href="/watchlist" className="tab-button">
            <IonIcon aria-hidden="true" icon={bookmark} className="tab-button-icon" />
            <IonLabel>Watchlist</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile" className="tab-button">
            <IonIcon aria-hidden="true" icon={person} className="tab-button-icon" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </Router> 
  </IonApp>
);

export default App;
