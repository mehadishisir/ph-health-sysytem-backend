import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const uploadProfileImage = catchAsync(async(req:Request,res:Response)=>{
    console.log(req.file)
  sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New tokens generated successfully",
        data: null
    });
})

export const userController = {
    uploadProfileImage
}