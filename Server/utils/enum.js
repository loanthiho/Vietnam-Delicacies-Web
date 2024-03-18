const orderStatus = {
    CHO_XAC_NHAN: 'CHO_XAC_NHAN',
    CHO_LAY_HANG: 'CHO_LAY_HANG',
    CHO_GIAO_HANG: 'CHO_GIAO_HANG',
    DANH_GIA: 'CHO_DANH_GIA',
    DA_HUY: 'DA_HUY'
}

const isValidStatus = (status) => {
    return Object.values(orderStatus).includes(status);
}

module.exports = { orderStatus, isValidStatus }
