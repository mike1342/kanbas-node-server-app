import { User } from "../types";
import model from "./model";

export const createUser = (user: User) => {
  delete user._id
  return model.create(user);
} // implemented later
export const findAllUsers = () => model.find();
export const findUserById = (userId: string) => model.findById(userId);
export const findUserByUsername = (username: string) =>  model.findOne({ username: username });
export const findUserByCredentials = (username: string, password: string) =>  model.findOne({ username, password });
export const updateUser = (userId: string, user: User) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId: string) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role: string) => model.find({ role: role }); // or just model.find({ role })
export const findUsersByPartialName = (partialName: string) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
