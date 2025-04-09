package circrete.slab2reuse.model;

import jakarta.persistence.*;

@Entity
public class GprTestKeyType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double rebarDiameter;
    private double coverDepth;
    private double rebarAmount;
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

    public double getRebarDiameter() {
        return rebarDiameter;
    }

    public void setRebarDiameter(double rebarDiameter) {
        this.rebarDiameter = rebarDiameter;
    }

    public double getCoverDepth() {
        return coverDepth;
    }

    public void setCoverDepth(double coverDepth) {
        this.coverDepth = coverDepth;
    }

    public double getRebarAmount() {
        return rebarAmount;
    }

    public void setRebarAmount(double rebarAmount) {
        this.rebarAmount = rebarAmount;
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