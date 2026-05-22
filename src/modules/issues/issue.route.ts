
import { Router} from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleAccess } from "../../middleware/roleAccess.middleware";
import { USER_ROLES } from "../../types";
import validateIssue from "../auth/issue.validation";

const router = Router();

router.post('/', authMiddleware(), validateIssue, issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.patch("/:id", authMiddleware(),validateIssue, roleAccess(USER_ROLES.contributor, USER_ROLES.maintainer), issueController.updateIssue);


export const issueRouter = router;