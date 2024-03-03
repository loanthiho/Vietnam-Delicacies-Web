import * as yup from 'yup';

// Định nghĩa schema validation sử dụng Yup
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, 'Tên người dùng không quá 50 ký tự')
    .min(5, 'Cần ít nhất 5 ký tự')
    .required('Vui lòng nhập tên người dùng'),
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
