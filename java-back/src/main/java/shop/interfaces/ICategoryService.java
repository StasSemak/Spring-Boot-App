package shop.interfaces;

import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;

import java.util.List;

public interface ICategoryService {
    CategoryItemDTO create(CategoryCreateDTO model);
    List<CategoryItemDTO> get();
    CategoryItemDTO update(int id, CategoryUpdateDTO model);
    void delete(int id);
    CategoryItemDTO get(int id);
}
