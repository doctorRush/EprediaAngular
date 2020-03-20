package com.epredia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceMetadataDetails {
	
	@JsonProperty(value="deviceId")
	private String deviceId;
	@JsonProperty(value="request")
	private String request;
	@JsonProperty(value="chamber_status")
	private String chamberStatus;
	@JsonProperty(value="date")
	private String date;
	@JsonProperty(value="protocol_name")
	private String protocolName;
	@JsonProperty(value="reagent_name")
	private String reagentName;
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getRequest() {
		return request;
	}
	public void setRequest(String request) {
		this.request = request;
	}
	public String getChamberStatus() {
		return chamberStatus;
	}
	public void setChamberStatus(String chamberStatus) {
		this.chamberStatus = chamberStatus;
	}
	public String getProtocolName() {
		return protocolName;
	}
	public void setProtocolName(String protocolName) {
		this.protocolName = protocolName;
	}
	public String getReagentName() {
		return reagentName;
	}
	public void setReagentName(String reagentName) {
		this.reagentName = reagentName;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	

}
