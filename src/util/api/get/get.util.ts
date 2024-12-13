import { IGlobalContext } from "../../../models";
import { getService } from "../../../services";

/**
 * Realiza una solicitud GET para obtener toda la respuesta o solo los datos .
 * @param global El contexto global de la aplicación.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param allData - Indicador para devolver toda la repsuesta o solo los datos.
 * @param isBlob - Indicador para devolver la respuesta en formato Blob (opcional, por defecto es false).
 * @returns Una promesa que resuelve con la respuesta de la solicitud HTTP.
 */
export const get = async (
  global: IGlobalContext,
  menu?: string,
  params?: URLSearchParams,
  allData?: boolean,
  isBlob?: boolean
): Promise<any> => {
  const { api } = global; // Obtener la API del contexto
  const { callEndpoint } = api; // Obtener la función callEndpoint de la API
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado
  const url: string = params ? `${selectedMenu}?${params}` : selectedMenu; // Construir la URL con los parámetros si existen

  // Realizar la llamada al endpoint utilizando getService
  const response = await callEndpoint(getService(url, isBlob, allData));
  return allData ? response : response.data; // Devolver toda la respuesta o solo los datos, según allData
};
