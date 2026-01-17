import { Router } from "express";
import { body, param } from "express-validator";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

const expenseValidator = [
  body("title").notEmpty().withMessage("Title required"),
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be > 0"),
  body("category").notEmpty().withMessage("Category required"),
  body("date").isISO8601().toDate().withMessage("Valid date required"),
  body("note").optional().isString(),
];

router.use(authMiddleware);

router.get("/", getExpenses);
router.post("/", expenseValidator, createExpense);
router.put("/:id", [param("id").isMongoId(), ...expenseValidator], updateExpense);
router.delete("/:id", param("id").isMongoId(), deleteExpense);

export default router;
