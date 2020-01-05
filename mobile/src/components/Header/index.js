import React from 'react';
import { Image } from 'react-native';

import logo from '../../assets/logo-small.png';

import { View } from './styles';

export default function Header() {
  return (
    <View>
      <Image source={logo} />
    </View>
  );
}
