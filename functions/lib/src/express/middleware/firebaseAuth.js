"use strict";
//  https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const consola = require('consola');
const response = require('../helper/response');
const firebaseModule = require('../../../firebaseModule');
const validateFirebaseIdToken = async (req, res, next) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        consola.error(`
      No Firebase ID token was passed as a Bearer token in the Authorization header.
      Make sure you authorize your request by providing the following HTTP header: Authorization: Bearer <Firebase ID Token>
      or by passing a "__session" cookie.
    `);
        return response.failed(res, { message: 'Unauthorized', status: 403 });
    }
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else if (req.cookies) {
        idToken = req.cookies.__session;
    }
    else {
        return response.failed(res, { message: 'Unauthorized', status: 403 });
    }
    try {
        req.user = await firebaseModule.auth.verifyIdToken(idToken);
        return next();
    }
    catch (error) {
        consola.error('Error while verifying Firebase ID token:', error);
        return response.failed(res, { message: 'Unauthorized', status: 403 });
    }
};
module.exports = validateFirebaseIdToken;
//# sourceMappingURL=firebaseAuth.js.map