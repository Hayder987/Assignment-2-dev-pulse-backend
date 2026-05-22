
import { Router} from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleAccess } from "../../middleware/roleAccess.middleware";
import { USER_ROLES } from "../auth/auth.interface";
import validateIssue from "./issue.validation";
import { reqMethod } from "./issue.interface";


const router = Router();

router.post('/', authMiddleware(), validateIssue(reqMethod.post), issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.patch("/:id", authMiddleware(), validateIssue(reqMethod.patch), roleAccess(USER_ROLES.contributor, USER_ROLES.maintainer), issueController.updateIssue);
router.delete("/:id",authMiddleware(), roleAccess(USER_ROLES.maintainer) , issueController.deleteIssue);


export const issueRouter = router;

// roleAccess( USER_ROLES.maintainer)