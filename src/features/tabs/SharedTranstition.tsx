import React from 'react';
import UserBottomTabs from './UserBottomTabs';
import { SharedStateProvider } from './SharedContext';

const SharedTranstition = () => {
  return <SharedStateProvider>
    <UserBottomTabs />
  </SharedStateProvider>;
};

export default SharedTranstition;
