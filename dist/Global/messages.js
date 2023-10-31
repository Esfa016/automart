"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = exports.SuccessMessages = void 0;
var SuccessMessages;
(function (SuccessMessages) {
    SuccessMessages["saved"] = "Successfully saved.";
    SuccessMessages["updated"] = "Successfully updated.";
    SuccessMessages["deleted"] = "Successfully deleted.";
})(SuccessMessages || (exports.SuccessMessages = SuccessMessages = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["invalidCredentials"] = "Invalid credentials.";
    ErrorMessages["unAuthorized"] = "unAuthorized.";
    ErrorMessages["sessionTimeOur"] = "Please login agin to continue.";
    ErrorMessages["notFound"] = "No data found.";
    ErrorMessages["serverError"] = "Something went wrong. Please try again.";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
