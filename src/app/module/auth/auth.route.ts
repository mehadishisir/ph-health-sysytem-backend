import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";

import { catchAsync } from "../../utils/catchAsync";
import z from "zod";
import { UserValidation } from "./auth.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();


router.post("/register",validateRequest(UserValidation.PatientRegistrationZodSchema),AuthController.registerPatient);
router.post("/verify-email",validateRequest(UserValidation.PatientEmailVerifyZodSchema),
AuthController.verifyPatientEmail)

router.post("/login", AuthController.loginUser);
router.post("/forgot-password", AuthController.forgotPassword)
router.post("/reset-password",validateRequest(UserValidation.ResetPasswordZodSchema), AuthController.resetPassword)
router.get(
	"/me",
	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
	AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
export const AuthRoutes = router;
