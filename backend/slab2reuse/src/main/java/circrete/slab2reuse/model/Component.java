package circrete.slab2reuse.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String buildingId;
    private String img;
    private String manufacturerId;
    private String condition;
    private boolean noHarmfulSubstance;
    private String availableFrom;
    private String buyer;
    private double price;
    private String loadingCondition;
    private String planReference;
    private double yaw;
    private String geometryTypeId;
    private int floor;

    @OneToOne(cascade = CascadeType.ALL)
    private LocationType location;

    @OneToMany(cascade = CascadeType.ALL)
    private List<VisualInspectionType> visualInspection;

    @OneToOne(cascade = CascadeType.ALL)
    private DestructiveTestType destructionTest;

    @OneToOne(cascade = CascadeType.ALL)
    private CoreTestType coreTest;

    @OneToOne(cascade = CascadeType.ALL)
    private ChemicalTestType chemicalTest;

    @OneToOne(cascade = CascadeType.ALL)
    private GprTestKeyType gprTest;

    @OneToOne(cascade = CascadeType.ALL)
    private ReboundTestType reboundTest;


    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getManufacturerId() {
        return manufacturerId;
    }

    public void setManufacturerId(String manufacturerId) {
        this.manufacturerId = manufacturerId;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public boolean isNoHarmfulSubstance() {
        return noHarmfulSubstance;
    }

    public void setNoHarmfulSubstance(boolean noHarmfulSubstance) {
        this.noHarmfulSubstance = noHarmfulSubstance;
    }

    public String getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(String availableFrom) {
        this.availableFrom = availableFrom;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getLoadingCondition() {
        return loadingCondition;
    }

    public void setLoadingCondition(String loadingCondition) {
        this.loadingCondition = loadingCondition;
    }

    public String getPlanReference() {
        return planReference;
    }

    public void setPlanReference(String planReference) {
        this.planReference = planReference;
    }

    public double getYaw() {
        return yaw;
    }

    public void setYaw(double yaw) {
        this.yaw = yaw;
    }

    public String getGeometryTypeId() {
        return geometryTypeId;
    }

    public void setGeometryTypeId(String geometryTypeId) {
        this.geometryTypeId = geometryTypeId;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public LocationType getLocation() {
        return location;
    }

    public void setLocation(LocationType location) {
        this.location = location;
    }

    public List<VisualInspectionType> getVisualInspection() {
        return visualInspection;
    }

    public void setVisualInspection(List<VisualInspectionType> visualInspection) {
        this.visualInspection = visualInspection;
    }

    public DestructiveTestType getDestructionTest() {
        return destructionTest;
    }

    public void setDestructionTest(DestructiveTestType destructionTest) {
        this.destructionTest = destructionTest;
    }

    public CoreTestType getCoreTest() {
        return coreTest;
    }

    public void setCoreTest(CoreTestType coreTest) {
        this.coreTest = coreTest;
    }

    public ChemicalTestType getChemicalTest() {
        return chemicalTest;
    }

    public void setChemicalTest(ChemicalTestType chemicalTest) {
        this.chemicalTest = chemicalTest;
    }

    public GprTestKeyType getGprTest() {
        return gprTest;
    }

    public void setGprTest(GprTestKeyType gprTest) {
        this.gprTest = gprTest;
    }

    public ReboundTestType getReboundTest() {
        return reboundTest;
    }

    public void setReboundTest(ReboundTestType reboundTest) {
        this.reboundTest = reboundTest;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
