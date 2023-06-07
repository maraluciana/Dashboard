import { Table, DatePicker } from 'antd';
import React from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { setCurrentDate } from '../actions/actions';
import store, { persistor } from '../store/index';
import { PersistGate } from 'redux-persist/integration/react';


const daysBefore = 5;
const daysAfter = 5; 

const generateDateColumns = () => {
  const columns = [];
  const currentDate = useSelector((state) => state.currentDate);
  const usersData = useSelector((state) => state.users);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  for (let i = -daysBefore; i <= daysAfter; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();

    columns.push({
      title: (
        <>
          <div>{dayOfWeek}</div>
          <div>{dayOfMonth}</div>
        </>
      ),
      dataIndex: `day${i}`,
      key: `day${i}`,
      width: 100,
      render: (text, record) => {
        const selectedFreeDays = record.selectedFreeDays;
        const dateString = date.toISOString().split('T')[0]; 
        if (selectedFreeDays.includes(dateString)) {
          return 'CO';
        }
        return text;
      },
    });
  }

  return columns;
};

const MyTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);

  const changeDate = (date) => {
    dispatch(setCurrentDate(date));
  };

  const dataSource = usersData.map((user, index) => {
    const location = user.location;
    const days = {};
  
    for (let i = -daysBefore; i <= daysAfter; i++) {
      days[`day${i}`] = location;
    }
  
    return {
      key: `${index + 1}`,
      name: user.name,
      freeDays: user.remainingFreeDays,
      selectedFreeDays: user.selectedFreeDays,
      ...days,
    };
  });
  
  

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left', width: 150 },
    { title: 'Free Days', dataIndex: 'freeDays', key: 'freeDays', fixed: 'left', width: 100 },
    ...generateDateColumns(),
  ];

  return (
    <div>
      <DatePicker onChange={changeDate} />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyTable />
      </PersistGate>
    </Provider>
  );
};

export default App;
