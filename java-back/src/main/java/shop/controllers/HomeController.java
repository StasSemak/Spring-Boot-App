package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.dto.ImageUploadDTO;
import shop.storage.StorageService;

@RestController
@AllArgsConstructor
public class HomeController {
    private final StorageService storageService;

    @GetMapping("/files/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> serverFile(@PathVariable String filename) throws Exception {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(file);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody ImageUploadDTO dto) {
        return storageService.save(dto.getBase64());
    }

    @PostMapping(value = "./form/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String formUpload(@RequestParam("file") MultipartFile file) {
        return storageService.saveMultipartFile(file);
    }
}