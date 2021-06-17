import express from "express";
import postController from "../controllers/postController";
import authController from "../controllers/authController";

const router = express.Router();

router.route("/photo/:postId").get(postController.photo);

// Protected all routes in below
router.use(authController.protect);

router.post("/create", postController.create);

router.get("/feed", postController.listNewsFeed);

router.get("/by/:userId", postController.listByUser);

// likes routes
router.route("/like").put(postController.like);
router.route("/unlike").put(postController.unlike);

// comments routes
router.route("/comment").put(postController.comment);
router.route("/uncomment").put(postController.uncomment);

// delete post
router.param("postId", postController.postByID);

router
  .route("/:postId")
  .delete(postController.isPoster, postController.deletePost);

export default router;
