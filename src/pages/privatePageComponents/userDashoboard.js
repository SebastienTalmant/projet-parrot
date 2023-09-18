import React from 'react';
import Connection from './AuthConnection';
import AnnoncesDashboard from './annoncesDashboard';
import MessagesTable from './messagesTable';
import CommentsTable from './commentsTable';

const UserDashboard = () => {

  return (<>
    <Connection />
    <AnnoncesDashboard />
    <MessagesTable />
    <CommentsTable />
  </>
  );
};
export default UserDashboard;