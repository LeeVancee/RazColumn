import request from "../utils/request";
interface rule {
  email: string;
  password: string;
}

export const loginAPI = ({ email, password }: rule) => {
  return request({
    url: "/user/login",
    method: "POST",
    data: { email, password },
  });
};
export const currentAPI = () => {
  return request({
    url: "/user/current",
    method: "get",
  });
};
