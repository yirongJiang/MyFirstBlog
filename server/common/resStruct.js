function resFomater(data, isSuccess = true, status = 200) {
    return {
        data,
        success: isSuccess,
        status
    }
}

module.exports = {
    resFomater
}