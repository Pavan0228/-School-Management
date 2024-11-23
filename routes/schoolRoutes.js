import express from "express";
import {
    handleAddSchool,
    handleListSchools,
} from "../controllers/schoolController.js";
import { validateSchool, validateLocation } from "../middlewares/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.post("/addSchool", validateSchool, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    handleAddSchool(req, res).catch(next);
});

router.get("/listSchools", validateLocation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    handleListSchools(req, res).catch(next);
});

export default router;
