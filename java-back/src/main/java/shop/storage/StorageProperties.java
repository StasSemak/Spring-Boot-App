package shop.storage;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties("store")
@Component
public class StorageProperties {
    private String location = "uploads";
}
