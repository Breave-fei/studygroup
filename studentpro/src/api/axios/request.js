// axios 请求的封装
// 1. 引入config.js的axios的配置信息
import axios from './config'
// 2. 封装axios的增删改查操作
// 3. 导出封装好的方法

// 获取路由信息
export function getUserRouters(type) {
    return axios({
        url: "getrouter",
        method: "post",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        data: {
            type
        }
    }).then((res) => {
        if (!res.errno) {
            console.log("getrouter", res);
            return res.userRouters;
        }
    }).catch((err) => { throw err; })
}



// 登录
export function login(url, data) {
    return axios({
        url,
        method: "post",
        data,
    })
}


// 登录（body接收）
export function toLogin(url, data) {
    return axios({
        url,
        method: 'post',
        data
    })
}

// 添加的封装（body接收）
export function addProduct(url, data) {
    // 添加操作
    return axios({
        url,
        method: 'post',
        data
    })
}

// 删除的封装（query接收）
export function delProduct(url, id) {
    // 删除操作
    return axios({
        url,
        method: 'delete',
        params: {
            id
        }
    })
}

// 修改的封装（body接收）
export function updateProduct(url, data) {
    // 修改操作
    return axios({
        url,
        method: 'put',
        data
    })
}

// 查询所有（query接收）
export function getAllProduct(url) {
    // 查询所有操作
    return axios({
        url,
        method: 'get',
    })
}

// 查询指定数据（query接收）
export function getProduct(url, params) {
    // 查询指定id操作
    return axios({
        url,
        method: 'get',
        params
    })
}











// 添加班级（body接收）
export function addClass(data) {
    // 添加操作
    return axios({
        url: "addclass",
        method: 'post',
        data
    })
}

// 获取班级数据信息
export function getClass(id) {
    // 查询指定id操作
    return axios({
        url: "getclass",
        method: 'get',
        params: {
            id
        }
    })
}

// 分页查询班级数据 
export function getClassPage(params) {
    return axios({
        url: "getclasspage",
        method: 'get',
        params
    })
}
// 获取教师数据
export function getTeacher(params) {
    return axios({
        url: "getusers",
        method: 'get',
        params
    })
}


// 修改班级（body接收）
export function updateClass(data) {
    // 修改操作
    return axios({
        url: "updateclass",
        method: 'put',
        data
    })
}
// 修改用户信息（body接收）
export function updateUser(data) {
    // 修改操作
    return axios({
        url: "updateuser",
        method: 'put',
        data
    })
}

// 伪删除班级
// 删除的封装（query接收）
export function delClass(id) {
    // 删除操作
    return axios({
        url: 'delclass',
        method: 'delete',
        params: {
            id
        }
    })
}


// // 获取班级学员数
// export function getCountUser(type) {
//     // 查询指定id操作
//     return axios({
//         url: "getcountuser",
//         method: 'get',
//         params: {
//             type
//         }
//     })
// }
// 修改学生班级
export function updateUserClass(data) {
    // 修改操作
    return axios({
        url: 'updateuserclass',
        method: 'put',
        data
    })
}

export function getStuSearchData(params) {
    // 查询指定id操作
    return axios({
        url: 'getstusearchdata',
        method: 'get',
        params
    })
}

// 退出班级
export function outClass(id) {
    // 修改操作
    return axios({
        url: 'outclass',
        method: 'put',
        data: {
            id,
        }
    })
}






// 添加新闻
export function addNews(data) {
    return axios({
        url: "addnews",
        method: "post",
        data,
    })
}


// 分页查询新闻数据 
export function getNewsPage(params) {
    return axios({
        url: "getnews",
        method: 'get',
        params
    })
}

// 修改新闻/公告内容
export function updateNews(params) {
    return axios({
        url: "updatenews",
        method: "put",
        params
    })
}

// 删除新闻/公告
export function delNews(id) {
    // 删除操作
    return axios({
        url: 'delnews',
        method: 'delete',
        params: {
            id
        }
    })
}
