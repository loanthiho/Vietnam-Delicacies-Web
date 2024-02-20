const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const provinceRoutes = require('./provinceRoutes');
const districtRoutes = require('./districtRoutes')
const userRoutes = require('./userRoutes');
const { checkAuth } = require('../middleware/check-auth');
function runRouters(app) {
    app.use('/products', productRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/provinces', provinceRoutes);
    app.use('/districts', districtRoutes)
    app.use('/users', userRoutes);
}

module.exports = runRouters;