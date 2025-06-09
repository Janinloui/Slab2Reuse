package circrete.slab2reuse.controller;

import circrete.slab2reuse.model.Component;
import circrete.slab2reuse.model.dto.ComponentDto;
import circrete.slab2reuse.repository.ComponentRepository;
import circrete.slab2reuse.service.ComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/component")
public class ComponentController {

    public ComponentController(ComponentRepository componentRepository,
                               ComponentService componentService) {
        this.componentRepository = componentRepository;
        this.componentService = componentService;

    }

    private final ComponentRepository componentRepository;
    private final ComponentService componentService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<ComponentDto>> getAllComponents() {
        List<Component> components = componentRepository.findAll();
        Iterable<ComponentDto> componentDtos = components.stream()
                .map(componentService::componentToDto)
                .toList();
        return ResponseEntity.ok(componentDtos);
    }

    @PostMapping("/get-by-ids")
    public ResponseEntity<List<ComponentDto>> getComponentById(@RequestBody List<Long> ids) {
        if (ids == null) {
            return ResponseEntity.badRequest().build();
        }

        List<ComponentDto> componentDtos = ids.stream()
                .map(componentService::getComponentById)
                .map(componentService::componentToDto)
                .toList();

        if (componentDtos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(componentDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComponentDto> getComponentById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        Component component = componentRepository.getComponentById(id);

        if (component == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(componentService.componentToDto(component));
    }

    @PostMapping("/save")
    public ResponseEntity<Component> saveComponent(@RequestBody ComponentDto componentDto) {
        if (componentDto == null) {
            return ResponseEntity.badRequest().build();
        }

        Component component = componentService.dtoToComponent(componentDto);

        return ResponseEntity.ok(componentRepository.save(component));
    }

    @PostMapping("/update")
    public ResponseEntity<Component> updateComponent(@RequestBody ComponentDto componentDto) {
        return ResponseEntity.ok(componentService.updateComponent(componentDto));
    }

}