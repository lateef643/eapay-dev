export default {
  getToken: async function (data) {
    try {
      const res = await localStorage.getItem(data);
      return res;
    } catch (error) {
      console.error("localstorage getToken", error);
    }
  },
  setToken: async function (data) {
    try {
      await localStorage.setItem(data);
    } catch (error) {
      console.error("localstorsage setItem", error);
    }
  },
};
