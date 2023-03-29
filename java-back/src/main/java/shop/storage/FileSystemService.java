package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.*;
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
            String[] charArray = base64.split(",");
            String extension;
            if (charArray[0].equals("data:image/png;base64")) {
                extension = "png";
            }
            else {
                extension = "jpg";
            }
            String randomFileName = UUID.randomUUID() + "." + extension;
            byte[] bytes = Base64.getDecoder().decode(charArray[1]);
            int[] imageSize= { 32, 150, 300, 600, 1200 };
            try(var byteStream = new ByteArrayInputStream(bytes)) {
                var image = ImageIO.read(byteStream);
                for(int size : imageSize) {
                    BufferedImage img = ImageUtils.resizeImage(image,
                            extension == "jpg" ? ImageUtils.IMAGE_JPEG : ImageUtils.IMAGE_PNG, size, size);
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    ImageIO.write(img, extension, byteArrayOutputStream);
                    byte[] newBytes = byteArrayOutputStream.toByteArray();
                    FileOutputStream out = new FileOutputStream(rootLocation.toString() + "/" + size + "_" + randomFileName);
                    out.write(newBytes);
                    out.close();
                }
            }
            catch (IOException ex) {
                throw new StorageException("Error refactoring image!", ex);
            }
            return randomFileName;
        }
        catch (StorageException ex) {
            throw new StorageException("Error while saving base64!", ex);
        }
    }

    @Override
    public void delete(String fileName) {
        int[] imageSize = { 32, 150, 300, 600, 1200 };
        try {
            for (int size : imageSize) {
                Path filePath = rootLocation.resolve(size + "_" + fileName);
                File file = new File(filePath.toString());
                if(!file.delete()) {
                    throw new Exception();
                }
            }
        }
        catch(Exception ex) {
            throw new StorageException("Error deleting a file!", ex);
        }
    }

    @Override
    public String saveMultipartFile(MultipartFile file) {
        try {
            String randomFileName = UUID.randomUUID() + ".jpg";
            byte[] bytes = file.getBytes();
            int[] imageSize= { 32, 150, 300, 600, 1200 };
            try(var byteStream = new ByteArrayInputStream(bytes)) {
                var image = ImageIO.read(byteStream);
                for(int size : imageSize) {
                    BufferedImage img = ImageUtils.resizeImage(image, ImageUtils.IMAGE_JPEG, size, size);
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    ImageIO.write(img, "jpg", byteArrayOutputStream);
                    byte[] newBytes = byteArrayOutputStream.toByteArray();
                    FileOutputStream out = new FileOutputStream(rootLocation.toString() + "/" + size + "_" + randomFileName);
                    out.write(newBytes);
                    out.close();
                }
            }
            catch (IOException ex) {
                throw new StorageException("Error refactoring image!", ex);
            }
            return randomFileName;
        }
        catch (Exception ex) {
            throw new StorageException("Error while saving base64!", ex);
        }
    }
}
