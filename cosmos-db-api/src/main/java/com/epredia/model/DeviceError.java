package com.epredia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceError
{
	@JsonProperty("deviceid")
	private String deviceId;
		
	@JsonProperty("request")
	private String request;
	@JsonProperty("datatype")
	private String datatype;
	@JsonProperty("eventKey")
	private String eventKey;
	@JsonProperty("timestamp")
	private String timestamp;
	@JsonProperty("eventParameters")
	EventParameter eventParms;
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
	public String getDatatype() {
		return datatype;
	}
	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}
	public String getEventKey() {
		return eventKey;
	}
	public void setEventKey(String eventKey) {
		this.eventKey = eventKey;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public EventParameter getEventParms() {
		return eventParms;
	}
	public void setEventParms(EventParameter eventParms) {
		this.eventParms = eventParms;
	}

	
   
	
}
