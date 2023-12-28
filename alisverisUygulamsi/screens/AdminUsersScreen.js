import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import SessionsService from '../Services/SessionsService';
import UserService from '../Services/UserService';
import UserUpdate from '../components/UserUpdate';
import { getSession } from '../Services/SessionsService';
import { getAllUsers, deleteUser, updateUser } from '../Services/UserService';

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [user, setUser] = useState();
  const [modalUpdateIsVisible, setModalUpdateIsVisible] = useState(false);
  const [updateInfoPressed, setUpdateInfoPressed] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [refreshPage]);
  useEffect(() => {
    const fetchId = async () => {
      const user = await getSession();
      setUser(user);
    };

    fetchId();
  }, [updateInfoPressed, refreshPage]);

  const startModalUpdate = (user) => {
    setUser(user);
    setModalUpdateIsVisible(true)
  };
  const endModalUpdate = () => {
    setModalUpdateIsVisible(false)
  };

  const UpdateUser = (id, email, name, password, surname, telNo, adress) => {
    updateUser(id, email, name, password, surname, telNo, adress);
    endModalUpdate();
    setUpdateInfoPressed(true);
  }

  const UserList = ({ title }) => {
    return (
      <View style={styles.item}>
        <Text>{title.Email}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => startModalUpdate(user)}>
            <Text style={styles.text}>Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delButton} onPress={() => {
            deleteUser(title.UserId);
            setRefreshPage(!refreshPage);
          }}>
            <Text style={styles.delText} >Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserList title={item} />}
      />
      <UserUpdate visible={modalUpdateIsVisible} onUpdateUser={UpdateUser} onCancel={endModalUpdate} user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#E0FFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden',
    width: '50%',
  },
  button: {
    fontSize: 35,
    width: 100,
    backgroundColor: '#02D8E9',
    padding: 5,
    borderRadius: 50,
    margin: 20,
  },
  delButton: {
    fontSize: 35,
    width: 100,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 50,
    margin: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  delText: {
    fontSize: 18,
    textAlign: 'center',
    color: "white",
  }
});