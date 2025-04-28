package circrete.slab2reuse.model;

import jakarta.persistence.*;

@Entity
public class CoreTestType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double coreDiameter;
    private double coreCompressiveStrength;
    private String date;
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

    public double getCoreDiameter() {
        return coreDiameter;
    }

    public void setCoreDiameter(double coreDiameter) {
        this.coreDiameter = coreDiameter;
    }

    public double getCoreCompressiveStrength() {
        return coreCompressiveStrength;
    }

    public void setCoreCompressiveStrength(double coreCompressiveStrength) {
        this.coreCompressiveStrength = coreCompressiveStrength;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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