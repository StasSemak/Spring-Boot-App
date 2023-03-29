//package shop.mappers;
//
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.springframework.stereotype.Component;
//import shop.dto.category.CategoryItemDTO;
//import shop.entities.CategoryEntity;
//
//import java.util.List;
//
//@Mapper(componentModel = "spring")
//@Component
//public interface CategoryMapper {
//    @Mapping(source = "name", target = "name")
//    CategoryItemDTO CategoryItemDTOByCategory(CategoryEntity category);
//    List<CategoryItemDTO> CategoryItemDTOsByCategories(List<CategoryEntity> list);
//}
