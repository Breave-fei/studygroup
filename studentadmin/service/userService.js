const db = require('../server/db');

let { setToken } = require('../utils/token')

// 登录
exports.login = async (req, res) => {
    // 从数据库获取数据
    // let { username, password } = req.query;  // get方式数据从query中获取
    let { username, password, type } = req.body;  // post方式数据从body中获取
    let user = {};  // 存储当前用户信息
    // console.log(req.body)
    // 获取用户对应的班级信息
    let classData = [];
    await db.base(`select * from class where state = '1'`, null, (result) => {
        classData = result
        // console.log("classData111", classData);
    })

    let sql = `select * from users where username = '${username}' and password = '${password}' and type = '${type}'`
    db.base(sql, null, (result) => { // result 数组包对象格式
        // console.log("login", result);
        if (result.length) {
            // console.log(result[0].state);
            if (result[0].userstate == 1) {
                // 调用生成token的方法
                setToken(username).then(token => {
                    // if (!result[0].userurl) {
                    //     result[0].userurl = "http://localhost:3000/uploadImg/user.jpeg"
                    // }
                    result.forEach(item => {
                        console.log("000");
                        if (!item.userurl) {
                            item.userurl = "http://localhost:3000/uploadImg/user.jpeg"
                        }
                        classData.forEach(i => {
                            // console.log(item.cid, i.id);
                            if (item.cid == i.id) {
                                item.classname = i.classname;
                                item.classroom = i.classroom;
                                item.teacher = i.teacher;
                                item.classstartdate = i.startdate;
                                item.classstate = i.classstate;
                                item.state = i.state
                                item.number = i.number;
                            }
                        })
                        // console.log("111", result[0]);
                    });
                    console.log("user", result[0]);
                    let data = {
                        errno: 0,
                        msg: '登录成功',
                        user: result[0],
                        token: token
                        //前端获取token后存储在localStroage中,
                        //**调用接口时 设置axios(ajax)请求头Authorization的格式为`Bearer ` +token
                    }
                    res.send(data)
                })
            } else if (result[0].userstate == 0) {
                let data = {
                    errno: 1,
                    msg: '用户被禁用，请联系管理员启用！',
                }
                res.send(data)
            } else {
                let data = {
                    errno: 1,
                    msg: '用户已注销，请重新注册！',
                }
                res.send(data)
            }
        } else {
            let data = {
                errno: 1,
                msg: '登录失败 '
            }
            res.send(data);
        }
    });
}

// 用户头像上传
exports.uploadUserImg = (req, res) => {
    let userurl = "http://localhost:3000/uploadImg/" + req.file.filename
    // console.log(req.file.filename);
    let data = {
        errno: 0,
        userurl,
        msg: '图片上传成功'
    }
    res.send(data);
}





// 添加用户
exports.addUser = (req, res) => {
    console.log(req.body);
    let { username, password, name, userurl, type, paystate, phone, sex, introduce } = req.body
    let userstate = "1"  // 用户状态，1启用（默认），0禁用
    let uid = 0;  // 预设用户id（学号）
    // 无姓名时账号为姓名
    if (!name) {
        name = username;
    }
    // 除了用户以外的用户缴费状态都为null
    if (!paystate || type != "user") {
        paystate = "null";  // 用户是否缴费
    }
    // 根据用户类型生成ID编码
    db.base(`select count(id) as count from users where type = '${type}'`, null, (result) => {
        let countUser = 0;  // 预设各类用户数
        if (result) {
            // 计算人数时加一为当前人数
            countUser = result[0].count + 1
            let add = "0"
            for (let i = 1; i < 4; i++) {
                if (1000 / (10 ** i)) {
                    add += "0"
                }
            }
            if (type == "user") {
                countUser = "U" + add + countUser;
            } else if (type == "admin") {
                countUser = "A" + add + countUser;
            } else if (type == "teacher") {
                countUser = "T" + add + countUser;
            }
            uid = countUser

            // console.log("uid", uid);
            // console.log("countUser", countUser);
        }
        let cid = "0"
        let sql = `insert into users (uid,cid, username,password, name, userurl, type, userstate, paystate, phone, sex, introduce ) values (?,?,?,?,?,?,?,?,?,?,?,?);`
        let data = [uid, cid, username, password, name, userurl, type, userstate, paystate, phone, sex, introduce];

        db.base(sql, data, result => {
            // console.log("addUser", result);
            if (result.insertId) {  // 判断自增数据的id是否为空
                let data = {
                    errno: 0,
                    msg: "用户注册成功！"
                }
                res.send(data);
            } else {
                let data = {
                    errno: 1,
                    msg: '用户注册失败 '
                }
                res.send(data);
            }
        })
    })

}





