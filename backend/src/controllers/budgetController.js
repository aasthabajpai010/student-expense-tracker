import { validationResult } from "express-validator";
import { Budget } from "../models/Budget.js";

export const getBudgets = async (req, res, next) => {
  try {
    const { month } = req.query;
    const query = { userId: req.user.id };
    if (month) query.month = month;

    const budgets = await Budget.find(query).sort({ month: -1 });
    res.json({ budgets });
  } catch (error) {
    next(error);
  }
};

export const createBudget = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", details: errors.array() });
  }

  try {
    const payload = { ...req.body, userId: req.user.id };
    const budget = await Budget.create(payload);
    res.status(201).json({ budget });
  } catch (error) {
    if (error.code === 11000) {
      error.statusCode = 409;
      error.message = "Budget for this month already exists";
    }
    next(error);
  }
};

export const updateBudget = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", details: errors.array() });
  }

  try {
    const { id } = req.params;
    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ budget });
  } catch (error) {
    next(error);
  }
};

export const deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Budget.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ message: "Budget deleted" });
  } catch (error) {
    next(error);
  }
};
