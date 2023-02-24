package shop.dto.category;

import lombok.Data;

import java.util.List;
@Data
public class CategoryCreateDTO {
    private String name;
    private List<String> imagesPath;
}
