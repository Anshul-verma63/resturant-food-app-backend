import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvb2zqH0-DVpijUfVB70vy-WworH3sKo3eDQ&usqp=CAU",
    },
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);
