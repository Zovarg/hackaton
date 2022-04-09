import * as yup from "yup";

const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/
const schema = yup.object().shape({
  telephone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  user_full_name: yup.string().max(200).required(),
  email: yup.string().email().required(),
  medical_institution: yup.string().max(200).required(),
  text: yup.string().required(),
});

export default schema;
