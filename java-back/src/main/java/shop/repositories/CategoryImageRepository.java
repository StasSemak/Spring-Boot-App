package shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.entities.CategoryImageEntity;

@Repository
public interface CategoryImageRepository extends JpaRepository<CategoryImageEntity, Integer> {
}