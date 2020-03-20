package com.epredia.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceMetadataServiceBean {

	@JsonProperty(value="Documents")
	List<DeviceMetadataDetails> deviceMetdataDetails= new ArrayList<DeviceMetadataDetails>();

	public List<DeviceMetadataDetails> getDeviceMetdataDetails() {
		return deviceMetdataDetails;
	}

	public void setDeviceMetdataDetails(
			List<DeviceMetadataDetails> deviceMetdataDetails) {
		this.deviceMetdataDetails = deviceMetdataDetails;
	}
	
	
	
}
