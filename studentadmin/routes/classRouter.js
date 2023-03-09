var express = require('express');
var router = express.Router();

const classService = require('../service/classService')

router.get('/getclass', classService.getClass);
router.get('/getclasspage', classService.getClassPage);
router.put('/updateuserclass', classService.updateUserClass);
router.put('/outclass', classService.outClass);
router.put('/updateclass', classService.updateClass);
router.post('/addclass', classService.addClass);
router.delete('/delclass', classService.delClass);





module.exports = router;