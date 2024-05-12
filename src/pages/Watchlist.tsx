import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import './Watchlist.css';

const Watchlist: React.FC = () => {
  const [cryptoName, setCryptoName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [watchlist, setWatchlist] = useState<{ cryptoName: string; note: string; done: boolean }[]>([]);
  const [doneList, setDoneList] = useState<{ cryptoName: string; note: string }[]>([]);
  const [currentList, setCurrentList] = useState<'todo' | 'done'>('todo');

  const handleAddNote = () => {
    if (cryptoName.trim() !== '' && note.trim() !== '') {
      setWatchlist(prevWatchlist => [...prevWatchlist, { cryptoName, note, done: false }]);
      setCryptoName('');
      setNote('');
    }
  };

  const handleMarkAsDone = (index: number) => {
    const updatedWatchlist = [...watchlist];
    const doneItem = updatedWatchlist.splice(index, 1)[0];
    setWatchlist(updatedWatchlist);
    setDoneList(prevDoneList => [...prevDoneList, { cryptoName: doneItem.cryptoName, note: doneItem.note }]);
  };

  const toggleList = (list: 'todo' | 'done') => {
    setCurrentList(list);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Watchlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          <h1>Watchlist</h1>
          <div className="input-container">
            <IonInput
              value={cryptoName}
              placeholder="Crypto Name"
              onIonChange={(e: any) => setCryptoName(e.target.value)}
            />
            <IonInput
              value={note}
              placeholder="Note"
              onIonChange={(e: any) => setNote(e.target.value)}
            />
            <IonButton onClick={handleAddNote}>Add Note</IonButton>
          </div>

          <div className="toggle-buttons">
            <div
              className={`toggle-option ${currentList === 'todo' ? 'active' : ''}`}
              onClick={() => toggleList('todo')}
            >
              To do
            </div>
            <div
              className={`toggle-option ${currentList === 'done' ? 'active' : ''}`}
              onClick={() => toggleList('done')}
            >
              Done
            </div>
          </div>
          <div className="watchlist">
            <h2>Overview</h2>
            <ul>
              {currentList === 'todo' ? (
                watchlist.map((item, index) => (
                  <li key={index}>
                    <div>
                      <strong>{item.cryptoName}</strong>
                      <p>{item.note}</p>
                    </div>
                    <IonButton onClick={() => handleMarkAsDone(index)}>Mark as Done</IonButton>
                  </li>
                ))
              ) : (
                doneList.map((item, index) => (
                  <li key={index}>
                    <div>
                      <strong>{item.cryptoName}</strong>
                      <p>{item.note}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Watchlist;
