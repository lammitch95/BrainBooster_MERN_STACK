const express = require('express')
const {getAllStudySet, getStudySet,createStudySets,deleteStudySet,updateStudySet} = require('../controllers/studySetController')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

//require authentication for all studyset routes
router.use(requireAuth)

router.get('/', getAllStudySet)

router.get('/:id', getStudySet)

router.post('/', createStudySets)

router.delete('/:id', deleteStudySet)

router.patch('/:id', updateStudySet)

module.exports = router