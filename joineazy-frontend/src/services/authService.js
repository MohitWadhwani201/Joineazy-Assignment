import api from "./api";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  // backend expected { token, user }
  return data;
};

export const register = async (name, email, password, role) => {
  const { data } = await api.post("/auth/register", { name, email, password, role });
  return data;
};
