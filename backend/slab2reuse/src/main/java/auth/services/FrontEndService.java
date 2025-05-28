package dk.bm.fido.auth.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class FrontEndService {
    private final OAuth2AuthorizedClientService clientService;

    @Value("wso2")
    private String oidcProvider;

    public FrontEndService(OAuth2AuthorizedClientService clientService) {
        this.clientService = clientService;
    }

    public String getAccessToken(Authentication authentication) {
        if (authentication.getClass().isAssignableFrom(OAuth2AuthenticationToken.class)) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            String clientRegistrationId = oauthToken.getAuthorizedClientRegistrationId();
            if (clientRegistrationId.equals(oidcProvider)) {
                OAuth2AuthorizedClient authorizedClient =
                        clientService.loadAuthorizedClient(clientRegistrationId, oauthToken.getName());
                return FrontEndService.getBearerToken(authorizedClient);
            }
        } else if (authentication.getClass().isAssignableFrom(UsernamePasswordAuthenticationToken.class)) {
            return FrontEndService.getBasicToken(authentication.getName(), (String) authentication.getCredentials());
        }

        throw new UnsupportedOperationException("Unsupported authentication method");
    }

    public static void setAuthenticated(Authentication authentication, Model model) {
        if (authentication != null && authentication.isAuthenticated()) {
            model.addAttribute("authenticated", true);
            model.addAttribute("username", authentication.getName());
        } else {
            model.addAttribute("authenticated", false);
        }
    }

    public static String getBearerToken(OAuth2AuthorizedClient authorizedClient) {
        OAuth2AccessToken token = authorizedClient.getAccessToken();
        return token.getTokenType().getValue() + " " + token.getTokenValue();
    }

    public static String getBasicToken(String username, String password) {
        String userpass = username + ":" + password;
        return "Basic " + Base64.getEncoder().encodeToString(userpass.getBytes(StandardCharsets.UTF_8));
    }
}
