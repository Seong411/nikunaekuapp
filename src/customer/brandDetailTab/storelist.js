import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BLACK_COLOR,
    GREY_10_COLOR,
    RED_COLOR,
    WHITE_COLOR,
  } from '../../models/colors';

const StoreItem = ({ storeName, address, contactNumber, seatState }) => {
    return (
      <View style={styles.storeItem}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.storeSeat}>잔여석: {seatState}</Text>
        <View style={styles.detail}>
            <Text style={styles.detailText}>주소: {address}</Text>
            <Text style={styles.detailText}>연락처: {contactNumber}</Text>
        </View>
      </View>
    );
  };

  const StoreList = ({ route, navigation }) => {
    const { data, otherParam } = route.params;
    const [storeList, setStoreList] = useState([]);
    const ref = firestore().collection('Brand').doc(data.id).collection('Stores');
  
    useEffect(() => {
      return ref.onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          const { storeName, address, contactNumber, seatState} = doc.data();
          items.push({
            storeName: storeName,
            address: address,
            contactNumber: contactNumber,
            seatState: seatState,
          });
        });
        setStoreList(items);
      });
    }, []);

    console.log(storeList)

    return (
        <>
          <View style={styles.scrollcontainer}>
            <FlatList
            data={storeList}
            renderItem={({ item }) => <StoreItem {...item} />}
            keyExtractor={(item) => item.storeName}
          />
          </View>
        </>
      );
    };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storeItem: {
        padding: 20,
        marginBottom: 2,
        backgroundColor: WHITE_COLOR,
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeName: {
        flex: 1.7,    
        fontSize: 16,
        color: BLACK_COLOR,
        fontWeight: 'bold',
    },
    storeSeat: {
      flex: 1,
      fontSize: 12,
      color: BLACK_COLOR,
      fontWeight: 'bold',
  },
    scrollcontainer: {
        flex: 1,
        backgroundColor: GREY_10_COLOR,
        justifyContent: 'center',
    },
    detail: {
        flex: 3,
    },
    detailText: {
        fontSize: 13,
        color: BLACK_COLOR,
    }
  });
  




export default StoreList;