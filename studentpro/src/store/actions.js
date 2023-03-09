import { getUserRouters } from '@/api/axios/request'
import { formRouterTree, changeRouter } from '@/utils/router'
import router from '@/router/index'

import { login } from '@/api/axios/request'

export default {
    async setRouter({ commit, state }) {
        // console.log("type:", sessionStorage.getItem("type"));
        // 获取会话中存储的type和user数据回填到state中
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        state.user = userData;

        const userRouters = await getUserRouters(sessionStorage.getItem("type"));  // 获取后台路由信息

        // const userRouters = await getUserRouters(state.type);  // 获取后台路由信息
        const payload = formRouterTree(userRouters);  // 修改路由信息形成树形结构
        // console.log("userRouters:", userRouters);
        // console.log("payload", payload);
        // 改变为router树
        // console.log("111", changeRouter(payload));
        commit("setUserRouters", payload)
        // commit("setAuth", false);
        // console.log(formRouterTree(userRouters));

        // 改变router路由
        const newRouters = changeRouter(payload);  // 修改路由树，使其符合路由规则
        // console.log("newRouters", newRouters);

        // commit("setLocalData", newRouters)
        // router.addRoutes(newRouters);

        newRouters.filter(r => {
            // console.log(r);
            if (router.options)
                router.addRoute(r)
        })
    },



    toLogin({ dispatch, commit, state }, data) {
        // console.log(context);
        login("/login", data).then((res) => {
            // console.log(res);
            commit("GETROUTER", res);
            alert(res.msg);
            if (!res.errno) {
                // console.log("000");
                commit("setSessionData", changeRouter(state.userRouters));
                router.push({ path: "/manage/manageindex" }).catch(err => { throw err })
            }

        })
    }

}
