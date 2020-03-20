package com.epredia.controller;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;








import com.epredia.model.CosmosDBAPIResponse;
import com.epredia.model.DeviceErrorModelBean;
import com.epredia.model.DeviceMetadataModelBean;
import com.epredia.model.DeviceStatusModelBean;
import com.epredia.model.DevicesInfoModelBean;
import com.epredia.services.CosmosDBAPIService;
import com.epredia.util.CosmosDBApplicatonConstants;


@RestController
@RequestMapping("/epredia/v1")
public class CosmosDBAPIController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	
//    static
//    {
//		 System.setProperty("java.net.useSystemProxies", "true");
//		// HTTP
//		 System.setProperty("http.proxyHost", "10.152.108.2");
//		 System.setProperty("http.proxyPort", "80");
//		 System.setProperty("http.nonProxyHosts", "localhost|127.0.0.1");
//
//		 // HTTPS
//		 System.setProperty("https.proxyHost", "10.152.108.2");
//		 System.setProperty("https.proxyPort", "80");
//    }
	@Autowired
	CosmosDBAPIService cosmosDBAPIService;
	
	@GetMapping("/healthCheck")
	public String healthCheck() {
		return "Webservice Deployed successfully !";

}
	
	@GetMapping(value="/{userId}/devices")
	public ResponseEntity getDevices(@PathVariable("userId") String userId)
	{
	    String METHOD_NAME=" method name: ResponseEntity getDevices(String userId) ";
	    logger.info(METHOD_NAME+" Enter !");
		logger.debug(METHOD_NAME+"UserID:"+userId);
		ResponseEntity response=null;
		CosmosDBAPIResponse respBean=new CosmosDBAPIResponse();
		try
		{
		DevicesInfoModelBean result=cosmosDBAPIService.getDevices(userId);
		respBean.setDevicesInfoBean(result);
		response=ResponseEntity.status(HttpStatus.OK).body(respBean);
		}
		catch(Exception e)
		{
		logger.error(METHOD_NAME+" Error:"+e.getMessage());	
		respBean=getGenericErrorObject();
		response=ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respBean);
		}
		logger.debug(METHOD_NAME+" Returned status:"+response.getStatusCodeValue());
		logger.info(METHOD_NAME+" Exit !");
	   	return response;
	}
	
	@GetMapping(value="/{deviceId}/metadata", produces={"application/json"})
	public ResponseEntity getDeviceMetadata(@PathVariable("deviceId") String deviceId) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, URISyntaxException
	{
	   	
		System.out.println("device id:"+deviceId);
		ResponseEntity response=null;
		
		CosmosDBAPIResponse respBean= new CosmosDBAPIResponse();
		DeviceMetadataModelBean result=cosmosDBAPIService.getDeviceMetadata(deviceId);
		respBean.setDeviceMetadata(result);
		response=ResponseEntity.status(HttpStatus.OK).body(respBean);
	   	return response;
	}
	
//	@GetMapping(value="/{deviceId}/telemetry", produces={"application/json"})
//	public ResponseEntity getDeviceTelemetry(@PathVariable("deviceId") String deviceId) 
//	{
//		String METHOD_NAME=" method name: ResponseEntity getDeviceTelemetry(String deviceId)  ";
//		logger.debug(METHOD_NAME+"Device id:"+deviceId);
//		ResponseEntity response=null;
//		
//		CosmosDBAPIResponse respBean= new CosmosDBAPIResponse();
//		try
//		{
//		DeviceMetadataModelBean result=cosmosDBAPIService.getDeviceMetadata(deviceId);
//		respBean.setDeviceMetadata(result);
//		response=ResponseEntity.status(HttpStatus.OK).body(respBean);
//		}
//		catch(Exception e)
//		{
//		logger.error(METHOD_NAME+" Error:"+e.getMessage());	
//		respBean=getGenericErrorObject();
//		response=ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respBean);
//		}
//		logger.debug(METHOD_NAME+" Returned status:"+response.getStatusCodeValue());
//		logger.info(METHOD_NAME+" Exit !");
//	   	return response;
//	}
	
	//@GetMapping(value="/{deviceId}/status/{eventType}", produces={"application/json"})
	@RequestMapping(value = {"/{deviceId}/status", "/{deviceId}/status/{eventType}"},method=RequestMethod.GET)
	public ResponseEntity getStatusMessages(@PathVariable("deviceId") String deviceId,@PathVariable(name="eventType",required=false) String eventType) 
	{
		String METHOD_NAME=" method name: ResponseEntity getDeviceStatusMsgs(String deviceId,String eventType) ";
	    logger.info(METHOD_NAME+" Enter !");
	    logger.debug(METHOD_NAME+"Device id:"+deviceId);
	    logger.debug(METHOD_NAME+"Event Type:"+eventType);
		
		ResponseEntity response=null;
		CosmosDBAPIResponse respBean= new CosmosDBAPIResponse();
		try
		{
		DeviceStatusModelBean result=cosmosDBAPIService.getStatusMessages(deviceId,eventType);
		respBean.setDeviceStatus(result);
		response=ResponseEntity.status(HttpStatus.OK).body(respBean);
	}
	catch(Exception e)
	{
	logger.error(METHOD_NAME+" Error:"+e.getMessage());	
	respBean=getGenericErrorObject();
	response=ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respBean);
	}
	logger.debug(METHOD_NAME+" Returned status:"+response.getStatusCodeValue());
	logger.info(METHOD_NAME+" Exit !");
	   	return response;
	}
   
	@RequestMapping(value = {"/{deviceId}/events", "/{deviceId}/events/{eventType}"},method=RequestMethod.GET)
	public ResponseEntity getEventsMessages(@PathVariable("deviceId") String deviceId,@PathVariable(name="eventType",required=false) String eventType) 
	{
		String METHOD_NAME=" method name: ResponseEntity getDeviceStatusMsgs(String deviceId,String eventType) ";
	    logger.info(METHOD_NAME+" Enter !");
	    logger.debug(METHOD_NAME+"Device id:"+deviceId);
	    logger.debug(METHOD_NAME+"Event Type:"+eventType);
		
		ResponseEntity response=null;
		CosmosDBAPIResponse respBean= new CosmosDBAPIResponse();
		try
		{
		DeviceErrorModelBean result=cosmosDBAPIService.getEventMessages(deviceId,eventType);
		respBean.setDeviceEvent(result);
		response=ResponseEntity.status(HttpStatus.OK).body(respBean);
	}
	catch(Exception e)
	{
	logger.error(METHOD_NAME+" Error:"+e.getMessage());	
	respBean=getGenericErrorObject();
	response=ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respBean);
	}
	logger.debug(METHOD_NAME+" Returned status:"+response.getStatusCodeValue());
	logger.info(METHOD_NAME+" Exit !");
	   	return response;
	}
	
	private CosmosDBAPIResponse getGenericErrorObject()
	{
		CosmosDBAPIResponse respBean= new CosmosDBAPIResponse();
		respBean.setErrorCode(CosmosDBApplicatonConstants.GENERIC_ERROR_CODE);
		respBean.setErrorMsg(CosmosDBApplicatonConstants.GENERIC_ERROR_MSG);
		return respBean;
	}
}
