import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, View, StatusBar } from 'react-native'; 
import { getAllUsers } from '../Services/UserService';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const UserList = ({ title }) => { 
    return (
      <View style={styles.item}>
        <Text>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserList title={item.Email} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
