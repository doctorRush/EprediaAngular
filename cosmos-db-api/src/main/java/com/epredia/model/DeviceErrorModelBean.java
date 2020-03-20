package com.epredia.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeviceErrorModelBean {

	@JsonProperty(value="messages")
	private List<DeviceError> deviceErrors;

	public List<DeviceError> getDeviceErrors() {
		return deviceErrors;
	}

	public void setDeviceErrors(List<DeviceError> deviceErrors) {
		this.deviceErrors = deviceErrors;
	}

	

	
	
	
	
	
	
}
