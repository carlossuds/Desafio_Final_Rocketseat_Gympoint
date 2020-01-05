import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import HelpDetail from './pages/HelpDetail';
import HelpCreate from './pages/HelpCreate';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Help,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: 'darkgray',
              style: {
                backgroundColor: '#fff',
                marginBottom: 15,
              },
            },
          },
        ),
        HelpDetail,
        HelpCreate,
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
        backBehavior: 'initialRoute',
      },
    ),
  );
