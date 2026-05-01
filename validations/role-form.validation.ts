import * as Yup from "yup";

export const roleFormValidation = Yup.object().shape({
 
    role: Yup.string()
        .required("User role is required"), 
});
