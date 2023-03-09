package shop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import shop.storage.StorageService;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        System.out.println("Running...");
        SpringApplication.run(Main.class, args);
    }

    CommandLineRunner init(StorageService service) {
        return (args) -> {
            try {
                service.init();
            }
            catch (Exception ex) {
                System.out.println("Error!\n" + ex.getMessage());
            }
        };
    }
}
