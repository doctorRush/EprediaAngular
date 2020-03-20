package com.epredia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class EventParameter {
	
	@JsonProperty("event_type")
	private String eventType;
	@JsonProperty("activity")
	private String activity;
	@JsonProperty("description")
	private String description;
	@JsonProperty("commercial_region")
	private String commRegion;
	@JsonProperty("service_region")
	private String srvRegion;
	@JsonProperty("error_code")
	private String errorCode;
	
	
	
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	public String getActivity() {
		return activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCommRegion() {
		return commRegion;
	}
	public void setCommRegion(String commRegion) {
		this.commRegion = commRegion;
	}
	public String getSrvRegion() {
		return srvRegion;
	}
	public void setSrvRegion(String srvRegion) {
		this.srvRegion = srvRegion;
	}

	
}
