package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileSystemService implements StorageService {
    private final Path rootLocation;

    public FileSystemService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public void init() {
        try {
            if(!Files.exists(rootLocation))
                Files.createDirectories(rootLocation);
        }
        catch (IOException ex) {
            throw new StorageException("Error creating folder!", ex);
        }
    }

    @Override
    public Resource loadAsResource(String fileName) {
        try {
            Resource resource = new UrlResource(rootLocation.resolve(fileName).toUri());
            if(resource.exists() || resource.isReadable())
                return resource;
            throw new StorageException("Error while creating '" + fileName + "' file resource!");
        }
        catch (IOException ex) {
            throw new StorageException("File not found!", ex);
        }
    }

    @Override
    public String save(String base64) {
        try {
            if(base64.isEmpty())
                throw new StorageException("Empty base64!");
            String randomFileName = UUID.randomUUID() + ".jpg";
            byte[] bytes = Base64.getDecoder().decode(base64.split(",")[1]);
            new FileOutputStream(rootLocation.toString() + "/" + randomFileName).write(bytes);
            return randomFileName;
        }
        catch (IOException ex) {
            throw new StorageException("Error while saving base64!", ex);
        }
    }

    @Override
    public void delete(String fileName) {
        String rootPath = rootLocation.toString();
        Path filePath = Paths.get(rootPath + "/" + fileName);
        try {
            Files.delete(filePath);
        }
        catch(IOException ex) {
            throw new StorageException("Error deleting a file!", ex);
        }
    }
}
