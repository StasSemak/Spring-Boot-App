package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryResponseDTO;
import shop.entities.CategoryEntity;
import shop.entities.CategoryImageEntity;
import shop.repositories.CategoryImageRepository;
import shop.repositories.CategoryRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final CategoryImageRepository categoryImageRepository;

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> index() {
        var list = categoryRepository.findAll();
        List<CategoryResponseDTO> resp = new ArrayList<>();
        for(var item : list) {
            resp.add(new CategoryResponseDTO(item.getId(), item.getName(), item.getCategoryImages()));
        }
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CategoryCreateDTO model) {
        CategoryEntity category = new CategoryEntity();
        category.setName(model.getName());
        categoryRepository.save(category);
        for (var path : model.getImagesPath()) {
            CategoryImageEntity entity = new CategoryImageEntity(path, category);
            categoryImageRepository.save(entity);
        }
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }
}
