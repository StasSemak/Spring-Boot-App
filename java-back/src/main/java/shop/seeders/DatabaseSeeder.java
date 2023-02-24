package shop.seeders;

import lombok.Data;
import org.hibernate.sql.ast.tree.cte.CteTableGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import shop.entities.CategoryEntity;
import shop.entities.CategoryImageEntity;
import shop.repositories.CategoryImageRepository;
import shop.repositories.CategoryRepository;

@Data
@Component
public class DatabaseSeeder {

    private final CategoryRepository categoryRepository;
    private final CategoryImageRepository categoryImageRepository;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedCategories();
    }

    private void seedCategories() {
        CategoryEntity laptops = addCategory("Laptops");
        CategoryEntity phones = addCategory("Phones");
        CategoryEntity monitors = addCategory("Monitors");
        CategoryEntity cpu = addCategory("CPU");
        CategoryEntity gpu = addCategory("GPU");
        CategoryEntity ram = addCategory("RAM");

        addCategoryImage(laptops, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80");
        addCategoryImage(phones, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80");
        addCategoryImage(monitors, "https://images.unsplash.com/photo-1547658718-1cdaa0852790?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80");
        addCategoryImage(cpu, "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80");
        addCategoryImage(gpu, "https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
        addCategoryImage(ram, "https://images.unsplash.com/photo-1592664474505-51c549ad15c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    }
    private CategoryEntity addCategory(String name) {
        CategoryEntity category = new CategoryEntity();
        category.setName(name);
        categoryRepository.save(category);
        return category;
    }

    private void addCategoryImage(CategoryEntity category, String path) {
        CategoryImageEntity image = new CategoryImageEntity(path, category);
        categoryImageRepository.save(image);
    }
}
