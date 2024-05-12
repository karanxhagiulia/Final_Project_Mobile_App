import React, { useState } from 'react';
import { IonContent, IonMenuButton, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { registerUser } from './firebaseconfig'; 
import { Link } from 'react-router-dom'; 
import './Register.css';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
      try {
        await registerUser(name, email, password); 
        setName('');
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error('Registration error:', error.message);
      }
    };

 
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" />
              <IonTitle>Register</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <h1 className="welcome-title">Welcome!</h1>
              <h2 className="register-now-title">Register now</h2>
              <div className="input-fields">
                <IonInput
                  type="text"
                  placeholder="Name"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                ></IonInput>
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
              </div>
              <IonButton className="register-button" expand="block" onClick={handleRegister}>Register</IonButton>
              <p className="login-text">
                Already have an account? <Link to="login">Login instead</Link>
              </p>
            </div>
          </IonContent>
        </IonPage>
      );
    };
    
    export default Register;
