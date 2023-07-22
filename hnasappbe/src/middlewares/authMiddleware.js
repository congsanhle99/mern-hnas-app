import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export default async function (req, res, next) {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }

  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      createHttpError.Unauthorized();
    }
    req.user = payload;
    next();
  });
}
