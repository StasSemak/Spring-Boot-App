package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.interfaces.ICategoryService;

import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;
    @Override
    public CategoryItemDTO create(CategoryCreateDTO model) {
        CategoryEntity category = new CategoryEntity();
        category.setName(model.getName());
        category.setImagePath(storageService.saveMultipartFile(model.getFile()));
        categoryRepository.save(category);
        return new CategoryItemDTO(category.getId(), category.getName(), category.getImagePath());
    }

    @Override
    public List<CategoryItemDTO> get() {
        List<CategoryItemDTO> res = new ArrayList<>();
        for(var category : categoryRepository.findAll()) {
            res.add(new CategoryItemDTO(category.getId(), category.getName(), category.getImagePath()));
        }
        return res;
    }

    @Override
    public CategoryItemDTO update(int id, CategoryUpdateDTO model) {
        var categoryOptional = categoryRepository.findById(id);
        if(categoryOptional.isEmpty()) return null;
        var category = categoryOptional.get();
        category.setName(model.getName());
        return new CategoryItemDTO(category.getId(), category.getName(), category.getImagePath());
    }

    @Override
    public void delete(int id) {
        storageService.delete(categoryRepository.findById(id).get().getImagePath());
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryItemDTO get(int id) {
        var categoryOptional = categoryRepository.findById(id);
        if(categoryOptional.isEmpty()) return null;
        var category = categoryOptional.get();
        return new CategoryItemDTO(category.getId(), category.getName(), category.getImagePath());
    }
}
