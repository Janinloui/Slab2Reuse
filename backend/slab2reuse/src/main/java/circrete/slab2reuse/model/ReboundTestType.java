package circrete.slab2reuse.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class ReboundTestType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Double> reboundValue;

    private String reboundDate;
    private String userId;

    @OneToOne(cascade = CascadeType.ALL)
    private LocationType location;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Double> getReboundValue() {
        return reboundValue;
    }

    public void setReboundValue(List<Double> reboundValue) {
        this.reboundValue = reboundValue;
    }

    public String getReboundDate() {
        return reboundDate;
    }

    public void setReboundDate(String reboundDate) {
        this.reboundDate = reboundDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocationType getLocation() {
        return location;
    }

    public void setLocation(LocationType location) {
        this.location = location;
    }
}