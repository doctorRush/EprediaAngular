package com.epredia.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceStatusServiceBean {
	
	@JsonProperty(value="Documents")
	private List<DeviceStatus> deviceDetails= new ArrayList<DeviceStatus>();

	public List<DeviceStatus> getDeviceDetails() {
		return deviceDetails;
	}

	public void setDeviceDetails(List<DeviceStatus> deviceDetails) {
		this.deviceDetails = deviceDetails;
	}

	
	
	

}


