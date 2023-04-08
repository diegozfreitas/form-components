import * as yup from "yup";

export const ValidationsSchema = yup.object().shape({
  name: yup.string().required("Campo Obrigatorio"),
  age: yup.string().required("Campo Obrigatorio"),
  select: yup.string().required("Campo Obrigatorio"),
  // gender: yup.string().required("Campo Obrigatorio"),
  // gender: yup.array().required("Campo Obrigatorio"),
  gender: yup.mixed().test({
    test: (value) => {
      return (
        typeof value === "string" || (Array.isArray(value) && value.length > 0)
      );
    },
    message: "Selecione pelo menos uma opção",
  }),
});
