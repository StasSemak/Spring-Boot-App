package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void init();
    Resource loadAsResource(String fileName);
    String save(String base64);
    void delete(String fileName);
    String saveMultipartFile(MultipartFile file);
}
