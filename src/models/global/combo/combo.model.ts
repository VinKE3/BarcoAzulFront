export interface ICombo {
  id: string;
  descripcion: string;

  isDefault?: boolean;
  numero?: number;
  nombre?: string;
  nick?: string;
}

export const defaultCombo: ICombo = {
  id: "",
  descripcion: "",

  isDefault: false,
  numero: 0,
  nombre: "",
  nick: "",
};

export interface IComboNumeric {
  id: number;
  descripcion: string;

  default?: boolean;
  numero?: number;
  nombre?: string;
  nick?: string;
}

export const defaultComboNumeric: IComboNumeric = {
  id: 0,
  descripcion: "",

  default: false,
  numero: 0,
  nombre: "",
  nick: "",
};
