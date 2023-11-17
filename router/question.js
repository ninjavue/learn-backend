const express = require("express");
const router = express.Router();

const {
  createQues,
  getQues,
//   updateQues,
  deleteQues,
  getOneQues,
  getCatQues,
  getGameQues,
} = require("../controllers/question");

router
  .route("/")
  .get(getQues)
  .post(createQues);

router
  .route("/:id")
  .get(getOneQues)
//   .patch(updateQues)
  .delete(deleteQues);


router
  .route("/catId/:id")
  .get(getCatQues)

router
  .route("/game/:game")
  .get(getGameQues)

module.exports = router;