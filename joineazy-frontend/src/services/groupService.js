import api from "./api";

export const createGroup = async (payload) => {
  const { data } = await api.post("/groups", payload);
  return data;
};

export const getMyGroups = async () => {
  const { data } = await api.get("/groups/mygroups");
  return data;
};

export const addMember = async (groupId, payload) => {
  const { data } = await api.post(`/groups/${groupId}/members`, payload);
  return data;
};
