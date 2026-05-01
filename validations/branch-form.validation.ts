import * as Yup from "yup";

export const branchFormValidation = Yup.object().shape({ 
    name: Yup.string().required("Branch Name is required"), 
});
