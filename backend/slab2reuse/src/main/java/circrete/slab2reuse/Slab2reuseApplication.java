package circrete.slab2reuse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "dk.bm.fido.auth")
public class Slab2reuseApplication {

	public static void main(String[] args) {
		SpringApplication.run(Slab2reuseApplication.class, args);
	}

}
