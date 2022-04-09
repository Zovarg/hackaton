import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required(),
  classific: yup.string(),

});

export default schema;
