import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controller/posts.js";

// get all posts
router.get("/", getPosts);
// post post with
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/LikePost", likePost);

export default router;
