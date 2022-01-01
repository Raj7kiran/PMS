import express from 'express'
const router = express.Router()
// import { getCountry, getState, getCity } from '../controller/dpController.js'
import { getCountry, getState, getCity } from '../controllers/adminController.js'


router.get('/country', getCountry)
router.get('/state/:country', getState)
router.get('/city/:state', getCity)

export default router