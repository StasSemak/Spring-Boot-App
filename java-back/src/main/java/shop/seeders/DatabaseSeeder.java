package shop.seeders;

import lombok.Data;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;

@Data
@Component
public class DatabaseSeeder {
    private final CategoryRepository categoryRepository;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        //seedCategories();
    }

    private void seedCategories() {
      addCategory("Laptops", "02fece2e-0450-4f81-af6a-7198e94b2841.jpg");
      addCategory("Phones", "cba6e2bb-7105-4df5-91c4-2c3e31ddb8bd.jpg");
      addCategory("Monitors", "63c9da9c-94e9-473f-a359-e12948106a31.jpg");
      addCategory("CPU", "d3b3cc2e-5f0a-490b-856d-93256b1f05bd.jpg");
      addCategory("GPU", "8f67970f-88f4-4a7f-a3ba-34220f5e8cbe.jpg");
      addCategory("RAM", "c766716f-4677-4ed2-a046-a82f8b7d1485.jpg");
    }
    private void addCategory(String name, String image) {
        CategoryEntity category = new CategoryEntity();
        category.setName(name);
        category.setImagePath(image);
        categoryRepository.save(category);
    }
}
