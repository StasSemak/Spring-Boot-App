package shop.interfaces;

import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductItemDTO;
import shop.dto.product.ProductUpdateDTO;

import java.util.List;

public interface IProductService {
    ProductItemDTO create(ProductCreateDTO model);
    List<ProductItemDTO> get();
    List<ProductItemDTO> getByCategory(int id);
    ProductItemDTO update(int id, ProductUpdateDTO model);
    ProductItemDTO get(int id);
    void delete(int id);
}
