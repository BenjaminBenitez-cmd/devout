const express = express();
const router = express.Router();

router.route("/").get().post().delete().patch().put();

module.exports.productRouter = router;
