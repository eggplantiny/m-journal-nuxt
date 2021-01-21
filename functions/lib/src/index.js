"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const express = require('./express');
const app = express();
//  Authentication 관련 정보
//  https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
exports.api = firebase_functions_1.region('asia-northeast3').https.onRequest(app);
//# sourceMappingURL=index.js.map