// 获取所有用户
exports.getUsers = async (req, res) => {
    let { page, pageSize, type } = req.query;

    // console.log(page, pageSize, type);
    // 分页查询 limit 5,10 （从第5条开始的10条数据）
    let start = (page - 1) * pageSize;
    let sql = `select * from users where userstate <> 'null'`;
    if (type) {  // 按用户类型获取信息
        sql += ` and type = '${type}'`;
    }
    sql += ` order by cid desc`;
    if (page && pageSize) {
        sql += ` limit ${start},${pageSize}`;
    }
    // 获取用户对应的班级信息
    let classData = [];
    await db.base(`select * from class where state = '1'`, null, (result) => {
        classData = result
        // console.log("classData111", classData);
    })

    db.base(sql, null, (result) => {
        // console.log(result);
        result.forEach(item => {
            if (!item.userurl) {
                item.userurl = "http://localhost:3000/uploadImg/user.jpeg"
            }
            classData.forEach(i => {
                if (item.cid == i.id) {
                    item.classname = i.classname;
                    item.classroom = i.classroom;
                    item.teacher = i.teacher;
                    item.classstartdate = i.startdate;
                    item.classstate = i.classstate;
                    item.state = i.state
                    item.number = i.number;
                }
            })
            // console.log("classData222", classData);
        });
        // console.log("遍历后数据", result)
        if (result.length) {
            // 计算数据条数
            sql = `select count(id) as count from users where userstate <> 'null'`
            if (type) {
                sql = `select count(id) as count from users where userstate <> 'null' and type = '${type}' `
            }
            db.base(sql, null, (resCount) => {
                let data = {
                    errno: 0,
                    result,
                    resCount: resCount[0].count,
                }
                res.send(data);
            })
            // let data = {
            //     errno: 0,
            //     result,
            // }
            // res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: '用户数据查询失败 '
            }
            res.send(data);
        }
        // console.log(result);
    })
}





// 获取检索的用户
exports.getUserSearchData = (req, res) => {
    let { search, page, pageSize, type } = req.query;
    console.log(req.query);
    // 分页查询 limit 5,10 （从第5条开始的10条数据）
    let start = (page - 1) * pageSize;
    let sql = `select * from users where userstate <> 'null' and username like '%${search}%' order by id desc limit ${start},${pageSize}`;
    if (type) {
        sql = `select * from users where userstate <> 'null' and username like '%${search}%' and type = '${type}' order by id desc limit ${start},${pageSize}`;
    }

    db.base(sql, null, (result) => {
        // console.log(result);
        result.forEach(item => {
            if (!item.userurl) {
                item.userurl = "http://localhost:3000/uploadImg/user.jpeg"
            }
        });
        // console.log("遍历后数据", result)
        if (result.length) {
            // 计算数据条数
            sql = `select count(id) as count from users where userstate <> 'null' and username like '%${search}%'`
            if (type) {
                sql = `select count(id) as count from users where userstate <> 'null' and username like '%${search}%' and type = '${type}'`
            }

            db.base(sql, null, (resCount) => {
                let data = {
                    errno: 0,
                    result,
                    resCount: resCount[0].count,
                }
                res.send(data);
            })
        } else {
            let data = {
                errno: 1,
                msg: '用户数据查询失败 '
            }
            res.send(data);
        }
        // console.log(result);
    })
}





