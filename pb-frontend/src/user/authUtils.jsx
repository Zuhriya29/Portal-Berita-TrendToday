// src/utils/auth.js
export function getUser() {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
}

export function isLoggedIn() {
  return !!localStorage.getItem("user");
}

export function getUserId() {
  const user = getUser();
  return user?.id || null;
}
