export default {
    setUserRouters(state, userRouters) {
        state.userRouters = userRouters
    },
    // setAuth(state, auth) {
    //     state.isAuth = auth;
    // },
    setSessionData(state, newRouters) {
        let userData = state.user
        // console.log("commit数据已提交", userData);
        // console.log("commit数据已提交", newRouters);

        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem("routerData", JSON.stringify(newRouters));
    },

    GETROUTER(state, res) {
        state.user = res.user;
        localStorage.setItem("token", res.token)
    },


    setUserData(state, userData) {
        state.userData = userData
    },

    setUser(state, user) {
        // console.log("setUser", user);
        state.user = user;
    }
}