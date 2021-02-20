import request from "../Store/Utils/request";

export default {
  onLogin: async function (data) {
    try {
      const res = request({ url: "", method: 'POST', data });
      return res.data
    } catch (error) {}
  },
  onRegister: async function (data) {
    try {
      const res = request({ url: "", method: "post", data });
    } catch (error) {}
  },
};
