
interface LoginData {
    createdAt: string;
}

export const setLogin = (data: LoginData, path: string): void | boolean => {
    if (!data || !path ) return false
    if (data) {
        sessionStorage.setItem("createdAt", data.createdAt);
        sessionStorage.setItem("isLogin", "true");
    }
}

export const setLogout = (): void => {
    sessionStorage.removeItem("createdAt");
    sessionStorage.removeItem("isLogin");
}

