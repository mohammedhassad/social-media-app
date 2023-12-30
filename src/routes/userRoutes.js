import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";

const router = express.Router();

router.get("/", userController.getUsers);

router.get("/photo/:userId", userController.photo);

// Protected all routes in below
router.use(authController.protect);

router.put("/follow", userController.addFollowing, userController.addFollower);
router.put(
  "/unfollow",
  userController.removeFollowing,
  userController.removeFollower
);

// Find Users to follow theme
router.get("/find-users/:userId", userController.findUsers);

router
  .route("/:userId")
  .get(userController.getUser)
  .put(
    userController.uplaodUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(userController.deleteUser);

export default router;
