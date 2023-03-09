var express = require('express');
var router = express.Router();

const newsService = require('../service/newsService')

router.post('/addnews', newsService.addNews);
router.get('/getnews', newsService.getNews);
router.put('/updatenews', newsService.updateNews);
router.delete('/delnews', newsService.delNews)



module.exports = router