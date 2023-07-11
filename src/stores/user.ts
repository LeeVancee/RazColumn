import { defineStore } from "pinia";
import { type ImageProps, type ResponseType } from "../types";
import { currentAPI, loginAPI } from "../api/user";
import request from "@/utils/request";

export interface UserDataProps {
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface UserProps {
  token: string;
  isLogin: boolean;
  data: UserDataProps | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserProps => {
    return {
      token: localStorage.getItem("token") || "",
      isLogin: false,
      data: null,
    };
  },
  actions: {
    async login(email: string, password: string) {
      const payload = {
        email,
        password,
      };
      //const { data } = await axios.post<ResponseType>("/user/login", payload);
      const { data } = await loginAPI(payload);

      const { token } = data.data;
      this.token = token;
      localStorage.setItem("token", token);
      request.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    logout() {
      this.token = "";
      this.isLogin = false;
      localStorage.removeItem("token");
      delete request.defaults.headers.common.Authorization;
    },
    async fetchCurrentUser() {
      // const { data } = await axios.get("/user/current");
      const { data } = await currentAPI();
      this.isLogin = true;
      this.data = { ...data.data };
    },
  },
});
