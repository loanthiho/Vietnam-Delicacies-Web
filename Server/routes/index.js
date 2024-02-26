const { checkAuth } = require('../middleware/check-auth');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const provinceRoutes = require('./provinceRoutes');
const districtRoutes = require('./districtRoutes')
const userRoutes = require('./userRoutes');
const domainRoutes = require('./domainRoutes');
const uploadRoutes = require('./uploadRoutes');
function runRouters(app) {
    app.use('/products', productRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/provinces', provinceRoutes);
    app.use('/districts', districtRoutes)
    app.use('/users', userRoutes);
    app.use('/domains', domainRoutes);
    app.use('/uploads', uploadRoutes);
}

module.exports = runRouters;