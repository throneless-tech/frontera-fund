export const buildInitialFormState = (fields: any[]) => {
  return fields.reduce((initialSchema, field) => {
    if (field.blockType === "checkbox") {
      return {
        ...initialSchema,
        [field.name]: false,
      };
    }
    if (field.blockType === "email") {
      return {
        ...initialSchema,
        [field.name]: "",
      };
    }
    if (field.blockType === "text") {
      return {
        ...initialSchema,
        [field.name]: "",
      };
    }
    if (field.blockType === "select") {
      return {
        ...initialSchema,
        [field.name]: "",
      };
    }
  }, {});
};
