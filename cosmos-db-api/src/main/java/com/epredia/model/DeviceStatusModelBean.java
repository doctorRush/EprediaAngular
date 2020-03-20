package com.epredia.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeviceStatusModelBean {

	@JsonProperty(value="messages")
	private List<DeviceStatus> deviceStatus;

	public List<DeviceStatus> getDeviceStatus() {
		return deviceStatus;
	}

	public void setDeviceStatus(List<DeviceStatus> deviceStatus) {
		this.deviceStatus = deviceStatus;
	}

	
	
	
	
	
	
}
