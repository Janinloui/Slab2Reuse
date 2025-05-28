/**
 * Copyright (c) 2019, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// https://github.com/wso2/identity-apps/blob/master/apps/myaccount/src/api/multi-factor-fido.ts

class CredentialRequest {
    /** @type String */
    requestId;
    /** @type Credential */
    credential;
}

// TODO: Decipher this...
function responseToObject(response) {
    if (response.u2fResponse) {
        return response;
    } else {
        let clientExtensionResults = {};

        try {
            clientExtensionResults = response.getClientExtensionResults();
        } catch (e) {
            // No need to show UI errors here.
            // Add debug logs here one a logger is added.
            // Tracked here https://github.com/wso2/product-is/issues/11650.
        }

        if (response.response.attestationObject) {
            return {
                clientExtensionResults,
                id: response.id,
                response: {
                    attestationObject: encodeBase64(
                        response.response.attestationObject
                    ),
                    clientDataJSON: encodeBase64(response.response.clientDataJSON)
                },
                type: response.type
            };
        } else {
            return {
                clientExtensionResults,
                id: response.id,
                response: {
                    authenticatorData: encodeBase64(
                        response.response.authenticatorData
                    ),
                    clientDataJSON: encodeBase64(response.response.clientDataJSON),
                    signature: encodeBase64(response.response.signature),
                    userHandle:
                        response.response.userHandle &&
                        encodeBase64(response.response.userHandle)
                },
                type: response.type
            };
        }
    }
}

/**
 * Creates a credential by invoking CTAP2 in the browser
 * @param request The request
 * @returns {Promise<Credential>} Returns a credential
 */
async function createCredentials(request) {
    // Decode IDs in excludeCredentials
    /** @type PublicKeyCredentialDescriptor[] */
    const excludeCredentials = request.excludeCredentials.map(
        (credential) => {
            return { ...credential, id: decodeBase64(credential.id) };
        }
    );

    // Decode challenge and user id
    /** @type PublicKeyCredentialCreationOptions */
    const publicKeyCredentialCreationOptions = {
        ...request,
        attestation: "direct",
        challenge: decodeBase64(request.challenge),
        excludeCredentials,
        user: {
            ...request.user,
            id: decodeBase64(request.user.id)
        }
    };

    // Invoke CTAP to create a credential
    return await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
}

/**
 * Finalizes a FIDO device registration
 * @param {string} requestId The ID of the registration request
 * @param {Credential} credential The generated credential
 * @returns {Promise<any>} Returns success or failure
 */
async function registerFinish(requestId, credential) {
    // Create the payload, containing the request's ID and the generated credential
    const payload = {
        requestId: requestId,
        credential: responseToObject(credential)
    };

    // Call the backend to finish registration
    let result = await fetch("/register/finish", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(payload)
    });

    return await result.json();
}

/**
 * Start registering a FIDO device
 * @returns {Promise<PublicKeyCredentialCreationOptions>} Returns the registration request with credential options
 */
async function registerStart() {
    // Call the backend to initiate registration
    let result = await fetch("/register/start", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return await result.json();
}

async function fidoFlow() {
    // Initiate FIDO registration
    const request = await registerStart();

    // Ask user to generate a credential
    const credential = await createCredentials(request?.publicKeyCredentialCreationOptions);

    // Finish the registration
    return await registerFinish(request?.requestId, credential);
}