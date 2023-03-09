// 把文件按照二进制进行读取
export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsBinaryString(file) // 把当前文件以二进制进行读取
        reader.onload = ev => {
            resolve(ev.target.result)
        }
    })
}

// // 字段对应表
// export let character = {
//     name: {
//         text: '姓名',
//         type: 'string'
//     },
//     phone: {
//         text: '电话',
//         type: 'string'
//     }
// }
// 字段对应表
export let character = {
    id: {
        text: 'id',
        type: 'number'
    },
    uid: {
        text: '个人编号',
        type: 'string'
    },
    cid: {
        text: '班级编号',
        type: 'string'
    },
    username: {
        text: '账号',
        type: 'string'
    },
    name: {
        text: '姓名',
        type: 'string'
    },
    paystate: {
        text: '缴费状态',
        type: 'string'
    },
    phone: {
        text: '电话',
        type: 'string'
    },
    sex: {
        text: '性别',
        type: 'string'
    },
    introduce: {
        text: '介绍',
        type: 'string'
    }
}

// 时间字符串格式化
export function formatTime(str, template) {
    let arr = str.match(/\d+/g).map(item => {
        return item.length < 2 ? '0' + item : item
    })
    template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒'
    return template.replace(/\{(\d+)\}/g, (_, group) => {
        return arr[group] || '00'
    })
}

// 设置异步延迟间隔
export function delay(interval = 0) {
    return new Promise(resolve => {
        let timer = setTimeout(_ => {
            clearTimeout(timer)
            resolve()
        }, interval)
    })
}
