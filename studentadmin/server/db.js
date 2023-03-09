const mysql = require("mysql")

exports.base = (sql, data, callback) => {
    // 加载数据包
    let mysql = require('mysql');

    // 创建数据库连接
    let connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'stu'
    })

    // 真正的连接数据库
    connection.connect();

    // 操作数据库（异步）
    connection.query(sql, data, function (error, results, fields) {
        if (error) throw error;
        // 用回调函数处理所有的操作
        callback(results);
    });

    // 关闭数据库
    connection.end();
}
