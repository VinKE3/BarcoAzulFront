import { IGetIsPermitidoParams, IResponse } from "../../../models";
import { handleIsPermitido } from "../api.util";
import { get } from "./get.util";

/**
 * Realiza una solicitud GET para verificar si una acción específica está permitida para un menú y un modal dado en el globalo global.
 * @param global El contexto global de la aplicación.
 * @param modalProp La propiedad del modal a utilizar en el contexto (por defecto es "primer").
 * @param acción - Acción CRUD a verificar.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @returns Una promesa que resuelve con la respuesta, true si tiene el permiso válido.
 */
export const getIsPermitido = async ({
  globalContext,
  accion,
  modalProp = "primer",
  id = null,
  menu,
}: IGetIsPermitidoParams): Promise<any> => {
  // Desestructuración de global para obtener API y modal
  const { api, modal } = globalContext;
  const selectedModal = modal[modalProp]; // Obtener el modal seleccionado basado en modalProp

  const url: string = menu ?? api.menu; // Determinar el menú seleccionado
  const selectedAccion: string = handleIsPermitido(accion);
  const selectedId = id ?? selectedModal.id;

  const params = new URLSearchParams({ accion: selectedAccion, id: String(selectedId) });
  const endpoint: string = `${url}/IsPermitido`; // Construir la URL

  // Realizar la solicitud
  const { data, messages }: IResponse = await get(globalContext, endpoint, params, true);

  // Verificar data es false
  if (!data) throw messages; // Lanzar el primer mensaje de error si no está permitido

  return data; // Devolver true si la solicitud es exitosa
};
