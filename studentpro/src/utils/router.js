function formRouterTree(userRouters) {
    let parents = userRouters.filter(p => p.pid === 0),
        children = userRouters.filter(c => c.pid !== 0);

    // console.log("-------", parents, "-------");
    // 开启递归算法，生成tree
    dataToForm(parents, children);

    function dataToForm(parents, children) {
        parents.map((p) => {
            children.map((c, i) => {
                // 判断子元素的pid等于父元素的id
                if (c.pid === p.id) {
                    // 深拷贝children，去除当前项，进行递归，并把当前项添加到children中
                    let _c = JSON.parse(JSON.stringify(children));
                    _c.splice(i, 1)
                    // 递归判断当前children有没有子元素
                    dataToForm([c], _c)

                    // 判断是否存在子元素children把当前项添加到父元素的children下
                    if (p.children) {
                        p.children.push(c);  // 存在放入
                    } else {
                        p.children = [c];  // 不存在直接赋值
                    }
                }
            })
        })
    };
    return parents
}


function changeRouter(userRouters) {
    let newRouters = userRouters.map((r) => {
        // 创建路由结构树
        let routes = {
            path: r.path,
            name: r.name,
            // 根据后台返回的component的路径，引入对应的路由组件
            // component: () => import(`@/views/${r.name}`),
            component: changeComponent(r.name, r.children),
            meta: {
                title: r.title,
                linkTo: r.link
            }
        }
        // console.log(`@/views/${r.name}`);
        // 如果有孩子节点,递归遍历
        if (r.children) {
            // delete r.component;
            // 解决父路由component为空
            // routes.component = { render: (e) => e("router-view") }
            routes.redirect = r.children[0].link;
            routes.children = changeRouter(r.children);
        }
        return routes;
    })
    return newRouters;
}

export const changeComponent = (name, children) => {
    // 判断是否有孩子（子元素）
    if (children) {
        // return () => import(`@/views/${name}`)
        // return () => import(`@/views/Parent`)
        if (name == "Manage") {
            return () => import(`@/views/${name}`);
        }
        return { render: (e) => e("router-view") }
    } else {
        return () => import(`@/views/${name}`)
    }

}


export {
    formRouterTree,
    changeRouter
}