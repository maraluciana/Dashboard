import React from "react";
import { Table, Input, DatePicker, Select } from "antd";
import { useDispatch, useSelector, Provider } from 'react-redux';
import { updateUsersData } from "../actions/actions";
import store, { persistor } from '../store/index';
import { PersistGate } from 'redux-persist/integration/react';


const { Option } = Select;

const UsersTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);

  const handleDataUpdate = (updatedData) => {
    dispatch(updateUsersData(updatedData));
  };

  const handleLocationChange = (value, record) => {
    const updatedUsersData = usersData.map((user) => {
      if (user.id === record.id) {
        return { ...user, location: value };
      }
      return user;
    });
    dispatch(updateUsersData(updatedUsersData));
  };

  const handleTotalFreeDaysChange = (e, record) => {
    const value = e.target.value;
    const updatedUsersData = usersData.map((user) => {
      if (user.id === record.id) {
        const remainingFreeDays = value - user.selectedFreeDays.length;
        return { ...user, totalFreeDays: value, remainingFreeDays };
      }
      return user;
    });
    dispatch(updateUsersData(updatedUsersData));
  };

  const handleDatePickerChange = (date, dateString, record) => {
    if (!date || record.remainingFreeDays === 0 || record.selectedFreeDays.includes(dateString)) {
      return; 
    }
    const updatedUsersData = usersData.map((user) => {
      if (user.id === record.id) {
        const selectedFreeDays = [...user.selectedFreeDays, dateString];
        const remainingFreeDays = user.remainingFreeDays - 1;
        return { ...user, selectedFreeDays, remainingFreeDays };
      }
      return user;
    });
    dispatch(updateUsersData(updatedUsersData));
  };

  const handleRemoveDay = (index, record) => {
    const updatedUsersData = usersData.map((user) => {
      if (user.id === record.id) {
        const selectedFreeDays = [...user.selectedFreeDays];
        selectedFreeDays.splice(index, 1);
        const remainingFreeDays = user.remainingFreeDays + 1;
        return { ...user, selectedFreeDays, remainingFreeDays };
      }
      return user;
    });
    dispatch(updateUsersData(updatedUsersData));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text, record) => (
        <Select value={text} onChange={(value) => handleLocationChange(value, record)}>
          <Option value="Home">Home</Option>
          <Option value="Office">Office</Option>
        </Select>
      ),
    },
    {
      title: "Total Free Days",
      dataIndex: "totalFreeDays",
      key: "totalFreeDays",
      render: (text, record) => (
        <Input value={text} onChange={(e) => handleTotalFreeDaysChange(e, record)} />
      ),
    },
    {
      title: "Remaining Free Days",
      dataIndex: "remainingFreeDays",
      key: "remainingFreeDays",
    },
    {
      title: "Selected Free Days",
      dataIndex: "selectedFreeDays",
      key: "selectedFreeDays",
      render: (text, record) => (
        <>
          <DatePicker
            onChange={(date, dateString) => handleDatePickerChange(date, dateString, record)}
            disabled={record.remainingFreeDays === 0} 
          />
          <ul>
            {text.map((day, index) => (
              <li key={index}>
                {day}
                <button onClick={() => handleRemoveDay(index, record)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ];

  return <Table dataSource={usersData} columns={columns} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UsersTable />
      </PersistGate>
    </Provider>
  );
};

export default App;

