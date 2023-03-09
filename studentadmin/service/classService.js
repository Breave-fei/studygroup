const db = require('../server/db');


// 根据cid获取用户对应班级数据信息
exports.getClass = (req, res) => {
    let { id } = req.query
    let sql = `select * from class where state <> 'null'`
    if (id) {
        sql += ` and id = '${id}'`
    }
    db.base(sql, null, (result) => {
        if (result) {
            let data = {
                errno: 0,
                msg: "获取班级数据成功",
                classData: result,
            }
            // console.log(data);
            res.send(data)
        } else {
            let data = {
                errno: 0,
                msg: "获取班级数据失败",
            }
            res.send(data)
        }

    })
}



// 根据请求条件获取班级数据信息
exports.getClassPage = (req, res) => {
    // console.log("getClassPage", req.query);
    let { page, pageSize, classname, classstate, classroom, teacher } = req.query;
    let start = (page - 1) * pageSize;
    // 分页查询 limit 5,10 （从第5条开始的10条数据）
    let sql = `select * from class where state <> 'null'`
    if (classname) {
        sql += ` and classname = '${classname}'`
    }
    if (classstate) {
        sql += ` and classstate = '${classstate}'`
    }
    if (classroom) {
        sql += ` and classroom = '${classroom}'`
    }
    if (teacher) {
        sql += ` and teacher = '${teacher}'`
    }
    sql += ` order by id desc limit ${start},${pageSize}`

    db.base(sql, null, async (result) => {
        if (result.length) {
            // 遍历获取各班级人数
            await result.map(item => {
                sql = `select count(id) as number from users where cid = '${item.id}' and userstate <> 'null'`;
                db.base(sql, null, (resNum) => {
                    if (resNum[0].number) {
                        item.number = resNum[0].number - 1;
                    } else {
                        item.number = 0;
                    }
                })
            })

            // 计算数据条数
            sql = `select count(id) as count from class where state = '1'`;
            if (classname) {
                sql += ` and classname = '${classname}'`
            }
            if (classstate) {
                sql += ` and classstate = '${classstate}'`
            }
            if (classroom) {
                sql += ` and classroom = '${classroom}'`
            }
            if (teacher) {
                sql += ` and classname = '${teacher}'`
            }
            db.base(sql, null, (resCount) => {
                // console.log(result);
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
    })
}

// 添加班级
exports.addClass = (req, res) => {
    // console.log(req.body);
    let { classname, classroom, tid, teacher, tphone, startdate, classstate } = req.body
    // state 默认状态为1，状态为0禁用班级; number 班级学员数量
    let state = '1';
    let number = 0;
    let sql = `insert into class (classname, classroom, tid, teacher, tphone, startdate, classstate,number, state) values (?,?,?,?,?,?,?,?,?)`
    let data = [classname, classroom, tid, teacher, tphone, startdate, classstate, number, state];
    db.base(sql, data, result => {
        if (result.affectedRows) {
            let data = {
                errno: 0,
                msg: '班级添加成功',
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: '班级添加失败',
            }
            res.send(data);
        }
        // console.log('addClass', result);
        // res.send("000")
    })
}




// 修改班级信息
exports.updateClass = (req, res) => {
    // console.log(req.body);
    let { id, classname, classroom, tid, teacher, tphone, startdate, classstate } = req.body;
    let sql = `update class set`;
    if (classname) {
        sql += ` classname='${classname}',`
    }
    if (classroom) {
        sql += ` classroom = '${classroom}',`
    }
    if (tid) {
        sql += ` tid ='${tid}',`
    }
    if (teacher) {
        sql += ` teacher='${teacher}',`
    }
    if (tphone) {
        sql += ` tphone='${tphone}',`
    }
    if (startdate) {
        sql += ` startdate='${startdate}',`
    }
    if (tphone) {
        sql += ` classstate='${classstate}'`
    }
    sql += ` where id=${id}`
    db.base(sql, null, (result) => {
        // console.log(result)
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


// 伪删除班级
exports.delClass = (req, res) => {
    let { id } = req.query;
    // console.log(req.query);
    let sql = `update class set state = 'null' where id = ${id}`
    db.base(sql, null, (result) => {
        // console.log(result.affectedRows);  // 判断是否执行成功
        if (result.affectedRows) {
            let data = {
                errno: 0,
                msg: "班级已注销成功",
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: '班级注销失败 '
            }
            res.send(data);
        }
    })
}


// 修改用户班级数据信息
exports.updateUserClass = async (req, res) => {
    console.log("updateUserClass", req.body);
    let { oldCid, oldNumber, number, id, username, cid, name, paystate, phone } = req.body;
    let user = {};  // 用户数据
    // 原班级人数-1，现班级人数+1
    if (oldCid && oldNumber) {
        --oldNumber;
        let sql = `update class set number='${oldNumber}' where id=${oldCid}`
        await db.base(sql, null, res => {
            if (res.changedRows) {
                console.log("原班级人数减一");
            }
        })
    }
    if (number) {
        ++number;
        let sql = `update class set number='${number}' where id=${cid}`
        await db.base(sql, null, res => {
            if (res.changedRows) {
                console.log("现班级人数加一");
            }
        })
    }

    // 获取用户对应的班级信息
    let classData = [];
    await db.base(`select * from class where state = '1'`, null, (result) => {
        classData = result
        // console.log("classData111", classData);
    })

    let sql = `update users set`;
    if (name) {
        sql += ` name='${name}'`
    }
    if (cid) {
        sql += `, cid= '${cid}'`
    }
    if (paystate) {
        sql += `, paystate='${paystate}'`
    }
    if (phone) {
        sql += `, phone='${phone}'`
    }
    sql += ` where id = ${id} and username='${username}'`

    db.base(sql, null, (result) => {
        // 获取变化班级后的用户数据
        if (result.changedRows) {
            if (id && username) {
                sql = `select * from users where id = ${id} and username = '${username}'`
                db.base(sql, null, userRes => {
                    if (userRes) {
                        userRes.forEach(item => {
                            // console.log("000");
                            if (!item.userurl) {
                                item.userurl = "http://122.51.174:3333/uploadImg/user.jpeg"
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

                        user = userRes[0];
                        console.log("user000", user);
                        console.log("成功");
                        let data = {
                            errno: 0,
                            msg: "修改成功",
                            user: user,
                        }
                        res.send(data);
                    }
                })
            }
        } else {
            let data = {
                errno: 1,
                msg: '修改失败 '
            }
            res.send(data);
        }
        // console.log(result)
    })
}


// 修改用户班级数据信息,退出班级
exports.outClass = (req, res) => {
    // console.log(req.body);
    let { id } = req.body;
    let sql = `update users set cid= '' where id=${id}`;
    db.base(sql, null, (result) => {
        // console.log(result)
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

