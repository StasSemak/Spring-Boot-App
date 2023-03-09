package shop.storage;

import org.springframework.core.io.Resource;

public interface StorageService {
    void init();
    Resource loadAsResource(String fileName);
    String save(String base64);
    void delete(String fileName);
}
