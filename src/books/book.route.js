import express from "express";
import { deleteBook, getAllBooks, getSingleBook, postABook, updateBook } from "./book.controller.js";
import { verifyAdminToken } from "../middleware/verfiyAdminToken.js";

const router = express.Router();

router.post('/create-book', verifyAdminToken, postABook);
router.get('/', getAllBooks);
router.get('/:id', getSingleBook);
router.put('/edit/:id', verifyAdminToken, updateBook);
router.delete('/:id', verifyAdminToken, deleteBook);

export default router