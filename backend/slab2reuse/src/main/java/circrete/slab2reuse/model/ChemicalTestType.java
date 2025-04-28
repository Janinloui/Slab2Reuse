package circrete.slab2reuse.model;

import jakarta.persistence.*;

@Entity
public class ChemicalTestType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double carbonationDepth;
    private double chlorideContent;
    private double alkaliReactivity;
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

    public double getCarbonationDepth() {
        return carbonationDepth;
    }

    public void setCarbonationDepth(double carbonationDepth) {
        this.carbonationDepth = carbonationDepth;
    }

    public double getChlorideContent() {
        return chlorideContent;
    }

    public void setChlorideContent(double chlorideContent) {
        this.chlorideContent = chlorideContent;
    }

    public double getAlkaliReactivity() {
        return alkaliReactivity;
    }

    public void setAlkaliReactivity(double alkaliReactivity) {
        this.alkaliReactivity = alkaliReactivity;
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