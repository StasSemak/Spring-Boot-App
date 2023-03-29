package shop.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDTO {
    private String name;
    private double price;
    private String description;
    private int categoryId;
    private List<String> removeImages = new ArrayList<>();
    private List<MultipartFile> images = new ArrayList<>();
}