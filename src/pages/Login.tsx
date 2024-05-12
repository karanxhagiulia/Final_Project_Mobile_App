import React, { useState } from 'react';
import { IonContent, IonMenuButton, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { signInUser } from './firebaseconfig';
import { Link } from 'react-router-dom'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInUser(email, password);
      console.log('Login successful');
    } catch (error: any) { 
      console.error('Login error:', error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>Welcome Back!</h1>
          <IonInput
            type="email"
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
          <IonButton className='register-button' expand="block" onClick={handleLogin}>Login</IonButton>
          <p className='login-text'>
            Don't have an account? <Link to="register">Register here!</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
