import { AxiosCall } from "../../axios";

export interface IApi {
  origen: string;
  callEndpoint: (axiosCall: AxiosCall<any>) => Promise<any>;
  loading: boolean;
  menu: string;
}
export const defaultApi: IApi = {
  origen: "global",
  callEndpoint: async () => new Promise<any>((resolve) => resolve({} as any)),
  loading: false,
  menu: "",
};
