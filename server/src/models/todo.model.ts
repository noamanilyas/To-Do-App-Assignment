import mongoose from "mongoose";

export const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    name: String,
    status: Boolean
  })
);
