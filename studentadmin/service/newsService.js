const db = require("..//server/db")

exports.addNews = (req, res) => {
    // console.log("000");
    // console.log(req.body);
    let { title, publisher, content, createdate, state } = req.body
    if (!state) {
        state = 1;
    }
    let sql = `insert into news (title, publisher, content, createdate, state) values (?,?,?,?,?);`
    let data = [title, publisher, content, createdate, state]
    db.base(sql, data, result => {
        // console.log("result", result);
        if (result.insertId) {
            let data = {
                errno: "0",
                msg: "公告已发布！"
            }
            res.send(data);
        } else {
            let data = {
                errno: "1",
                msg: "公告发布失败！"
            }
            res.send(data);
        }
    })
}

// 获取所有用户
exports.getNews = async (req, res) => {
    let { page, pageSize } = req.query;
    // console.log(page, pageSize, type);
    // 分页查询 limit 5,10 （从第5条开始的10条数据）
    let start = (page - 1) * pageSize;
    let sql = `select * from news where state <> 'null' order by id desc`;
    if (page && pageSize) {
        sql += ` limit ${start},${pageSize}`;
    }

    db.base(sql, null, (result) => {
        // console.log(result);
        if (result.length) {
            // 计算数据条数
            sql = `select count(id) as count from news where state <> 'null'`
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


exports.updateNews = (req, res) => {
    console.log(req.query);
    let { id, title, publisher, content, createdate, state } = req.query
    let sql = `update news set`
    if (title) {
        sql += ` title = '${title}'`
    }
    if (content) {
        sql += `, content = '${content}'`
    }
    if (publisher) {
        sql += `, publisher = '${publisher}'`
    }
    if (createdate) {
        sql += `, createdate = '${createdate}'`
    }
    // if (state) {
    //     sql += ` state = '${state}'`
    // }
    sql += ` where id = ${id}`
    db.base(sql, null, result => {
        if (result.affectedRows) {
            // console.log(result);
            let data = {
                errno: 0,
                msg: "修改成功",
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: "修改失败",
            }
        }
    })
}


exports.delNews = (req, res) => {
    let { id } = req.query;
    let sql = `update news set state = 'null' where id = ${id}`
    db.base(sql, null, result => {
        if (result.affectedRows) {
            // console.log(result);
            let data = {
                errno: 0,
                msg: "删除成功！"
            }
            res.send(data);
        } else {
            let data = {
                errno: 1,
                msg: "删除失败！"
            }
            res.send(data);
        }

    })
}