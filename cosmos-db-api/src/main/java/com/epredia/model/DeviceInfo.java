package com.epredia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceInfo
{
	@JsonProperty("_id")
	private String deviceId;
	@JsonProperty("serialNumber")
	private String serialNumber;
	@JsonProperty("deviceName")
	private String deviceName;
	@JsonProperty("softwareVersion")
	private String swVersion;
	@JsonProperty("firmwareVersion")
	private String firmwareVersion;
	@JsonProperty("status")
	private String status;
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getSwVersion() {
		return swVersion;
	}
	public void setSwVersion(String swVersion) {
		this.swVersion = swVersion;
	}
	public String getFirmwareVersion() {
		return firmwareVersion;
	}
	public void setFirmwareVersion(String firmwareVersion) {
		this.firmwareVersion = firmwareVersion;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
