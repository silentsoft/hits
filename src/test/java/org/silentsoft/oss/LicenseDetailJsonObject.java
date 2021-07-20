package org.silentsoft.oss;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class LicenseDetailJsonObject {

    public String licenses;
    public String repository;
    public String publisher;
    public String email;
    public String url;
    public String name;
    public String version;
    public String description;
    public String copyright;
    public String licenseFile;
    public String licenseText;
    public String licenseModified;
    public String path;

}
