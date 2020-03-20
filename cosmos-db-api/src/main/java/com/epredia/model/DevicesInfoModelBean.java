package com.epredia.model;

import java.util.List;

public class DevicesInfoModelBean {

	private String userId;
	private List<DeviceInfo> devices;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public List<DeviceInfo> getDevices() {
		return devices;
	}
	public void setDevices(List<DeviceInfo> devices) {
		this.devices = devices;
	}
	
	
	
}
