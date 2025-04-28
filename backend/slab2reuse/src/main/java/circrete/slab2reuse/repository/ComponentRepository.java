package circrete.slab2reuse.repository;

import circrete.slab2reuse.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {
    Component getComponentById(Long id);
}
