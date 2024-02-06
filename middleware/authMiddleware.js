import JWT from "jsonwebtoken";
export const isUser = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.body.id = decode.id;
    next();
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error in auth api",
      error,
    });
  }
};
