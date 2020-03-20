package com.epredia.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeviceMetadataModelBean {

	@JsonProperty(value="events")
	private List<DeviceMetadataDetails> listObj;

	public List<DeviceMetadataDetails> getListObj() {
		return listObj;
	}

	public void setListObj(List<DeviceMetadataDetails> listObj) {
		this.listObj = listObj;
	}
	
	
	
	
}
