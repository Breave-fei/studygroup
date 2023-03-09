var express = require('express');
var router = express.Router();
let upload = require('../utils/uploads');  // 引入文件上传配置

const userService = require('../service/userService')

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });


// 图片上传
router.post('/api/uploaduserimg', upload.single("file"), userService.uploadUserImg);

// 使用回调的方式封装简化代码

router.post("/login", userService.login);
// router.post('/api/login', userService.loginBase);
router.post('/adduser', userService.addUser);
router.get('/getusers', userService.getUsers);
// router.get('/getcountuser', userService.getCountUser);
router.put('/updateuser', userService.updateUser);
router.delete('/api/deleteuser', userService.deleteUser);
router.put('/api/changestate', userService.changeState);
router.put('/api/updatepassword', userService.updatePassword);
router.get('/api/getuseroption', userService.getUserOption);
router.get('/getusersearchdata', userService.getUserSearchData);
router.get('/getstusearchdata', userService.getStuSearchData);





module.exports = router;
