package auth.external.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DeviceDto {
    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CredentialDto {
        private String credentialId;
    }

    private String credentialId;
    private String displayName;
    private Date registrationTime;
    private boolean isUsernamelessSupported;

    @JsonCreator
    @JsonIgnoreProperties(ignoreUnknown = true)
    public DeviceDto(
            @JsonProperty("credential") CredentialDto credential,
            @JsonProperty("registrationTime") Date registrationTime,
            @JsonProperty("isUsernamelessSupported") boolean isUsernamelessSupported,
            @JsonProperty("displayName") String displayName
    ) {
        this.credentialId = credential.getCredentialId();
        this.displayName = displayName;
        this.registrationTime = registrationTime;
        this.isUsernamelessSupported = isUsernamelessSupported;
    }
}