// 获取检索的学员
exports.getStuSearchData = async (req, res) => {
    let { search, page, pageSize, type, paystate, cid } = req.query;
    console.log(req.query);
    // 分页查询 limit 5,10 （从第5条开始的10条数据）
    let start = (page - 1) * pageSize;
    // 获取用户对应的班级信息
    let classData = [];
    await db.base(`select * from class`, null, (result) => {
        classData = result
        // console.log("classData111", classData);
    })

    // let sql = `select * from users where userstate <> 'null' and name like '%${search}%' and type = '${type}' order by id desc limit ${start},${pageSize}`;
    let sql = `select * from users where userstate <> 'null'`;
    if (paystate) {
        sql += ` and paystate = '${paystate}'`
    }
    if (cid) {
        sql += ` and cid = '${cid}'`
    } else if (cid === "0") {
        sql += ` and cid = '0'`
    }
    if (search) {
        sql += ` and name like '%${search}%'`
    }
    sql += ` and type = '${type}' order by id desc limit ${start},${pageSize}`
    console.log(sql);
    db.base(sql, null, (result) => {
        result.forEach(item => {
            if (!item.userurl) {
                item.userurl = "http://localhost:3000/uploadImg/user.jpeg"
            }
            classData.forEach(i => {
                if (item.cid == i.id) {
                    item.classname = i.classname;
                    item.classroom = i.classroom;
                    item.teacher = i.teacher;
                    item.classstartdate = i.startdate;
                    item.classstate = i.classstate;
                    item.number = i.number;
                }
            })
            // console.log("classData222", classData);
        });
        // console.log("遍历后数据", result)
        if (result.length) {
            // 计算数据条数
            sql = `select count(id) as count from users where userstate <> 'null'`;
            if (paystate) {
                sql += ` and paystate = '${paystate}'`
            }
            if (cid) {
                sql += ` and cid = '${cid}'`
            } else if (cid === "0") {
                sql += ` and cid = '0'`
            }
            if (search) {
                sql += ` and name like '%${search}%'`
            }
            sql += ` and type = '${type}' order by id desc limit ${start},${pageSize}`
            // sql = `select count(id) as count from users where userstate <> 'null' and name like '%${search}%' and type = '${type}'`
            db.base(sql, null, (resCount) => {
                let data = {
                    errno: 0,
                    result,
                    resCount: resCount[0].count,
                }
                res.send(data);
            })
        } else {
            let data = {
                errno: 1,
                msg: '未查到对应用户数据'
            }
            res.send(data);
        }
    })
}





// 修改用户
exports.updateUser = async (req, res) => {
    console.log(req.body);
    let { id, cid, uid, username, name, password, userurl, paystate, phone, sex, introduce, type } = req.body;
    // let sql = `update users set name='${name}',userurl= '${userurl}', type= '${type}', sex='${sex}', introduce='${introduce}' where id=${id} and username='${username}' `;
    // 查询用户班级数据
    let ClassData = [];
    if (cid) {
        await db.base(`select * from class where id = ${cid}`, null, ClassRes => {
            if (ClassRes) {
                ClassData = ClassRes[0]
            }
        })
    }

    let sql = `update users set`;
    if (id) {
        sql += ` id='${id}'`
    }
    if (uid) {
        sql += `, uid='${uid}'`
    }
    if (name) {
        sql += `, name='${name}'`
    }
    if (password) {
        sql += `, password='${password}'`
    }
    if (userurl) {
        sql += `, userurl= '${userurl}'`
    }
    if (paystate) {
        sql += `, paystate= '${paystate}'`
    }
    if (phone) {
        sql += `, phone= '${phone}'`
    }
    if (sex) {
        sql += `, sex='${sex}'`
    }
    if (introduce) {
        sql += `, introduce='${introduce}'`
    }
    if (type) {
        sql += `, type= '${type}'`
    }
    sql += ` where id=${id} and username='${username}'`
    db.base(sql, null, async (result) => {
        if (result.changedRows) {
            // 获取修改后的用户数据
            await db.base(`select * from users where id = ${id}`, null, (userRes) => {
                if (userRes) {

                    // classData = classRes[0]
                    // console.log("classData111", classData);
                    if (!userRes[0].userurl) {
                        userRes[0].userurl = "http://localhost:3000/uploadImg/user.jpeg"
                    }
                    if (cid) {
                        userRes[0].classname = ClassData.classname;
                        userRes[0].classroom = ClassData.classroom;
                        userRes[0].classstartdate = ClassData.startdate;
                        userRes[0].classstate = ClassData.classstate;
                        userRes[0].number = ClassData.number;
                        userRes[0].tid = ClassData.tid;
                        userRes[0].teacher = ClassData.teacher;
                        userRes[0].tphone = ClassData.tphone;
                        // console.log("selClass", userRes[0]);
                    }
                    let data = {
                        errno: 0,
                        msg: "修改成功",
                        user: userRes[0],
                    }
                    res.send(data);

                } else {
                    let data = {
                        errno: 1,
                        msg: '修改失败 '
                    }
                    res.send(data);
                }

            })
        } else {
            let data = {
                errno: 1,
                msg: '修改失败 '
            }
            res.send(data);
        }
        // console.log(result);
    })
}

