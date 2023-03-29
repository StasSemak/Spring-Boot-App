package shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImageEntity, Integer> {
    Long deleteByProduct(ProductEntity product);
    ProductImageEntity findByName(String name);
}
