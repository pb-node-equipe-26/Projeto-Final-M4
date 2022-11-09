import { ensureAuth } from './../middlewares/ensureAuth.middleware';
import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import profileUserController from '../controllers/users/profileUser.controller';

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("",ensureAuth, listUsersController);
userRoutes.get("/profile",ensureAuth, profileUserController);
userRoutes.patch("/:id",ensureAuth, updateUserController);
userRoutes.delete("/:id",ensureAuth, deleteUserController);

export default userRoutes;
