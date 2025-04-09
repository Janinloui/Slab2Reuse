package circrete.slab2reuse.controller;

import circrete.slab2reuse.model.Component;
import circrete.slab2reuse.model.dto.ComponentDto;
import circrete.slab2reuse.repository.ComponentRepository;
import circrete.slab2reuse.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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