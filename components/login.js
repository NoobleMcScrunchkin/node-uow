const { getState } = require('./profile');

module.exports.validateLogin = (token) => {
    return new Promise(async (resolve, reject) => {
        getState(token).then((res) => {
            const profile = res.profile;
            if (profile.authUserInfo) {
                resolve(profile);
            } else {
                resolve(false);
            }
        });
    });
}