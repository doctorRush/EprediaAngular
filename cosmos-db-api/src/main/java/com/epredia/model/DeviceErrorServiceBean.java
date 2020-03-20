package com.epredia.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceErrorServiceBean {
	
	@JsonProperty(value="Documents")
	private List<DeviceError> deviceErrors= new ArrayList<DeviceError>();

	public List<DeviceError> getDeviceErrors() {
		return deviceErrors;
	}

	public void setDeviceErrors(List<DeviceError> deviceErrors) {
		this.deviceErrors = deviceErrors;
	}

	

	

	
	
	

}


