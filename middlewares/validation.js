import { body, query } from "express-validator";

export const validateSchool = [
    body("name").trim().notEmpty().withMessage("School name is required"),
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
    body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),
];

export const validateLocation = [
    query("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
    query("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),
];
