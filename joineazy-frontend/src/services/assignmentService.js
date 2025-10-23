import api from "./api";

export const fetchAdminAssignments = async () => {
  const { data } = await api.get("/assignments/admin");
  return data;
};

export const fetchStudentAssignments = async () => {
  const { data } = await api.get("/assignments/student");
  return data;
};

export const createAssignment = async (payload) => {
  const { data } = await api.post("/assignments", payload);
  return data;
};

export const updateAssignment = async (id, payload) => {
  const { data } = await api.put(`/assignments/${id}`, payload);
  return data;
};

export const deleteAssignment = async (id) => {
  const { data } = await api.delete(`/assignments/${id}`);
  return data;
};

export const confirmSubmission = async (groupId, assignmentId) => {
  const { data } = await api.post(`/groups/${groupId}/assignments/${assignmentId}/submit`);
  return data;
};
