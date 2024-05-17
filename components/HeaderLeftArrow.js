import React from 'react';

import { Ionicons } from '@expo/vector-icons';
const HeaderLeftArrow = ({ onNavigate }) => {
  return (
    <Ionicons
      name='arrow-back-sharp'
      color='tomato'
      size={30}
      onPress={onNavigate}
    />
  );
};

export default HeaderLeftArrow;
