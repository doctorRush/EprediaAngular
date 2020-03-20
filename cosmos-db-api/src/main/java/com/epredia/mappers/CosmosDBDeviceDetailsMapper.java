package com.epredia.mappers;


import org.springframework.stereotype.Component;

import com.epredia.model.DeviceDetails;
import com.epredia.model.DeviceErrorModelBean;
import com.epredia.model.DeviceErrorServiceBean;
import com.epredia.model.DeviceMetadataModelBean;
import com.epredia.model.DeviceMetadataServiceBean;
import com.epredia.model.DeviceStatusModelBean;
import com.epredia.model.DeviceStatusServiceBean;
import com.epredia.model.DevicesInfoModelBean;
import com.epredia.model.DevicesInfoServiceBean;


@Component
public class CosmosDBDeviceDetailsMapper {
	
	public DevicesInfoModelBean  deviceDetails(DevicesInfoServiceBean bean)
	{
		DevicesInfoModelBean modelBean= new DevicesInfoModelBean();
		
		if(bean.getDeviceDetails()!=null && bean.getDeviceDetails().size()>0)
		{
			DeviceDetails temp = bean.getDeviceDetails().get(0);
			modelBean.setUserId(temp.getUserId());
			modelBean.setDevices(temp.getDevicesInfo());
		}
		
		
		return modelBean;
	}

	public DeviceMetadataModelBean  deviceMetadataDetails(DeviceMetadataServiceBean bean)
	{
		DeviceMetadataModelBean modelBean= new DeviceMetadataModelBean();
		
//		if(bean.getDeviceMetdataDetails()!=null && bean.getDeviceMetdataDetails().size()>0)
//		{
//			DeviceMetadataDetails temp = bean.getDeviceMetdataDetails().get(0);
//			
//		}
		
		modelBean.setListObj(bean.getDeviceMetdataDetails());
		
		
		return modelBean;
	}

	public DeviceStatusModelBean statusMessages(DeviceStatusServiceBean deviceInfoRespObj) {
		
		DeviceStatusModelBean modelBean= new DeviceStatusModelBean();
		modelBean.setDeviceStatus(deviceInfoRespObj.getDeviceDetails());
		
		return modelBean;
	}

	public DeviceErrorModelBean errorMessages(
			DeviceErrorServiceBean deviceInfoRespObj) {
		DeviceErrorModelBean modelBean=new DeviceErrorModelBean();
		modelBean.setDeviceErrors(deviceInfoRespObj.getDeviceErrors());
		return modelBean;
	}
	
}
