import * as yup from 'yup';

// Định nghĩa schema validation sử dụng Yup
const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập địa chỉ email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});

export default signupSchema;
