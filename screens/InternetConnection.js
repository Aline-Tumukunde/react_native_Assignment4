import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const InternetConnection = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { Color: isConnected ? '#d4edda' : '#f8d7da' }]}>
      <View style={styles.statusContainer}>
        {isConnected ? (
          <Text style={[styles.statusText, { color: 'green' }]}>Connected to the internet ✅</Text>
        ) : (
          <Text style={[styles.statusText, { color: 'red' }]}>No internet connection ❌</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
  statusContainer: {
    padding: 10,
    borderRadius: 5,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InternetConnection;
