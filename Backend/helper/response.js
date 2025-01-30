
const { logger } = require("../helper/wiston")
exports.success = function (res, message = 'Success', data = {}) {
    let response = {
        code: 200,
        message: message,
        data: data,
    };
    res.json(response)
};

exports.coursesuccess = function (res, message = 'Success', tabletVersion = 1, data = {}) {
    let response = {
        code: 200,
        message: message,
        data: data,
        tabletVersion:tabletVersion,
    };
    res.json(response)
};

exports.response = function (res, status = 200, message = 'Success', data = {}) {
    let response = {
        code: status,
        message: message,
        data: data,
    };
    res.json(response)
};

exports.failed = function (res, message = 'Failed', code = 100, data = {}) {
    let response = {
        code: code,
        message: message,
        data: data,
    };
    logger.error(res)
    res.json(response)
};

exports.authFailed = function (res, message = 'Failed') {
    let response = {
        code: 401,
        message: message,
    };
    logger.error(res)
    res.json(response)
};

exports.failedValidation = function (res, v) {

    let first_key = Object.keys(v.errors)[0];
    let err = v.errors[first_key]["message"];

    let response = {
        code: 100,
        message: err,
    };
    logger.error(res)
    res.json(response)
};

exports.validationFailedRes = function (res, v) {

    let first_key = Object.keys(v.errors)[0];
    let err = v.errors[first_key]["message"];

    let response = {
        code: 100,
        message: err,
    };
    logger.error(res)
    res.json(response);
};

exports.failedRes = function (res, message = 'Failed') {
    let response = {
        code: 100,
        message: message,
    };
    logger.error(res)
    res.json(response)
};

exports.successRes = function (res, message = 'Success', data = {}, status) {
    let response = {
        code: 200,
        message: message,
    };
    if (status == true || status == false) {
        response = Object.assign(response, {
            status: status
        })
    } else {
        response = Object.assign(response, {
            data: data
        })
    }
    res.json(response)
};

exports.authFailedRes = function (res, message = 'Failed') {
    let response = {
        code: 401,
        message: message,
    };
    logger.error(res)
    res.json(response)
};

exports.coursesuccessResponse = function (res, message = 'Success', tabletVersion = 1, data = {}) {
    let response = {
        code: 200,
        message: message,
        data: data,
        tabletVersion:tabletVersion,
    };
    res.json(response)
};

exports.authFailedSessionExpire = function (res, message = 'Failed') {
    let response = {
        code: 701,
        message: message,
    };
    logger.error(res)
    res.json(response)
}