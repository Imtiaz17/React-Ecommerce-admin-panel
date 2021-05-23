import cookie from "js-cookie";

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//set info to localstorage
export const setLocalstorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage
export const removeLocalstorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//authenticate data
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalstorage("user", data.user);
  next();
};
