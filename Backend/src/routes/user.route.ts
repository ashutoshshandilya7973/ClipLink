import { Router } from "express";
import { userLogin, userRegistration } from "../controller/auth.controller.js";

const router=Router()

router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)

export {router}