import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption } from '@ionic/react';
import './CryptoList.css';

const CryptoList: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [cryptoEntries, setCryptoEntries] = useState<any[]>([]);
  const [expandedCrypto, setExpandedCrypto] = useState<string | null>(null);

  const handleSelectChange = (event: any) => {
    setSelectedCrypto(event.detail.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedCrypto === '' || quantity <= 0 || purchasePrice <= 0) {
      alert("Please enter valid values for all fields.");
      return;
    }

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=usd`)
      .then(response => response.json())
      .then(data => {
        const currentPrice = data[selectedCrypto].usd;
        const currentValue = currentPrice * quantity;
        const profitLoss = currentValue - (purchasePrice * quantity);

        const newEntry = {
          id: selectedCrypto,
          quantity: quantity,
          purchasePrice: purchasePrice,
          currentPrice: currentPrice,
          totalValue: currentValue,
          profitLoss: profitLoss
        };

        setCryptoEntries(prevEntries => [...prevEntries, newEntry]);
        setQuantity(0); // Reset quantity to zero
        setPurchasePrice(0); // Reset purchase price to zero
      })
      .catch(error => {
        console.error("Error fetching cryptocurrency data:", error);
      });
  };

  const totalWalletValue = cryptoEntries.reduce((total, entry) => total + entry.totalValue, 0);

  // Function to handle clicking on a crypto
  const handleCryptoClick = (cryptoName: string) => {
    // If already expanded, collapse it
    if (expandedCrypto === cryptoName) {
      setExpandedCrypto(null);
    } else {
      // Expand the clicked crypto
      setExpandedCrypto(cryptoName);
    }
  };

  // Function to handle clicking outside the expanded crypto div
  const handleOutsideClick = () => {
    setExpandedCrypto(null);
  };

  // Function to handle cryptocurrency deletion
  const handleDelete = (cryptoId: string) => {
    const updatedEntries = cryptoEntries.filter(entry => entry.id !== cryptoId);
    setCryptoEntries(updatedEntries);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crypto List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          <h1>Crypto Wallet</h1>
          <h2>Total Wallet Value: ${totalWalletValue.toFixed(2)}</h2>
          <IonSelect  className="centered-select" value={selectedCrypto} placeholder="Select a cryptocurrency" onIonChange={handleSelectChange}>
            <IonSelectOption value="bitcoin">Bitcoin</IonSelectOption>
            <IonSelectOption value="ethereum">Ethereum</IonSelectOption>
            <IonSelectOption value="litecoin">Litecoin</IonSelectOption>
            <IonSelectOption value="ripple">Ripple</IonSelectOption>
          </IonSelect>
          <form onSubmit={handleSubmit} id="cryptoForm">
            <label htmlFor="quantity">Quantity Owned:</label>
            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} required />
            <label htmlFor="purchasePrice">Purchase Price (per unit):</label>
            <input type="number" id="purchasePrice" value={purchasePrice} onChange={(e) => setPurchasePrice(parseFloat(e.target.value))} required />
            <button className='custom-button add-crypto-button' type="submit">Add coin</button>
          </form>
          <table id="cryptoTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody id="cryptoTableBody">
              {cryptoEntries.map((entry, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => handleCryptoClick(entry.id)}>
                    <td>{entry.id}</td>
                    <td>{entry.quantity} units</td> {/* Display quantity with "units" appended */}
                    <td className={entry.profitLoss >= 0 ? 'profit' : 'loss'}>${entry.profitLoss}</td>
                    <td><button className="delete-button" onClick={() => handleDelete(entry.id)}>Delete</button></td> {/* Add delete button */}
                  </tr>
                  {expandedCrypto === entry.id && (
                    <tr>
                      <td colSpan={4}>
                        <table>
                          <thead>
                            <tr>
                              <th>Quantity</th>
                              <th>Buy Price</th>
                              <th>Current Price</th>
                              <th>Total Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{entry.quantity}</td>
                              <td>${entry.purchasePrice}</td>
                              <td>${entry.currentPrice}</td>
                              <td>${entry.totalValue}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CryptoList;
