import userModel from "../model/userModel.js";
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.userType !== "admin") {
      return res.status(504).send({
        success: false,
        message: "only admin can access",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "un-authorised access",
    });
  }
};

export default isAdmin;
