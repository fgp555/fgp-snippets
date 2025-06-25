import { Router } from 'express';
const router = Router();
import * as $1Controller from '../controllers/$1Controller';

router.get('/', $1Controller.getAll);
router.get('/:id', $1Controller.getById);
router.post('/', $1Controller.create);
router.put('/:id', $1Controller.update);
router.delete('/:id', $1Controller.remove);

export default router;
