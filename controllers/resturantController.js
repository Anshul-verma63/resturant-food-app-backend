import resturantModel from "../model/resturantModel.js";

export const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      time,
      foods,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(404).send({
        success: false,
        message: "please provide title or coords",
        error,
      });
    }

    const newResturant = new resturantModel({
      title,
      imageUrl,
      time,
      foods,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    return res.status(200).send({
      success: true,
      message: "resturant created success",
      newResturant,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error while creating resturant",
    });
  }
};

//get all resturant
export const getAllResturant = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    //in not
    if (!resturants) {
      return res.status(500).send({
        success: false,
        message: "No resturant available",
      });
    }
    res.status(200).send({
      success: true,
      resturantCount: resturants.length,
      resturants,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error while fetch resturants",
    });
  }
};
//get single
export const getSingleResturant = async (req, res) => {
  try {
    const resturant = await resturantModel.findById({ _id: req.params.id });
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error while fetch resturant",
    });
  }
};
//delete resturant
export const deleteResturant = async (req, res) => {
  try {
    await resturantModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "resurant deleted success",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error while delete resturant",
    });
  }
};
