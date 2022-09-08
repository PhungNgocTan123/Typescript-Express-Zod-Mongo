import { Router } from 'express'
import * as TodoHandler from './todos.handlers'

const router = Router();


router.get('/', TodoHandler.findAll);

router.post('/', TodoHandler.createOne);

router.get('/:id', TodoHandler.findOne);

router.put('/:id', TodoHandler.update);

router.delete('/:id', TodoHandler.deleteOne);

export default router;