// 删除用户
exports.deleteUser = (req, res) => {
    let { id } = req.query;
    // console.log(id);
    let sql = `update users set userstate = 'null' where id = ${id}`
    db.base(sql, null, (result) => {
        // console.log(result.affectedRows);  // 判断是否执行成功
        if (result.affectedRows) {
            let data = {
                errno: 0,
                msg: "用户已注销成功",
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: '用户注销失败 '
            }
            res.send(data);
        }
    })
}


// 修改用户状态
exports.changeState = (req, res) => {
    // console.log(req.body)
    let { id, userstate } = req.body
    let sql = `update users set userstate='${userstate}' where id=${id} `;
    db.base(sql, null, (result) => {
        // console.log(result);
        if (result.changedRows) {
            let data = {
                errno: 0,
                msg: "用户状态已修改",
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: '用户状态修改失败 '
            }
            res.send(data);
        }
        // console.log(result);
    })
}


// 修改用户密码
exports.updatePassword = (req, res) => {
    console.log(req.body);
    let { id, username, password } = req.body;
    let sql = `update users set password='${password}' where id=${id} and username='${username}'`;
    db.base(sql, null, (result) => {
        if (result.changedRows) {
            let data = {
                errno: 0,
                msg: "修改成功",
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: '修改失败 '
            }
            res.send(data);
        }
        // console.log(result);
    })
}



// 获取user的echarts数据
exports.getUserOption = (req, res) => {
    let sql = `select * from users`;
    // let sql = `select count(id) as usernum from users where type = 'user'`;
    db.base(sql, null, result => {
        // console.log(result);
        // let userNum = 0; // 普通用户数
        // let adminNum = 0; // 管理员数
        // let memberNum = 0; // 会员数
        // let normalUser = 0; // 正常用户数
        // let stopUser = 0; // 禁用用户数
        // let logoutUser = 0; // 注销用户数
        let userNum = (result.filter((item) => {  // 学员数
            return (item.type === "user");
        })).length;
        let adminNum = (result.filter((item) => {  // 管理员数
            return (item.type === "admin");
        })).length;
        let teacherNum = (result.filter((item) => {  // 教师数
            return (item.type === "teacher");
        })).length;
        let normalUser = (result.filter((item) => {  // 正常用户数
            return (item.userstate === "1");
        })).length;
        let stopUser = (result.filter((item) => {  // 禁用用户数
            return (item.userstate === "0");
        })).length;
        let logoutUser = (result.filter((item) => {  // 注销用户数
            return (item.userstate === "null");
        })).length;
        console.log(userNum, adminNum, teacherNum, normalUser, stopUser, logoutUser);
        let userData = [userNum, teacherNum, adminNum, normalUser, stopUser, logoutUser];

        let userOptionData = {
            title: {
                text: "系统当前用户数据",
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: ["学员", "教师", "管理员", "正常用户", "禁用用户", "注销用户"],
            },
            yAxis: {},
            series: [
                {
                    name: "数量",
                    type: "bar",
                    // data: [userNum, teacherNum, adminNum, normalUser, stopUser, logoutUser],
                    data: userData,
                },
            ],
        }
        // console.log(userOptionData, "0000000", userOptionData.series[0].data);
        let data = {
            errno: 0,
            msg: "userOptionData数据请求成功！",
            userOptionData,
            result: [
                userNum,  // 学员数
                adminNum,  // 管理员数
                teacherNum,  // 教师数
                normalUser,  // 正常用户数
                stopUser,  // 禁用用户数
                logoutUser,  // 注销用户数
            ],

        }
        res.send(data)
    })
}
