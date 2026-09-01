import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	NextFunction,
	type Application,
	type Request,
	type Response,
} from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { UserRoutes } from "./app/module/users/user.route";
import { success } from "zod";
import { getBkashIdToken } from "./app/lib/bkash";

const app: Application = express();

app.use(
	cors({
		origin: config.frontend_url,
		credentials: true,
	}),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes)




// Basic route
app.get("/", async (req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		message: "Welcome to PH Healthcare System Backend",
	});
});

app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
try {
	const grantToken = await getBkashIdToken()
	console.log(grantToken)
	res.status(httpStatus.OK).json({
		success:true,
		message:"welcome to PH Healthcare System Backend",
		data:null
	})
} catch (error) {
   console.log(error)
   next(error)
}
})

app.use(globalErrorHandler);
app.use(notFound);

export default app;
