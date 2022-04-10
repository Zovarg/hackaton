import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string(),
  classification: yup.string(),

});

export default schema;
