import db from "../Database";
import { User } from "../types";
let { users } = db;
export const createUser = (user: User) => {
 const newUser = { ...user, _id: Date.now().toString() };
 users = [...users, newUser];
 return newUser;
};
export const findAllUsers = () => users;
export const findUserById = (userId: string) => users.find((user) => user._id === userId);
export const findUserByUsername = (username: string) => users.find((user) => user.username === username);
export const findUserByCredentials = (username: string, password: string) =>
  users.find( (user) => user.username === username && user.password === password );
export const updateUser = (userId: string, user: User) => (users = users.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId: string) => (users = users.filter((u) => u._id !== userId));