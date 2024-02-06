import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//register user
export const userRegisterController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    if (!username) {
      return res.status(501).send({ message: "username is required" });
    }
    if (!email) {
      return res.status(501).send({ message: "email is required" });
    }
    if (!password) {
      return res.status(501).send({ message: "password is required" });
    }
    if (!phone) {
      return res.status(501).send({ message: "phone is required" });
    }
    if (!address) {
      return res.status(501).send({ message: "address is required" });
    }
    if (!answer) {
      return res.status(501).send({ message: "answer is required" });
    }

    // user exist
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        message: "user already exist",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const newuser = new userModel({ ...req.body, password: hashedPassword });
    await newuser.save();
    res.status(200).send({
      success: true,
      message: "user register success",
      newuser,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while register user",
      error,
    });
  }
};

//login user
export const userLoginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(501).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(501).send({
        succ: false,
        message: "user not found",
      });
    }
    //match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    return res.status(200).send({
      success: true,
      message: "login success",
      user,
      token,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while Login user",
      error,
    });
  }
};

//get user
export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(501).send({
        success: false,
        message: "user not found",
      });
    }
    //hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while get user",
      error,
    });
  }
};

//update user
export const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(501).send({
        success: false,
        message: "user not exist",
      });
    }
    //update user
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "user updated success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "Error while update user",
      error,
    });
  }
};

//reset password
export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(501).send({
        success: false,
        message: "user not found",
      });
    }
    //match answer
    if (answer !== user.answer) {
      return res.status(501).send({
        success: false,
        message: "invalid email or answer",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "password reset success",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "Error while reset password",
      error,
    });
  }
};

//delete account
export const deleteAccountController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: "Account deleted success",
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while delete account",
      error,
    });
  }
};
