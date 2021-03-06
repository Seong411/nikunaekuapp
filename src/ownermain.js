import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import CouponLog from './owner/couponlog';
import CustomerLog from './owner/customerlog';
import OwnerHome from './owner/home';
import OwnerAccount from './owner/myaccount';

import { GREY_80_COLOR, GREY_90_COLOR, WHITE_COLOR } from './models/colors';

const Drawer = createDrawerNavigator();

const OwnerMain = ({ route, navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="홈"
      drawerStyle={{
        backgroundColor: GREY_90_COLOR,
      }}
      drawerContentOptions={{
        activeBackgroundColor: GREY_80_COLOR,
        activeTintColor: WHITE_COLOR,
        inactiveTintColor: WHITE_COLOR,
        labelStyle: {
          fontSize: 18,
        },
      }}>
      <Drawer.Screen name="홈" component={OwnerHome} />
      <Drawer.Screen name="내 정보" component={OwnerAccount} />
      <Drawer.Screen name="쿠폰 사용량" component={CouponLog} />
      <Drawer.Screen name="고객 로그" component={CustomerLog} />
    </Drawer.Navigator>
  );
};

export default OwnerMain;
