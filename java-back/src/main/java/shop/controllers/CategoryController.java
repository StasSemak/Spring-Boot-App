package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryDeleteDTO;
import shop.dto.category.CategoryResponseDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> index() {
        var list = categoryRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CategoryCreateDTO dto) {
        CategoryEntity category = new CategoryEntity();
        category.setName(dto.getName());
        category.setImagePath(dto.getImagePath());
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Long> delete(@PathVariable int id) {
        //String imagePath = categoryRepository.findById(id).get().getImagePath();
        //storageService.delete(imagePath);
        Long res = categoryRepository.deleteById(id);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<CategoryEntity> update(@RequestBody CategoryUpdateDTO dto) {
        var category_optional = categoryRepository.findById(dto.getId());
        if(category_optional.isEmpty()) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        CategoryEntity category = category_optional.get();
        category.setImagePath(dto.getImagePath());
        category.setName(dto.getName());
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
}
