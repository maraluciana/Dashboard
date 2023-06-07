export const setCurrentDate = (date) => ({
    type: 'SET_CURRENT_DATE',
    payload: date,
  });

export const updateUsersData = (usersData) => {
return {
    type: "UPDATE_USERS_DATA",
    payload: usersData,
};
};
