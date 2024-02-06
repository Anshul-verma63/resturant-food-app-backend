import foodModel from "../model/foodModel.js";
import orderModel from "../model/orderModel.js";

export const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      imageUrl,
    } = req.body;
    if (!title || !description || !category || !resturant || !price) {
      return res.status(504).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      category,
      resturant,
      imageUrl,
      rating,
      code,
      isAvailable,
      foodTags,
    });
    await newFood.save();
    return res.status(200).send({
      success: true,
      message: "food created sucess",
      newFood,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while create food",
    });
  }
};

//get all food
export const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(504).send({
        success: false,
        message: "No food available",
      });
    }
    res.status(200).send({
      success: true,
      foods,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while get food",
    });
  }
};

//get single food
export const getSingleFood = async (req, res) => {
  try {
    const food = await foodModel.findById({ _id: req.params.id });
    if (!food) {
      return res.status(504).send({
        success: false,
        message: "No food available",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while get food",
    });
  }
};

//get foood by resturant
export const getFoodByResturant = async (req, res) => {
  try {
    const food = await foodModel.find({ resturant: req.params.id });
    if (!food) {
      return res.status(504).send({
        success: false,
        message: "No food available",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while get food by resturant",
    });
  }
};

//update food
export const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      imageUrl,
    } = req.body;

    if (!foodId) {
      return res.status({
        success: false,
        messsage: "please provide food id",
      });
    }
    //update food
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        category,
        resturant,
        imageUrl,
        rating,
        code,
        isAvailable,
        foodTags,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "food updated success",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while update food",
    });
  }
};

//delete food
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Food id not found",
      });
    }
    const food = await foodModel.findByIdAndDelete({ _id: req.params.id });
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "No food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food deleted succes",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while delete food",
    });
  }
};

//order controller
export const placedOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(504).send({
        success: false,
        message: "please provide cart",
      });
    }
    //calculate price
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    //place order
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    return res.status(200).send({
      success: true,
      message: "order placed sucesss",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while placed order",
    });
  }
};

//update status order
export const updateStatusOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const updateOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updateOrder) {
      return res.status(504).send({
        success: false,
        message: "No order find with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "order updated success",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error while update order",
    });
  }
};
