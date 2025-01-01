import { useState, useEffect } from "react";
import { Table, Select, message, Spin, Tag } from "antd";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { Option } = Select;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Current Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={roleColor(role)} className="capitalize">
          {role}
        </Tag>
      ),
    },
    
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Select
          defaultValue={record.role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(record._id, value)}
          disabled={updating}
        >
          <Option value="user">User</Option>
          <Option value="manager">Manager</Option>
          <Option value="admin">Admin</Option>
        </Select>
      ),
    },
  ];

  const roleColor = (role) => {
    const colors = {
      admin: 'red',
      manager: 'blue',
      user: 'gray',
    };
    return colors[role];
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/auth/getUsers', {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdating(true);
      await axios.put(
        `http://localhost:4000/api/auth/updateUser/${userId}`,
        { role: newRole },
        { withCredentials: true }
      );
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      
      message.success('Role updated successfully');
    } catch (error) {
      message.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-600">Manage user roles and permissions</p>
      </div>

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          scroll={{ x: true }}
          bordered
        />
      )}
    </div>
  );
};

export default AllUsers;