import api from "./axios";

export const loginAdmin = (data) => {
  return api.post("/login", data);
};
