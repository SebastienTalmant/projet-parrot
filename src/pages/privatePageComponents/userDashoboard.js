import React from 'react';
import Connection from './AuthConnection';
import AnnoncesDashboard from './annoncesDashboard';


const UserDashboard = () => {

  return (<>
    <Connection />
    <AnnoncesDashboard />
  </>
  );
};
export default UserDashboard;