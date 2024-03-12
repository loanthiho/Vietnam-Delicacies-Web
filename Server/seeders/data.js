const provincesData = [
    { name: 'An Giang', type: 'Tỉnh', latitude: 10.5426, longitude: 105.0867 },
    { name: 'Bà Rịa - Vũng Tàu', type: 'Tỉnh', latitude: 10.573, longitude: 107.273 },
    { name: 'Bạc Liêu', type: 'Tỉnh', latitude: 9.285, longitude: 105.724 },
    { name: 'Bắc Giang', type: 'Tỉnh', latitude: 21.279, longitude: 106.197 },
    { name: 'Bắc Kạn', type: 'Tỉnh', latitude: 22.147, longitude: 105.832 },
    { name: 'Bắc Ninh', type: 'Tỉnh', latitude: 21.186, longitude: 106.063 },
    { name: 'Bến Tre', type: 'Tỉnh', latitude: 10.238, longitude: 106.375 },
    { name: 'Bình Định', type: 'Tỉnh', latitude: 13.79, longitude: 109.219 },
    { name: 'Bình Dương', type: 'Tỉnh', latitude: 11.219, longitude: 106.583 },
    { name: 'Bình Phước', type: 'Tỉnh', latitude: 11.751, longitude: 106.665 },
    { name: 'Bình Thuận', type: 'Tỉnh', latitude: 10.933, longitude: 108.107 },
    { name: 'Cà Mau', type: 'Tỉnh', latitude: 9.179, longitude: 105.15 },
    { name: 'Cao Bằng', type: 'Tỉnh', latitude: 22.667, longitude: 106.25 },
    { name: 'Đắk Lắk', type: 'Tỉnh', latitude: 12.666, longitude: 108.041 },
    { name: 'Đắk Nông', type: 'Tỉnh', latitude: 12.055, longitude: 107.795 },
    { name: 'Điện Biên', type: 'Tỉnh', latitude: 21.392, longitude: 103.016 },
    { name: 'Đồng Nai', type: 'Tỉnh', latitude: 11.112, longitude: 107.17 },
    { name: 'Đồng Tháp', type: 'Tỉnh', latitude: 10.465, longitude: 105.637 },
    { name: 'Gia Lai', type: 'Tỉnh', latitude: 13.983, longitude: 108.101 },
    { name: 'Hà Giang', type: 'Tỉnh', latitude: 22.823, longitude: 104.983 },
    { name: 'Hà Nam', type: 'Tỉnh', latitude: 20.545, longitude: 105.914 },
    { name: 'Hà Tĩnh', type: 'Tỉnh', latitude: 18.358, longitude: 105.895 },
    { name: 'Hải Dương', type: 'Tỉnh', latitude: 20.94, longitude: 106.325 },
    { name: 'Hậu Giang', type: 'Tỉnh', latitude: 9.783, longitude: 105.466 },
    { name: 'Hòa Bình', type: 'Tỉnh', latitude: 20.772, longitude: 105.338 },
    { name: 'Hưng Yên', type: 'Tỉnh', latitude: 20.651, longitude: 106.048 },
    { name: 'Khánh Hòa', type: 'Tỉnh', latitude: 12.25, longitude: 109.19 },
    { name: 'Kiên Giang', type: 'Tỉnh', latitude: 10.012, longitude: 105.08 },
    { name: 'Kon Tum', type: 'Tỉnh', latitude: 14.351, longitude: 107.982 },
    { name: 'Lai Châu', type: 'Tỉnh', latitude: 22.395, longitude: 103.458 },
    { name: 'Lâm Đồng', type: 'Tỉnh', latitude: 11.875, longitude: 108.446 },
    { name: 'Lạng Sơn', type: 'Tỉnh', latitude: 21.833, longitude: 106.767 },
    { name: 'Lào Cai', type: 'Tỉnh', latitude: 22.382, longitude: 103.926 },
    { name: 'Long An', type: 'Tỉnh', latitude: 10.697, longitude: 106.157 },
    { name: 'Nam Định', type: 'Tỉnh', latitude: 20.432, longitude: 106.162 },
    { name: 'Nghệ An', type: 'Tỉnh', latitude: 19.145, longitude: 104.984 },
    { name: 'Ninh Bình', type: 'Tỉnh', latitude: 20.254, longitude: 105.975 },
    { name: 'Ninh Thuận', type: 'Tỉnh', latitude: 11.917, longitude: 108.451 },
    { name: 'Phú Thọ', type: 'Tỉnh', latitude: 21.331, longitude: 105.112 },
    { name: 'Quảng Bình', type: 'Tỉnh', latitude: 17.536, longitude: 106.363 },
    { name: 'Quảng Nam', type: 'Tỉnh', latitude: 15.769, longitude: 108.431 },
    { name: 'Quảng Ngãi', type: 'Tỉnh', latitude: 15.123, longitude: 108.804 },
    { name: 'Quảng Ninh', type: 'Tỉnh', latitude: 21.01, longitude: 107.26 },
    { name: 'Quảng Trị', type: 'Tỉnh', latitude: 16.744, longitude: 107.188 },
    { name: 'Sóc Trăng', type: 'Tỉnh', latitude: 9.603, longitude: 105.98 },
    { name: 'Sơn La', type: 'Tỉnh', latitude: 21.314, longitude: 103.914 },
    { name: 'Tây Ninh', type: 'Tỉnh', latitude: 11.303, longitude: 106.1 },
    { name: 'Thái Bình', type: 'Tỉnh', latitude: 20.455, longitude: 106.337 },
    { name: 'Thái Nguyên', type: 'Tỉnh', latitude: 21.592, longitude: 105.848 },
    { name: 'Thanh Hóa', type: 'Tỉnh', latitude: 19.8, longitude: 105.776 },
    { name: 'Thừa Thiên Huế', type: 'Tỉnh', latitude: 16.467, longitude: 107.585 },
    { name: 'Tiền Giang', type: 'Tỉnh', latitude: 10.369, longitude: 106.345 },
    { name: 'Trà Vinh', type: 'Tỉnh', latitude: 9.922, longitude: 106.345 },
    { name: 'Tuyên Quang', type: 'Tỉnh', latitude: 21.816, longitude: 105.214 },
    { name: 'Vĩnh Long', type: 'Tỉnh', latitude: 10.253, longitude: 105.972 },
    { name: 'Vĩnh Phúc', type: 'Tỉnh', latitude: 21.308, longitude: 105.609 },
    { name: 'Yên Bái', type: 'Tỉnh', latitude: 21.724, longitude: 104.845 },
    { name: 'Phú Yên', type: 'Tỉnh', latitude: 13.163, longitude: 109.081 },
    { name: 'Cần Thơ', type: 'Thành phố', latitude: 10.045, longitude: 105.746 },
    { name: 'Đà Nẵng', type: 'Thành phố', latitude: 16.054, longitude: 108.202 },
    { name: 'Hải Phòng', type: 'Thành phố', latitude: 20.844, longitude: 106.688 },
    { name: 'Hà Nội', type: 'Thành phố', latitude: 21.0285, longitude: 105.8542 },
    { name: 'Hồ Chí Minh', type: 'Thành phố', latitude: 10.8231, longitude: 106.6297 }
];

