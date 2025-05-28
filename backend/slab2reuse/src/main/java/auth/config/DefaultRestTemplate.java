package dk.bm.fido.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class DefaultRestTemplate {
    /**
     * Setup of the default restTemplate for calling the secured https wso2 service
     * @return returns the rest template instantiated with a httpComponentClientHttpRequestFactory, for gaining patch request functionality.
     */
    @Bean
    public RestTemplate sslRestTemplate() {
        return new RestTemplate(new HttpComponentsClientHttpRequestFactory());
    }
}
