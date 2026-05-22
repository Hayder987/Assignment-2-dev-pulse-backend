
import { Router} from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post('/', authMiddleware, issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id")


export const issueRouter = router;