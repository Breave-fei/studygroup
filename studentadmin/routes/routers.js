var express = require('express');
var router = express.Router();
const db = require('../server/db');

// 根据类型判断返回的是用户的权限表还是管理员的权限表
router.post("/getrouter", (req, res) => {
    console.log(req.body);
    let sql = `select * from router where 1=1 `
    let { type } = req.body
    if (type) {
        sql += `and type like '%${type}%'`
    } else {
        sql += `and type like '%user%'`
    }
    // console.log("后台搭建成功");
    db.base(sql, null, (result) => {
        // console.log(result);
        let data = {
            errno: 0,
            userRouters: result,
            msg: "路由获取成功"
        }
        res.send(data)
    })

})


// router.post('/getrouter', (req, res) => {
//     // console.log(req.body);
//     let { username, password } = req.body;  // post方式数据从body中获取
//     // console.log("进入数据库")
//     let sql = `select * from users where username = '${username}' and password = '${password}'`
//     db.base(sql, null, (result) => { // result 数组包对象格式
//         // console.log("loginBase", result);
//         if (result.length) {
//             // console.log(result[0].state);
//             if (result[0].userstate == 1) {
//                 // 判断用户类型生成路由
//                 if (result[0].type === "admin") {
//                     // console.log("admin");
//                     let user = result[0];
//                     // let routers = {
//                     //     path: '/manage',
//                     //     name: 'manage',
//                     //     redirect: "/manage/manageindex",
//                     //     component: () => import("@/views/Manage"),
//                     //     children: [
//                     //         {
//                     //             path: 'manageindex',
//                     //             name: 'manageindex',
//                     //             component: () => import("@/views/ManageIndex"),
//                     //             meta: {
//                     //                 requiresAuth: true,
//                     //                 title: '首页',
//                     //             }
//                     //         },
//                     //         {
//                     //             path: 'adduser',
//                     //             name: 'adduser',
//                     //             component: () => import("@/views/AddUser"),
//                     //             meta: {
//                     //                 requiresAuth: true,
//                     //                 title: '添加学生',
//                     //             }
//                     //         },
//                     //         {
//                     //             path: 'users',
//                     //             name: 'users',
//                     //             component: () => import("@/views/Users"),
//                     //             meta: {
//                     //                 requiresAuth: true,
//                     //                 title: '管理学生',
//                     //             }
//                     //         }
//                     //     ]
//                     // }
//                     let routers = [
//                         {
//                             path: 'manage/manageindex',
//                             name: 'manageindex',
//                             component: `ManageIndex`,
//                             meta: {
//                                 requiresAuth: true,
//                                 title: '首页',
//                             }
//                         },
//                         {
//                             path: 'manage/adduser',
//                             name: 'adduser',
//                             component: `AddUser`,
//                             meta: {
//                                 requiresAuth: true,
//                                 title: '添加学生',
//                             }
//                         },
//                         {
//                             path: 'manage/users',
//                             name: 'users',
//                             component: `Users`,
//                             meta: {
//                                 requiresAuth: true,
//                                 title: '管理学生',
//                             }
//                         }
//                     ]


//                     let data = {
//                         errno: 0,
//                         message: '登录成功',
//                         user,
//                         routers
//                     }
//                     res.send(data)


//                 } else {
//                     console.log("other");
//                 }


//             } else if (result[0].userstate == 0) {
//                 let data = {
//                     errno: 1,
//                     message: '用户被禁用，请联系管理员启用！',
//                 }
//                 res.send(data)
//             } else {
//                 let data = {
//                     errno: 1,
//                     message: '用户已注销，请重新注册！',
//                 }
//                 res.send(data)
//             }
//         } else {
//             let data = {
//                 errno: 1,
//                 msg: '登录失败 '
//             }
//             res.send(data);
//         }
//     });

// });

module.exports = router;