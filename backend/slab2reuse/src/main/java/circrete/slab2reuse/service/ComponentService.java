package circrete.slab2reuse.service;

import circrete.slab2reuse.model.Component;
import circrete.slab2reuse.model.dto.ComponentDto;
import circrete.slab2reuse.repository.ComponentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ComponentService {

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    private final ComponentRepository componentRepository;

    public Component getComponentById(Long id) {
        return componentRepository.getComponentById(id);
    }

    public Component updateComponent(ComponentDto componentDto) {
        if (componentDto == null || componentDto.getId() == null) {
            throw new IllegalArgumentException("ComponentDto or its ID must not be null");
        }

        Component componentUpdated = componentRepository.getComponentById(componentDto.getId());
        if (componentUpdated == null) {
            throw new IllegalArgumentException("Component with the given ID does not exist");
        }

        // Update only non-null fields
        if (componentDto.getBuildingId() != null) {
            componentUpdated.setBuildingId(componentDto.getBuildingId());
        }
        if (componentDto.getImg() != null) {
            componentUpdated.setImg(componentDto.getImg());
        }
        if (componentDto.getManufacturerId() != null) {
            componentUpdated.setManufacturerId(componentDto.getManufacturerId());
        }
        if (componentDto.getCondition() != null) {
            componentUpdated.setCondition(componentDto.getCondition());
        }
        componentUpdated.setNoHarmfulSubstance(componentDto.isNoHarmfulSubstance());
        if (componentDto.getAvailableFrom() != null) {
            componentUpdated.setAvailableFrom(componentDto.getAvailableFrom());
        }
        if (componentDto.getBuyer() != null) {
            componentUpdated.setBuyer(componentDto.getBuyer());
        }
        if (componentDto.getPrice() != 0) {
            componentUpdated.setPrice(componentDto.getPrice());
        }
        if (componentDto.getLoadingCondition() != null) {
            componentUpdated.setLoadingCondition(componentDto.getLoadingCondition());
        }
        if (componentDto.getPlanReference() != null) {
            componentUpdated.setPlanReference(componentDto.getPlanReference());
        }
        if (componentDto.getYaw() != 0) {
            componentUpdated.setYaw(componentDto.getYaw());
        }
        if (componentDto.getGeometryTypeId() != null) {
            componentUpdated.setGeometryTypeId(componentDto.getGeometryTypeId());
        }
        if (componentDto.getFloor() != 0) {
            componentUpdated.setFloor(componentDto.getFloor());
        }

        return componentRepository.save(componentUpdated);
    }

    public Component dtoToComponent(ComponentDto componentDto) {
        if (componentDto == null) {
            return null;
        }

        if (componentDto.getId() == null) {
            return null;
        }

        Component component = new Component();
        component.setId(componentDto.getId());
        component.setBuildingId(componentDto.getBuildingId());
        component.setImg(componentDto.getImg());
        component.setManufacturerId(componentDto.getManufacturerId());
        component.setCondition(componentDto.getCondition());
        component.setNoHarmfulSubstance(componentDto.isNoHarmfulSubstance());
        component.setAvailableFrom(componentDto.getAvailableFrom());
        component.setBuyer(componentDto.getBuyer());
        component.setPrice(componentDto.getPrice());
        component.setLoadingCondition(componentDto.getLoadingCondition());
        component.setPlanReference(componentDto.getPlanReference());
        component.setYaw(componentDto.getYaw());
        component.setGeometryTypeId(componentDto.getGeometryTypeId());
        component.setFloor(componentDto.getFloor());
        return component;
    }

    public ComponentDto componentToDto(Component component) {
        if (component == null) {
            return null;
        }

        ComponentDto componentDto = new ComponentDto();
        componentDto.setId(component.getId());
        componentDto.setBuildingId(component.getBuildingId());
        componentDto.setImg(component.getImg());
        componentDto.setManufacturerId(component.getManufacturerId());
        componentDto.setCondition(component.getCondition());
        componentDto.setNoHarmfulSubstance(component.isNoHarmfulSubstance());
        componentDto.setAvailableFrom(component.getAvailableFrom());
        componentDto.setBuyer(component.getBuyer());
        componentDto.setPrice(component.getPrice());
        componentDto.setLoadingCondition(component.getLoadingCondition());
        componentDto.setPlanReference(component.getPlanReference());
        componentDto.setYaw(component.getYaw());
        componentDto.setGeometryTypeId(component.getGeometryTypeId());
        componentDto.setFloor(component.getFloor());

        return componentDto;
    }

}
