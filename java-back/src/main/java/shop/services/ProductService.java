package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductItemDTO;
import shop.dto.product.ProductUpdateDTO;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;
import shop.interfaces.IProductService;
import shop.repositories.CategoryRepository;
import shop.repositories.ProductImageRepository;
import shop.repositories.ProductRepository;
import shop.storage.StorageService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final StorageService storageService;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductItemDTO create(ProductCreateDTO model) {
        var product = new ProductEntity();

        var categoryOptional = categoryRepository.findById(model.getCategoryId());
        if(categoryOptional.isEmpty()) return null;
        var category = categoryOptional.get();

        product.setName(model.getName());
        product.setDescription(model.getDescription());
        product.setPrice(model.getPrice());
        product.setDateCreated(new Date());
        product.setDelete(false);
        product.setCategory(category);
        productRepository.save(product);

        List<String> imagePaths = new ArrayList<>();
        int priority = 1;
        for(var image : model.getImages()) {
            var file = storageService.saveMultipartFile(image);
            ProductImageEntity productImage = new ProductImageEntity();
            productImage.setName(file);
            productImage.setDateCreated(new Date());
            productImage.setPriority(priority++);
            productImage.setDelete(false);
            productImage.setProduct(product);
            productImageRepository.save(productImage);
            imagePaths.add(file);
        }

        return new ProductItemDTO(product.getId(), product.getName(), product.getPrice(),
                product.getDescription(), product.getCategory().getName(), imagePaths);
    }

    @Override
    public List<ProductItemDTO> get() {
        var products = productRepository.findAll();
        var result = new ArrayList<ProductItemDTO>();
        for(var product : products) {
            var item = new ProductItemDTO();
            item.setId(product.getId());
            item.setName(product.getName());
            item.setPrice(product.getPrice());
            item.setDescription(product.getDescription());
            item.setCategory(product.getCategory().getName());
            for(var image : product.getProductImages()) {
                item.getImages().add(image.getName());
            }
            result.add(item);
        }
        return result;
    }

    @Override
    public List<ProductItemDTO> getByCategory(int id) {
        var products = productRepository.findAll();
        var result = new ArrayList<ProductItemDTO>();
        for(var product : products) {
            if(product.getCategory().getId() != id) continue;
            var item = new ProductItemDTO();
            item.setId(product.getId());
            item.setName(product.getName());
            item.setPrice(product.getPrice());
            item.setDescription(product.getDescription());
            item.setCategory(product.getCategory().getName());
            for(var image : product.getProductImages()) {
                item.getImages().add(image.getName());
            }
            result.add(item);
        }
        return result;
    }

    @Override
    public ProductItemDTO update(int id, ProductUpdateDTO model) {
        var productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) return null;

        var product = productOptional.get();
        for(var name : model.getRemoveImages()) {
            var productImage = productImageRepository.findByName(name);
            if(productImage != null) {
                productImageRepository.delete(productImage);
                storageService.delete(name);
            }
        }

        var categoryOptional = categoryRepository.findById(model.getCategoryId());
        if(categoryOptional.isEmpty()) return null;
        var category = categoryOptional.get();

        product.setName(model.getName());
        product.setDescription(model.getDescription());
        product.setPrice(model.getPrice());
        product.setCategory(category);
        productRepository.save(product);

        var productImages = product.getProductImages();
        int priority = 1;
        for(var productImage : productImages) {
            if(productImage.getPriority() > priority)
                priority = productImage.getPriority();
        }

        for(var image : model.getImages()) {
            var file = storageService.saveMultipartFile(image);
            ProductImageEntity productImage = new ProductImageEntity();
            productImage.setName(file);
            productImage.setDateCreated(new Date());
            productImage.setPriority(priority++);
            productImage.setDelete(false);
            productImage.setProduct(product);
            productImageRepository.save(productImage);
        }

        var res = new ProductItemDTO();
        res.setId(product.getId());
        res.setName(product.getName());
        res.setPrice(product.getPrice());
        res.setDescription(product.getDescription());
        res.setCategory(product.getCategory().getName());
        for(var image : product.getProductImages()) {
            res.getImages().add(image.getName());
        }
        return res;
    }

    @Override
    public ProductItemDTO get(int id) {
        var productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) return null;
        var product = productOptional.get();

        var res = new ProductItemDTO();
        res.setId(product.getId());
        res.setName(product.getName());
        res.setPrice(product.getPrice());
        res.setDescription(product.getDescription());
        res.setCategory(product.getCategory().getName());
        for(var image : product.getProductImages()) {
            res.getImages().add(image.getName());
        }

        return res;
    }

    @Override
    public void delete(int id) {
        var product = productRepository.findById(id).get();
        var productImages = product.getProductImages();
        for(var productImage : productImages) {
            productImageRepository.delete(productImage);
            storageService.delete(productImage.getName());
        }
        productRepository.delete(product);
    }


}
