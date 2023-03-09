package shop.dto.category;

import lombok.Data;

@Data
public class CategoryUpdateDTO {
    private int id;
    private String name;
    private String imagePath;
}
