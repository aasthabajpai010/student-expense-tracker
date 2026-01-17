import { Router } from "express";
import { body, param } from "express-validator";
import {
  createBudget,
  deleteBudget,
  getBudgets,
  updateBudget,
} from "../controllers/budgetController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

const budgetValidator = [
  body("month")
    .matches(/^[0-9]{4}-(0[1-9]|1[0-2])$/)
    .withMessage("Month must be YYYY-MM"),
  body("limit").isFloat({ gt: 0 }).withMessage("Limit must be > 0"),
];

router.use(authMiddleware);

router.get("/", getBudgets);
router.post("/", budgetValidator, createBudget);
router.put("/:id", [param("id").isMongoId(), ...budgetValidator], updateBudget);
router.delete("/:id", param("id").isMongoId(), deleteBudget);

export default router;
