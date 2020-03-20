package com.epredia.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceDetails
{
	@JsonProperty("id")
	private String userId;
	@JsonProperty("devices")
	private List<DeviceInfo> devicesInfo = new ArrayList<DeviceInfo>();
    
	
	public String getUserId() {
		return userId;
	}
   
	
	public void setUserId(String userId) {
		this.userId = userId;
	}


	public List<DeviceInfo> getDevicesInfo() {
		return devicesInfo;
	}


	public void setDevicesInfo(List<DeviceInfo> devicesInfo) {
		this.devicesInfo = devicesInfo;
	}

	
   
	
}
