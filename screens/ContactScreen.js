import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, PermissionsAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';

export default class ContactList extends Component {
  state = {
    contacts: null,
    isLoading: false
  };

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = async () => {
    try {
      this.setState({ isLoading: true });

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const { data } = await Contacts.getContactsAsync();
          this.setState({ contacts: data, isLoading: false });
        } else {
          console.warn('Permission to access contacts was denied');
          this.setState({ isLoading: false });
        }
      } else if (Platform.OS === 'ios') {
        const { data } = await Contacts.getContactsAsync();
        this.setState({ contacts: data, isLoading: false });
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { contacts, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Contacts List</Text>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          contacts && (
            <FlatList
              data={contacts}
              renderItem={({ item }) => <Text>{item.name}</Text>}
              keyExtractor={(item) => item.id.toString()}
            />
          )
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 20,
    marginBottom: 2,
  },
});
