package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.ImageUploadDTO;
import shop.repositories.CategoryRepository;
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
        String fileName = storageService.save(dto.getBase64());
        return fileName;
    }
}