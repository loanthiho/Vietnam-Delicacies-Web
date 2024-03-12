import React from 'react';
import * as yup from 'yup';

// Định nghĩa schema validation sử dụng Yup
export const signupSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  phone_number: yup.string().required('Vui lòng nhập số điện thoại'),
  detail_address: yup.string().required('Vui lòng nhập số địa chỉ'),
});
