import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_EXCHANGE_URL;

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export const formatUrl = (url, params) => {
  const param =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : '';
  return `${url}${param}`;
};


export const httpPost = (url, data) =>
  new Promise((resolve) => {
    let axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios
      .post(url, data, axiosConfig, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

  export const httpGet = async (url, params) =>
  new Promise((resolve) => {
    let axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios
      .get(formatUrl(url, params), axiosConfig, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

  /* PUT Request you will get exect response you have to extrect data from it in the saga itself */
export const httpPut = (url, data) =>
new Promise((resolve) => {
  axios
    .put(url, data, {
      withCredentials: true,
    })
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      resolve(error.response);
    });
});

/* PATCH Request */
export const httpPatch = (url, data, params = {}) =>
new Promise((resolve, reject) => {
  axios
    .patch(formatUrl(url, params), { withCredentials: true }, data)
    .then((res) => {
      resolve(res?.data);
    })
    .catch((error) => {
      reject(error.response);
    });
});

/* DELETE Request */
export const httpDelete = (url, params = {}) =>
new Promise((resolve, reject) => {
  axios
    .delete(formatUrl(url, { withCredentials: true }, params))
    .then((res) => {
      resolve(res?.data);
    })
    .catch((error) => {
      reject(error.response);
    });
});

export const scrollTopFunction = () => {
  window.scrollTo({
    top: 0,
    behavior: 'auto',
  })
}

