import React, { useEffect, useState } from 'react';
import { Button, Table, Drawer, message, Form } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';
import UserForm from './UserForm'; // Correct import

const UserManagementGrid = () => {
  const [usersList, setUsersList] = useState([]);
  const [openUsersDrawer, setOpenUsersDrawer] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [formRef] = Form.useForm();

  useEffect(() => {
    getUsersDetails();
  }, []);

  const getUsersDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/Users/getUsers');
      setUsersList(response.data.data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const editFormData = (record) => {
    setInitialValues(record);  // For editing, set the initial values.
    setOpenUsersDrawer(true);
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete('http://localhost:3000/api/Users/deleteUsers', {
        data: { id }
      });
      if (response.data.status) {
        message.success(response.data.internalMessage);
        setUsersList(usersList.filter(user => user._id !== id));  
      } else {
        message.error(response.data.internalMessage);
      }
    } catch (err) {
      console.log('Error deleting user:', err.message);
      message.error('Error occurred while deleting user');
    }
  };

  const drawerOnClose = () => {
    setOpenUsersDrawer(false);
    setInitialValues(null);  // Reset the form when closing
    formRef.resetFields();
  };

  const handleUpdate = (updatedUser) => {
    if (updatedUser._id) {
      // Update the existing user
      setUsersList((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        )
      );
    } else {
      // If no _id, add a new user
      setUsersList((prevUsers) => [...prevUsers, updatedUser]);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <EditFilled onClick={() => editFormData(record)} style={{ color: 'blue', marginRight: 8 }} />
          <DeleteFilled onClick={() => deleteUser(record._id)} style={{ color: 'red' }} />
        </>
      ),
    },
  ];

  return (
    <>
      {/* Heading with centered text and background color */}
      <h2 style={{ textAlign: 'center', backgroundColor: '#8B4513', color: '#fff', padding: '10px' }}>
        User Management System
      </h2>
      {/* Create User button with green color */}
      <Button 
        onClick={() => setOpenUsersDrawer(true)} 
        style={{ backgroundColor: 'green', color: 'white', marginBottom: '16px' }}
      >
        Create User
      </Button>
      <Table dataSource={usersList} columns={columns} rowKey="_id" />
      <Drawer title="User Form" open={openUsersDrawer} onClose={drawerOnClose}>
        <UserForm 
          initialValues={initialValues} 
          formRef={formRef} 
          drawerOnClose={drawerOnClose} 
          onUpdate={handleUpdate} 
        />
      </Drawer>
    </>
  );
};

export default UserManagementGrid;
