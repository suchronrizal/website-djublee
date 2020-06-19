const isLoggedIn = () => {
  const tokenData = localStorage.getItem('tokenData');
  const expDate = new Date(localStorage.getItem('exp'));
  const xpDt = expDate ? expDate.getTime() : false;
  const currentDate = new Date();
  const isTokenExpired = xpDt < currentDate.getTime();
  if (tokenData !== null && isTokenExpired === false) {
    return true;
  }
  return false;
};

const isTokenNotVerified = profileReducer => {
  const tokenData = localStorage.getItem('tokenData');
  const isTokenVerified = !!(
    profileReducer.userData !== undefined &&
    profileReducer.userData.data !== undefined &&
    profileReducer.userData.data.id !== undefined
  );
  if (tokenData !== null && isTokenVerified === false) {
    return true;
  }
  return false;
};

export { isLoggedIn, isTokenNotVerified };
