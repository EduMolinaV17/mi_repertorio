import { Router } from 'express'
import { deleteRepertorio, getHtml, getRepertorio, postRepertorio, putRepertorio } from '../controllers/repertorioControllers.js'
const router = Router()

router.get('/', getHtml)
router.get('/canciones', getRepertorio)
router.post('/canciones', postRepertorio)
router.put('/canciones/:id', putRepertorio)
router.delete('/canciones', deleteRepertorio)

export default router
