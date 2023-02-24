package shop.dto.category;

import lombok.Data;
import shop.entities.CategoryImageEntity;

import java.util.ArrayList;
import java.util.List;

@Data
public class CategoryResponseDTO {
    private int id;
    private String name;
    private List<String> imagesPath;

    public CategoryResponseDTO(int id, String name, List<CategoryImageEntity> list) {
        this.id = id;
        this.name = name;
        this.imagesPath = new ArrayList<>();
        for (var item : list) {
            imagesPath.add(item.getPath());
        }
    }
}
