package com.epredia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class CosmosDBAPIResponse {
	
	@JsonProperty(value="deviceInfo")
	private DevicesInfoModelBean devicesInfoBean;
	
	@JsonProperty(value="deviceMetdata")
	private DeviceMetadataModelBean deviceMetadata;
	@JsonProperty(value="deviceStatus")
	private DeviceStatusModelBean deviceStatus;
	
	@JsonProperty(value="deviceEvents")
	private DeviceErrorModelBean deviceEvent;
	
	
	private String errorCode;
	
	private String errorMsg;

	public DeviceMetadataModelBean getDeviceMetadata() {
		return deviceMetadata;
	}

	public void setDeviceMetadata(DeviceMetadataModelBean deviceMetadata) {
		this.deviceMetadata = deviceMetadata;
	}

	public DevicesInfoModelBean getDevicesInfoBean() {
		return devicesInfoBean;
	}

	public void setDevicesInfoBean(DevicesInfoModelBean devicesInfoBean) {
		this.devicesInfoBean = devicesInfoBean;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public DeviceStatusModelBean getDeviceStatus() {
		return deviceStatus;
	}

	public void setDeviceStatus(DeviceStatusModelBean deviceStatus) {
		this.deviceStatus = deviceStatus;
	}

	public DeviceErrorModelBean getDeviceEvent() {
		return deviceEvent;
	}

	public void setDeviceEvent(DeviceErrorModelBean deviceEvent) {
		this.deviceEvent = deviceEvent;
	}

	
	
	
	

}
