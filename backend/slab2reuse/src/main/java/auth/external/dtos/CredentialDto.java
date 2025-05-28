package auth.external.dtos;

import lombok.Data;

import java.util.Map;

@Data
public class CredentialDto {
    @Data
    public static class Response {
        private String attestationObject;
        private String clientDataJSON;
    }

    private Map<String, String> clientExtensionResults;
    private String id;
    private Response response;
    private String type;
}