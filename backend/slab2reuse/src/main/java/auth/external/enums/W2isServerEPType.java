package dk.bm.fido.auth.external.enums;

import lombok.Getter;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum W2isServerEPType {
    INTROSPECT ("POST",true,
            "{idpEndpoint}/t/{tenant}/oauth2/introspect?token={token}&token_type_hint=bearer",
            MediaType.APPLICATION_FORM_URLENCODED_VALUE, new HashMap<>(),"", ""
    ),
    GET_FIDO_DEVICES(
            "GET", true,
            "{idpEndpoint}/t/{tenant}/api/users/v2/me/webauthn",
            MediaType.APPLICATION_JSON_VALUE, new HashMap<>(), "", ""),
    START_FIDO_REGISTRATION(
            "POST", true,
            "{idpEndpoint}/t/{tenant}/api/users/v2/me/webauthn/start-registration",
            MediaType.APPLICATION_FORM_URLENCODED_VALUE, new HashMap<>(), "", ""),
    FINISH_FIDO_REGISTRATION(
            "POST", true,
            "{idpEndpoint}/t/{tenant}/api/users/v2/me/webauthn/finish-registration",
            MediaType.APPLICATION_JSON_VALUE, new HashMap<>(), "", ""),
    DELETE_FIDO_DEVICE(
            "DELETE", true,
            "{idpEndpoint}/t/{tenant}/api/users/v2/me/webauthn/{credential}",
            MediaType.APPLICATION_JSON_VALUE, new HashMap<>(), "", ""),
    EDIT_FIDO_DEVICE(
            "PATCH", true,
            "{idpEndpoint}/t/{tenant}/api/users/v2/me/webauthn/{credential}",
            MediaType.APPLICATION_JSON_VALUE, new HashMap<>(), "", "");

    private final String method;
    private final boolean doInput;
    private final String endpoint;
    private final String contentType;
    private final Map<String, String> headers;
    private final String requestBody;
    private final String soapAction;

    W2isServerEPType(String method,
                     boolean doInput,
                     String endpoint,
                     String contentType,
                     Map<String, String> headers,
                     String soapAction,
                     String requestBody)
    {
        this.method = method;
        this.doInput = doInput;
        this.endpoint = endpoint;
        this.contentType = contentType;
        this.headers = headers;
        this.requestBody = requestBody;
        this.soapAction = soapAction;
    }
}