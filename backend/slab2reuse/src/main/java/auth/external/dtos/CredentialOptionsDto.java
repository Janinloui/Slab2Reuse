package auth.external.dtos;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CredentialOptionsDto {
    @Data
    public static class RelyingParty {
        private String name;
        private String id;
    }

    @Data
    public static class User {
        private String name;
        private String displayName;
        private String id;
    }

    @Data
    public static class CredentialParameter {
        private String alg;
        private String type;
    }

    @Data
    public static class ExcludeCredential {
        private String type;
        private String id;
    }

    private RelyingParty rp;
    private User user;
    private String challenge;
    private List<CredentialParameter> pubKeyCredParams;
    private List<ExcludeCredential> excludeCredentials;
    private String attestation;
    private Map<String, String> extensions;
}
