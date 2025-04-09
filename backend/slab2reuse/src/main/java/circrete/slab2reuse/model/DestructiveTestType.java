package circrete.slab2reuse.model;

import jakarta.persistence.*;

@Entity
public class DestructiveTestType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String geometryTypeId;
    private String imgLongitudinal;
    private String imgTransverse;
    private String userId;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGeometryTypeId() {
        return geometryTypeId;
    }

    public void setGeometryTypeId(String geometryTypeId) {
        this.geometryTypeId = geometryTypeId;
    }

    public String getImgLongitudinal() {
        return imgLongitudinal;
    }

    public void setImgLongitudinal(String imgLongitudinal) {
        this.imgLongitudinal = imgLongitudinal;
    }

    public String getImgTransverse() {
        return imgTransverse;
    }

    public void setImgTransverse(String imgTransverse) {
        this.imgTransverse = imgTransverse;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}