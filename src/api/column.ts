import type { ListReqType } from "@/types";
import request from "../utils/request";

export const fetchColumnsAPI = ({ currentPage, pageSize }: ListReqType) => {
  return request({
    url: `/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: "get",
  });
};

export const fetchColumnAPI = (cid: any) => {
  return request({
    url: `/columns/${cid}`,
    method: "get",
  });
};
