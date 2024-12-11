export interface IUser {
  token: string;
  refreshToken: string;
  darkMode?: boolean;
}
export const defaultUser: IUser = {
  token: "",
  refreshToken: "",
  darkMode: false,
};

export interface IUserCompleto {
  id: string;
  nickname: string;
  tipoUsuario: string;
  puntoVentaId: string;
  almacenId: string;
  vendedorId: string;
  token: string;
  refreshToken: string;
  expirationToken: number;
}
export const defaultUserCompleto: IUserCompleto = {
  id: "",
  nickname: "",
  tipoUsuario: "",
  puntoVentaId: "",
  almacenId: "",
  vendedorId: "",
  token: "",
  refreshToken: "",
  expirationToken: 0,
};
