export const isValidString = (string) => {
    if (string === undefined || string === "" || string === null) {
        return false;
    }
    return true;
}

export const isValidArray = (arr) => {
    if (!Array.isArray(arr) || !arr.length) {
        return false;
    }
    return true;
}

export const isValidEmail = (string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isValidString(string) && re.test(string)) {
        return true;
    }
    return false
}

export const isValidPhone = (string) => {
    const re = /^[\d+]{9,10}$/;
    if (isValidString(string) && re.test(string)) {
        return true;
    }
    return false;
}

export const isValidFullName = (string) => {
    const re = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    if (isValidString(string) && re.test(string)) {
        return true;
    }
    return false;
}

export const isValidObject = (obj) => {
    if (obj === null || obj === undefined || obj === {}) {
        return false;
    }
    return true;
}