/**
 * Enfoca un elemento HTML y desplaza la ventana de visualización hacia la parte superior.
 * @param input RefObject que apunta al elemento HTML que se desea enfocar.
 */
export const handleFocus = (input: React.RefObject<HTMLElement>): void => {
  //Verifica que input.current no sea null
  if (input && input.current) {
    // Enfocar el elemento HTML
    input.current.focus();
    // Desplazar la ventana de visualización hacia la parte superior del elemento
    input.current.scrollTo(0, 0);
  }
};

/**
 * Procesa el valor de un elemento de entrada HTML según su tipo.
 * @param target El elemento de entrada HTML (input, select o textarea) del que se obtendrá el valor.
 * @returns El valor procesado basado en el tipo de entrada (string | number | boolean).
 * - Para los checkboxes, devuelve un valor booleano indicando si está seleccionado.
 * - Para los campos numéricos, convierte el valor a un número.
 * - Para los campos de texto, convierte el valor a mayúsculas.
 * - Para otros tipos de entrada, devuelve el valor tal como está.
 */
export const handleInputType = (
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
): string | number | boolean => {
  const { type, value } = target;
  switch (type) {
    case "checkbox":
      return (target as HTMLInputElement).checked;
    case "number":
      return Number(value);
    case "text":
      return value.toUpperCase();
    case "email":
      return value.toUpperCase();
    default:
      return value;
  }
};
