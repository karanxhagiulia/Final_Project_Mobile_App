import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';
import homeimage1 from './homeimage1.png';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="home-page">
      <div className="home-content">
          <div className="home-image">
            <img src={homeimage1} alt="Home Image" />
            <h1 className="home-title">Welcome to the Crypto Tracker App!</h1>
            <h2 className="home-subtitle">Track your cryptos in one app.</h2>
            <IonButton className="home-button" expand="block" routerLink="/register">Register</IonButton>
            <p className="home-login-text">Already have an account? <a href="/login">Login instead.</a></p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
