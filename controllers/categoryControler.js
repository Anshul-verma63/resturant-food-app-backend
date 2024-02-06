import categoryModel from "../model/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "title is required",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    newCategory.save();
    return res.status(200).send({
      success: true,
      message: "category created success",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error: "Error while creating category",
    });
  }
};

//get all cat
export const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(505).send({
        success: false,
        message: "No category available",
      });
    }
    res.status(200).send({
      success: true,
      categoryCount: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error: "Error while get category",
    });
  }
};

//update cat
export const updateCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(505).send({
        success: false,
        message: "category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated success",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error: "Error while update category",
    });
  }
};

//delete
export const deleteCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete({ _id: req.params.id });

    res.status(200).send({
      success: true,
      message: "Category deleted success",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error: "Error while delete category",
    });
  }
};
