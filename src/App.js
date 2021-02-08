import React, { useState } from 'react';
import Card from './Card';
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';

import { BLE as ble } from '@ionic-native/ble';
import { bluetooth } from 'ionicons/icons';

const App = () => {
  const [devices, setDevices] = useState([]);
  let foundDevices = [];

  const scan = () => {
    ble.scan([], 10).subscribe((device) => {
      try {
        const advData = new Uint8Array(device.advertising);
        const data = bufferHex(advData);
        device.adv = data;
      } catch (err) {
        console.log(err);
      }
      logDevice(device);
    });
    setDevices(foundDevices);
  };
  const logDevice = (found) => {
    console.log('Discovered' + JSON.stringify(found, null, 2));
    console.log(found.id);
    foundDevices.push(found);
  };
  const bufferHex = (buffer) => {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  };
  const [showToast, setShowToast] = useState(false);
  const handeClick = () => {
    scan();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    console.log('Method complete ----------------');
  };
  const createCard = (data) => {
    return (
      <Card
        key={data.id}
        name={data.name}
        id={data.id}
        rssi={data.rssi}
        adv={data.adv}
      />
    );
  };
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>BleuIO Scanner</IonTitle>

          <IonButton strong='true' slot='end' onClick={handeClick}>
            <IonIcon slot='start' icon={bluetooth} />
            Scan!
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {devices
          .sort((a, b) => {
            if (a.name === 'BleuIO') return -1;
            return 1;
          })
          .map(createCard)}
        <IonToast
          color='primary'
          animated={true}
          isOpen={showToast}
          message='Scanning for devices'
        />
      </IonContent>
    </IonApp>
  );
};

export default App;
