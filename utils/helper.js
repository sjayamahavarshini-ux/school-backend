import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, "12345SKY", {
    expiresIn: "1d",
  });
};