// Authentication utilities

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

/**
 * Get authentication token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Set authentication token
 * @param {string} token
 */
export const setToken = (token: any) => {
  localStorage.setItem("token", token);
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  localStorage.removeItem("token");
};

/**
 * Logout user
 */
export const logout = () => {
  removeToken();
  window.location.href = "/login";
};
