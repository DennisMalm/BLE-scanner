import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonModal,
  IonButton,
} from '@ionic/react';

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <IonCard fill='outline' button={true}>
      <IonCardHeader>
        {props.name === 'BleuIO' ? (
          <IonCardTitle color='primary'>{props.name}</IonCardTitle>
        ) : (
          <IonCardTitle>{props.name}</IonCardTitle>
        )}
      </IonCardHeader>
      <IonCardContent>
        {props.id}
        <br></br>
        {props.rssi}
        <br></br>
      </IonCardContent>
      <IonModal
        swipeToClose='true'
        mode='md'
        animated='true'
        isOpen={showModal}
      >
        {props.adv}
        <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
      </IonModal>

      <IonButton onClick={() => setShowModal(true)}>Advertising data</IonButton>
    </IonCard>
  );
};

export default Card;
