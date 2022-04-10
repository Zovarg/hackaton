import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required(),
  classification: yup.string(),

});

export default schema;
