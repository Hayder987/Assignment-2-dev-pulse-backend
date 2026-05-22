import { USER_ROLES } from './../../types/index';

import { Router} from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleAccess } from "../../middleware/roleAccess.middleware";

const router = Router();

router.post('/', authMiddleware, issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.patch("/:id",authMiddleware, roleAccess(USER_ROLES.maintainer, USER_ROLES.contributor), issueController.updateIssue);


export const issueRouter = router;