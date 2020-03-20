package com.epredia.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DevicesInfoServiceBean {
	
	@JsonProperty(value="Documents")
	List<DeviceDetails> deviceDetails= new ArrayList<DeviceDetails>();

	public List<DeviceDetails> getDeviceDetails() {
		return deviceDetails;
	}

	public void setDeviceDetails(List<DeviceDetails> deviceDetails) {
		this.deviceDetails = deviceDetails;
	}
	
	

}


