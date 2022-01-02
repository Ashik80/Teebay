export function getAuth() {
  const auth = JSON.parse(localStorage.getItem('auth'))
  return auth
}

export function authenticate(setLoggedIn, navigate) {
  let auth = JSON.parse(localStorage.getItem('auth'));
  if (auth && auth.token) {
    navigate('/');
    setLoggedIn(true);
  } else {
    navigate('/login');
    setLoggedIn(false);
  }
}