const usersData = [
    {
        name: "Hồ văn Đi",
        // province_id: 'b9c7a265-61f0-4577-930d-9798c25c3290',
        email: "di.ho24@student.passerellesnumeriques.org",
        password: "di12345",
        role: 'admin',
    },
    {
        name: "A Thi",
        // province_id: 'db8feef0-c18f-46b8-a639-f54b6a5d3811',
        email: "thi.a24@student.passerellesnumeriques.org",
        password: "thi12345",
        role: 'admin',
    },
    {
        name: "Hồ Thị Loan",
        // province_id: 'b9c7a265-61f0-4577-930d-9798c25c3290',
        email: "loan.ho24@student.passerellesnumeriques.org",
        password: "loan12345",
        role: 'admin',
    },
    {
        name: "Hồ Thị Hương",
        // province_id: 'b9c7a265-61f0-4577-930d-9798c25c3290',
        email: "huong.ho24@student.passerellesnumeriques.org",
        password: "huong12345",
        role: 'admin',
    },
    {
        name: "Cường",
        // province_id: 'b9c7a265-61f0-4577-930d-9798c25c3290',
        email: "cuong.a24@student.passerellesnumeriques.org",
        password: "luong12345",
        role: 'customer',
    },
    {
        name: "Tâm",
        // province_id: 'b9c7a265-61f0-4577-930d-9798c25c3290',
        email: "tam.vo24@student.passerellesnumeriques.org",
        password: "tam12345",
        role: 'customer',
    },
]

const domainData = [
    {
        name: "Tây Bắc"
    },
    {
        name: "Tây Nguyên"
    },
    {
        name: "Miền Tây"
    },
    {
        name: "Miền Trung"
    },
    {
        name: "Phía Nam"
    },
    {
        name: "Đồng Bằng SCL"
    }
]

module.exports = { provincesData, usersData, domainData };