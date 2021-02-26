"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAppMethodFromData = findAppMethodFromData;
exports.knownAppIds = exports.apmAppId = void 0;

var _ethEnsNamehash = require("eth-ens-namehash");

var _web3Utils = require("web3-utils");

const apmAppId = appName => (0, _ethEnsNamehash.hash)(`${appName}.aragonpm.eth`);
/**
 * Find the method descriptor corresponding to the data component of a
 * transaction sent to `app`.
 *
 * @param  {Object} app App artifact
 * @param  {Object} data Data component of a transaction to app
 * @return {Object|void} Method with radspec notice and function signature, or undefined if none was found
 */


exports.apmAppId = apmAppId;

function findAppMethodFromData(app, data) {
  const methodId = data.substring(2, 10);
  const {
    deprecatedFunctions,
    functions
  } = app || {};
  let method; // First try to find the method in the current functions

  if (Array.isArray(functions)) {
    method = functions.find(method => (0, _web3Utils.soliditySha3)(method.sig).substring(2, 10) === methodId);
  }

  if (!method) {
    // The current functions didn't have it; try with each deprecated version's functions
    const deprecatedFunctionsFromVersions = Object.values(deprecatedFunctions || {});

    if (deprecatedFunctionsFromVersions.every(Array.isArray)) {
      // Flatten all the deprecated functions
      const allDeprecatedFunctions = [].concat(...deprecatedFunctionsFromVersions);
      method = allDeprecatedFunctions.find(method => (0, _web3Utils.soliditySha3)(method.sig).substring(2, 10) === methodId);
    }
  }

  return method;
}

const knownAppIds = [apmAppId('finance'), apmAppId('token-manager'), apmAppId('vault'), apmAppId('voting')];
exports.knownAppIds = knownAppIds;
//# sourceMappingURL=apps.js.map