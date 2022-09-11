const express = require("express");
const Comment = require("../models/Comment");
const { verifyToken } = require("../middleware/auth");
const {
  validateUserComment,
  validateEditComment,
} = require("../middleware/validateuserinput");
const {
  SUCCESS_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  CREATED_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
} = require("../constants/statuscodes");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (req?.query?.productid) {
      // returns productComments along with username for each product
      const productComments = await Comment.find({
        product: req.query.productid,
      }).populate("user", "name");
      if (productComments && productComments.length > 0) {
        return res.status(SUCCESS_STATUS_CODE).json(productComments);
      } else {
        return res.status(SUCCESS_STATUS_CODE).json([]);
      }
    }
    res.status(BAD_REQUEST_STATUS_CODE).json({
      message: "Use producid as query parameter to fetch comments",
    });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  try {
    if (comment) {
      res.status(SUCCESS_STATUS_CODE).json(comment);
    } else {
      res.status(SUCCESS_STATUS_CODE).json({});
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

router.post("/", [validateUserComment, verifyToken], async (req, res) => {
  try {
    const rating = Math.round((req.body.rating + Number.EPSILON) * 100) / 100;
    const newComment = new Comment({
      product: req.body.productId,
      user: req.user.userId,
      rating,
      heading: req.body.heading,
      commentsText: req.body.commentsText,
      images: req.body.images,
      reviewedDate: new Date(),
    });
    await newComment.save();
    res.status(CREATED_STATUS_CODE).json(newComment);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

router.put("/:id", [validateEditComment, verifyToken], async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      if (req.body.rating) {
        comment.rating = req.body.rating;
      }
      if (req.body.heading) {
        comment.heading = req.body.heading;
      }
      if (req.body.commentsText) {
        comment.commentsText = req.body.commentsText;
      }
      if (req.body.images) {
        comment.images = req.body.images;
      }
      await comment.save();
      res.status(SUCCESS_STATUS_CODE).json(comment);
    } else {
      res.status(NOT_FOUND_STATUS_CODE).json({
        message: "No comment found with id: " + req.params.id,
      });
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      await comment.remove();
      res.status(SUCCESS_STATUS_CODE).json({
        message: "Comment with id: " + req.params.id + " is deleted ",
      });
    } else {
      res.status(NOT_FOUND_STATUS_CODE).json({
        message: "No comment found with id: " + req.params.id,
      });
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

module.exports = router;
