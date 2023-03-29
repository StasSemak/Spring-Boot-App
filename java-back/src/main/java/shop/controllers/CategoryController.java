package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.*;
import shop.interfaces.ICategoryService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() {
        return new ResponseEntity<>(categoryService.get(), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryItemDTO> create(@ModelAttribute CategoryCreateDTO model) {
        return new ResponseEntity<>(categoryService.create(model), HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> get(@PathVariable int id) {
        var result = categoryService.get(id);
        return new ResponseEntity<>(result, result == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoryItemDTO> update(@PathVariable int id, @RequestBody CategoryUpdateDTO model) {
        var result = categoryService.update(id, model);
        return new ResponseEntity<>(result, result == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        categoryService.delete(id);
        return new ResponseEntity<>("Category is deleted", HttpStatus.OK);
    }
}
