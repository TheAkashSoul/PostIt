import mongoose, { Schema } from "mongoose";

const savedSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedPosts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    default: [],
  },
});

const Saved = mongoose.models.Saved || mongoose.model("Saved", savedSchema);

export default Saved;
