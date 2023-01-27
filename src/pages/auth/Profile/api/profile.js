import request from "@utils/axiosUtil";

export const empInfo = async () => {
  const { data } = await request.get("/emp/loginlist");
  return data;
};

export const registerLoginUser = async (user) => {
  const { data } = await request.post("/emp/registerLoginUser", user);
  return data;
};
