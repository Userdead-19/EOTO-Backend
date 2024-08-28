const express = require("express");
const newsletterController = require("../Controller/newsLetterController");

const router = express.Router();

// Route to create a new newsletter
router.post("/", newsletterController.createNewsletter);

// Route to get a newsletter by ID
router.get("/:id", newsletterController.getNewsletterById);

// Route to get all newsletters
router.get("/", newsletterController.getAllNewsletters);

// Route to update a newsletter by ID
router.put("/:id", newsletterController.updateNewsletterById);

// Route to delete a newsletter by ID
router.delete("/:id", newsletterController.deleteNewsletterById);

module.exports = router;
