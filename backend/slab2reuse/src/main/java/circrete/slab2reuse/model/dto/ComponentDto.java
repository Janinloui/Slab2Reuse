package circrete.slab2reuse.model.dto;

public class ComponentDto {
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

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
}