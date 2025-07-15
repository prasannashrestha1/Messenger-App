import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
};
export const login = async (req, res) => {
  res.send("done");
};
export const logout = async (req, res) => {
  res.send("done");
};
