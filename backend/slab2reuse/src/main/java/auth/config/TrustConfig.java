package dk.bm.fido.auth.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;

@Configuration
public class TrustConfig {

    @Value("${server.ssl.trust-store}")
    private String trustStoreLocation;
    @Value("${server.ssl.trust-store-password}")
    private String trustStorePassword;
    @Value("${server.ssl.trust-store-type}")
    private String trustStoreType;

    /**
     * Configures the ssl connection by setting the properties for the system as detailed in the application properties
     * @throws CertificateException if a certificate could not be loaded
     * @throws KeyStoreException if there is no service provider interface that supports the given keystore
     * @throws IOException if there is a formatting problem with the keystore, no password provided, or it is incorrect.
     * @throws NoSuchAlgorithmException If the integrity algorithm for the keystore cannot be found
     */
    @PostConstruct
    private void configureSSL() throws CertificateException, KeyStoreException, IOException, NoSuchAlgorithmException {
        File trusdStoreFile = new File(trustStoreLocation);

        KeyStore ks = KeyStore.getInstance(trusdStoreFile, trustStorePassword.toCharArray());

        // This is necessary for self-signed certificates
        //System.setProperty("javax.net.debug", "all");
        System.setProperty("javax.net.ssl.trustStore", trusdStoreFile.getAbsolutePath());
        System.setProperty("javax.net.ssl.trustStorePassword", trustStorePassword);
        System.setProperty("javax.net.ssl.trustStoreType", trustStoreType);
    }

}