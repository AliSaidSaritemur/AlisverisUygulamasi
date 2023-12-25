import React, { useState, useEffect } from 'react';
import { StyleSheet,StatusBar,FlatList, Text, View,Image, Button,TouchableOpacity } from 'react-native';
import SessionsService from '../Services/SessionsService';
import UserService from '../Services/UserService';
import UserUpdate from '../components/UserUpdate';
import { getSession } from '../Services/SessionsService';
import { getAllUsers,deleteUser,updateUser } from '../Services/UserService'; 

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [user, setUser] = useState();
  const [modalUpdateIsVisible, setModalUpdateIsVisible] = useState(false); 
  const [updateInfoPressed, setUpdateInfoPressed] = useState(false);
  const [refreshPage,setRefreshPage]=useState(false);

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
  }, [updateInfoPressed,refreshPage]);

  const startModalUpdate = (user) => {
    setUser(user);
    setModalUpdateIsVisible(true)
  }; 
  const endModalUpdate=()=>{
    setModalUpdateIsVisible(false)
  };

  const UpdateUser =(id,email,name,password,surname,telNo,adress)=>{
    updateUser(id,email,name,password,surname,telNo,adress);
    endModalUpdate();
    setUpdateInfoPressed(true);
  }

  const UserList = ({ title }) => { 
    return (
      <View style={styles.item}>
        <Text>{title.Email}</Text>
        <TouchableOpacity style={styles.button} onPress={()=> startModalUpdate(user)}>
        <Text>Düzenle</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> {deleteUser(title.UserId);
                                                                setRefreshPage(!refreshPage);}}>
            <Text>Sil</Text>
        </TouchableOpacity>
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
  button: {
   fontSize:35,
    width:75,
    backgroundColor: '#0000FF',
    padding: 5,
    borderRadius:50,   
  },
  item: {
    backgroundColor: '#40e0d0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
