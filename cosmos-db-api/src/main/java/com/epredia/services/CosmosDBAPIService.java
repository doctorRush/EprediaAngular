package com.epredia.services;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.epredia.mappers.CosmosDBDeviceDetailsMapper;
import com.epredia.model.DeviceErrorModelBean;
import com.epredia.model.DeviceErrorServiceBean;
import com.epredia.model.DeviceMetadataModelBean;
import com.epredia.model.DeviceMetadataServiceBean;
import com.epredia.model.DeviceStatusModelBean;
import com.epredia.model.DeviceStatusServiceBean;
import com.epredia.model.DevicesInfoModelBean;
import com.epredia.model.DevicesInfoServiceBean;
import com.epredia.util.CosmosDBApplicatonConstants;
import com.epredia.util.CosmosDBUtil;

@Component
public class CosmosDBAPIService {
	
	private  Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	CosmosDBDeviceDetailsMapper cosmosDBDeviceDetailsMapper;
	
	@Bean
	public RestTemplate rest() {
	return new RestTemplate();
	 }
	
	
	public DevicesInfoModelBean getDevices(String userId) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, URISyntaxException
	{
		String METHOD_NAME=" method name : public DevicesInfoModelBean getDevices(String userId) ";
		logger.info(METHOD_NAME+" Enter !");
		final String baseUrl = CosmosDBUtil.createEndpoint(CosmosDBApplicatonConstants.DB_DEVICES_ENDPOINT);
		
		URI uri = new URI(baseUrl);
		logger.debug(METHOD_NAME+" Endpoint :"+uri.getPath()); 
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("x-ms-version","2018-12-31");  
	    headers.set("x-ms-date",CosmosDBUtil.getCurrentTime());
	    //headers.set("Authorization",CosmosDBUtil.getAuthorization("POST", "docs", "dbs/eprediaDB/colls/devices"));
	    headers.set("Authorization",CosmosDBUtil.getAuthorization("POST", "docs", "dbs/epredia-iotdatabase/colls/revosUserDeviceDetails"));
	    headers.set("x-ms-documentdb-isquery","True");
	    headers.set("Content-Type","application/query+json");
	    headers.set("x-ms-documentdb-query-enablecrosspartition","true");  
	    
	    String query ="{\"query\": \"SELECT * FROM revosUserDeviceDetails d where d.id = @id\",\"parameters\": [{\"name\": \"@id\",\"value\": \""+userId+"\"}]}";
	    logger.debug(METHOD_NAME+" Query :"+query); 
	    HttpEntity<String> requestEntity = new HttpEntity<String>(query, headers);
	    ResponseEntity<DevicesInfoServiceBean> result = restTemplate.postForEntity(uri, requestEntity, DevicesInfoServiceBean.class);
	    DevicesInfoServiceBean deviceInfoRespObj=result.getBody();
	    	    
	    //DevicesInfoServiceBean deviceInfoRespObj=(DevicesInfoServiceBean) CosmosDBUtil.postRequest(endpointUrl, requestEntity, DevicesInfoServiceBean.class);
	    logger.info(METHOD_NAME+" Exit !");
	    return cosmosDBDeviceDetailsMapper.deviceDetails(deviceInfoRespObj);
	    
		
	}
	
//	public DeviceMetadataModelBean getDeviceMetadata(String deviceId) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, URISyntaxException
//	{
//		
//		final String baseUrl = "https://epredia.documents.azure.com/dbs/eprediaDB/colls/events/docs";
//	    URI uri = new URI(baseUrl);
//	     
//	    HttpHeaders headers = new HttpHeaders();
//	    headers.set("x-ms-version","2018-12-31");  
//	    headers.set("x-ms-date",CosmosDBUtil.getCurrentTime());
//	    headers.set("Authorization",CosmosDBUtil.getAuthorization("POST", "docs", "dbs/eprediaDB/colls/events")); 
//	    headers.set("x-ms-documentdb-isquery","True");
//	    headers.set("Content-Type","application/query+json");
//	    headers.set("x-ms-documentdb-query-enablecrosspartition","true");  
//	    
//	    String query ="{\"query\": \"SELECT * FROM events e where e.id = @id\",\"parameters\": [{\"name\": \"@id\",\"value\": \""+deviceId+"\"}]}";
//	    HttpEntity<String> requestEntity = new HttpEntity<String>(query, headers);
//	 
//	    ResponseEntity<DeviceMetadataServiceBean> result = restTemplate.postForEntity(uri, requestEntity, DeviceMetadataServiceBean.class);
//	    System.out.println("Devices size--->"+result.getBody().getDeviceMetdataDetails().size());
//	    
//	    return cosmosDBDeviceDetailsMapper.deviceMetadataDetails(result.getBody());
//	    
//		
//	}
	public DeviceMetadataModelBean getDeviceMetadata(String deviceId) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, URISyntaxException
	{
		
		final String baseUrl = CosmosDBUtil.createEndpoint(CosmosDBApplicatonConstants.DOC_EVENTS_ENDPOINT);
	    URI uri = new URI(baseUrl);
	     
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("x-ms-version","2018-12-31");  
	    headers.set("x-ms-date",CosmosDBUtil.getCurrentTime());
	    headers.set("Authorization",CosmosDBUtil.getAuthorization("POST", "docs", "dbs/epredia-iotdatabase/colls/revosDeviceMetadata")); 
	    headers.set("x-ms-documentdb-isquery","True");
	    headers.set("Content-Type","application/query+json");
	    headers.set("x-ms-documentdb-query-enablecrosspartition","true");  
	    
	    String query ="{\"query\": \"SELECT * FROM revosDeviceMetadata e where e.deviceId = @id AND e.request='updatemetadata' \",\"parameters\": [{\"name\": \"@id\",\"value\": "+deviceId+"}]}";
	    HttpEntity<String> requestEntity = new HttpEntity<String>(query, headers);
	 
	    ResponseEntity<DeviceMetadataServiceBean> result = restTemplate.postForEntity(uri, requestEntity, DeviceMetadataServiceBean.class);
	    System.out.println("Devices size--->"+result.getBody().getDeviceMetdataDetails().size());
	    
	    return cosmosDBDeviceDetailsMapper.deviceMetadataDetails(result.getBody());
	    
		
	}

	public DeviceStatusModelBean getStatusMessages(String deviceId,String eventType) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, URISyntaxException
	{
		String METHOD_NAME=" method name :   ";
		logger.info(METHOD_NAME+" Enter !");
		final String endpointUrl = CosmosDBUtil.createEndpoint(CosmosDBApplicatonConstants.DOC_EVENTS_ENDPOINT);
		URI uri = new URI(endpointUrl);
		logger.debug(METHOD_NAME+" Endpoint :"+uri.getPath()); 
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("x-ms-version","2018-12-31");  
	    headers.set("x-ms-date",CosmosDBUtil.getCurrentTime());
	    headers.set("Authorization",CosmosDBUtil.getAuthorization("POST", "docs", "dbs/eprediaDB/colls/events")); 
	    headers.set("x-ms-documentdb-isquery","True");
	    headers.set("Content-Type","application/query+json");
	    headers.set("x-ms-documentdb-query-enablecrosspartition","true");  
	    
	    	    
	    String query=createStatusMessageQuery(deviceId, eventType);
	    logger.debug(METHOD_NAME+" Query :"+query); 
	    HttpEntity<String> requestEntity = new HttpEntity<String>(query, headers);
	    ResponseEntity<DeviceStatusServiceBean> result = restTemplate.postForEntity(uri, requestEntity, DeviceStatusServiceBean.class);
	    DeviceStatusServiceBean deviceInfoRespObj=result.getBody();
	    	    
	    //DevicesInfoServiceBean deviceInfoRespObj=(DevicesInfoServiceBean) CosmosDBUtil.postRequest(endpointUrl, requestEntity, DevicesInfoServiceBean.class);
	    logger.info(METHOD_NAME+" Exit !");
	    return cosmosDBDeviceDetailsMapper.statusMessages(deviceInfoRespObj);
	    
		
	}
	public DeviceErrorModelBean getEventMessages(String deviceId,String eventType) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, URISyntaxException
	{
		String METHOD_NAME=" method name :   ";
		logger.info(METHOD_NAME+" Enter !");
		final String endpointUrl = CosmosDBUtil.createEndpoint(CosmosDBApplicatonConstants.DOC_EVENTS_ENDPOINT);
		URI uri = new URI(endpointUrl);
		logger.debug(METHOD_NAME+" Endpoint :"+uri.getPath()); 
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("x-ms-version","2018-12-31");  
	    headers.set("x-ms-date",CosmosDBUtil.getCurrentTime());
	    headers.set("Authorization",CosmosDBUtil.getAuthorization("POST", "docs", "dbs/eprediaDB/colls/events")); 
	    headers.set("x-ms-documentdb-isquery","True");
	    headers.set("Content-Type","application/query+json");
	    headers.set("x-ms-documentdb-query-enablecrosspartition","true");  
	    
	    	    
	    String query=createErrorMessageQuery(deviceId, eventType);
	    logger.debug(METHOD_NAME+" Query :"+query); 
	    HttpEntity<String> requestEntity = new HttpEntity<String>(query, headers);
	    ResponseEntity<DeviceErrorServiceBean> result = restTemplate.postForEntity(uri, requestEntity, DeviceErrorServiceBean.class);
	    DeviceErrorServiceBean deviceInfoRespObj=result.getBody();
	    	    
	    //DevicesInfoServiceBean deviceInfoRespObj=(DevicesInfoServiceBean) CosmosDBUtil.postRequest(endpointUrl, requestEntity, DevicesInfoServiceBean.class);
	    logger.info(METHOD_NAME+" Exit !");
	    return cosmosDBDeviceDetailsMapper.errorMessages(deviceInfoRespObj);
	    
		
	}
	
    private String createStatusMessageQuery(String deviceId,String eventType)
    {
    	String METHOD_NAME=" method name: String createStatusMessageQuery(String deviceId,String eventType) ";
    	Instant now=Instant.now();
    	Instant previous=now.minus(1, ChronoUnit.HOURS);
    	StringBuilder query = new StringBuilder();
    	query.append("{\"query\": \"SELECT * FROM events e where ");
    	query.append("e.deviceid=@deviceid ");
    	//query.append(deviceId+"' ");
    	if(null==eventType||eventType.trim().equalsIgnoreCase(""))
    	{
    		
    	query.append(" AND (e.eventKey='ACTIVITY_STATUS' OR e.eventKey='VALVE_MOVE_COMPLETE')");
    	query.append(" AND (e[\'timestamp\'] BETWEEN \'"+previous.toString()+"\' AND \'"+now.toString()+"\'"+")");
    	}
    	else if (null!=eventType&&eventType.trim().equalsIgnoreCase("ACTIVITY_STATUS"))
    	{
    		query.append(" AND (e.eventKey='ACTIVITY_STATUS')");
        	query.append(" AND (e[\'timestamp\'] BETWEEN \'"+previous.toString()+"\' AND \'"+now.toString()+"\'"+")");
    	}
    	else if (null!=eventType&&eventType.trim().equalsIgnoreCase("VALVE_MOVE_COMPLETE"))
    	{
    		query.append(" AND (e.eventKey='VALVE_MOVE_COMPLETE')");
        	query.append(" AND (e[\'timestamp\'] BETWEEN \'"+previous.toString()+"\' AND \'"+now.toString()+"\'"+")");
    	}
    	query.append("\"");
    	query.append(",");
    	query.append("\"parameters\":");
    	query.append("[{\"name\": \"@deviceid\",\"value\":\"");
    	query.append(deviceId+"\"");
    	query.append("}]");
    	query.append("}");
    	logger.debug(METHOD_NAME+"Query:"+query.toString());
    	
    	return query.toString();
    	//StringBuilder query ="{\"query\": \"SELECT * FROM events e where e.id = @id\",\"parameters\": [{\"name\": \"@id\",\"value\": \""+deviceid+"\"}]}";
    	
    }
    
    private String createErrorMessageQuery(String deviceId,String eventType)
    {
    	String METHOD_NAME=" method name: String createErrorMessageQuery(String deviceId,String eventType) ";
    	Instant now=Instant.now();
    	Instant previous=now.minus(1, ChronoUnit.HOURS);
    	StringBuilder query = new StringBuilder();
    	query.append("{\"query\": \"SELECT * FROM events e where ");
    	query.append("e.deviceid=@deviceid ");
    	//query.append(deviceId+"' ");
    	if(null==eventType||eventType.trim().equalsIgnoreCase(""))
    	{
    		
    	query.append(" AND (e.eventKey='FAULT_STATUS' OR e.eventKey='WARNING_STATUS')");
    	query.append(" AND (e[\'timestamp\'] BETWEEN \'"+previous.toString()+"\' AND \'"+now.toString()+"\'"+")");
    	}
    	else if (null!=eventType&&eventType.trim().equalsIgnoreCase("FAULT_STATUS"))
    	{
    		query.append(" AND (e.eventKey='FAULT_STATUS')");
        	query.append(" AND (e[\'timestamp\'] BETWEEN \'"+previous.toString()+"\' AND \'"+now.toString()+"\'"+")");
    	}
    	else if (null!=eventType&&eventType.trim().equalsIgnoreCase("WARNING_STATUS"))
    	{
    		query.append(" AND (e.eventKey='WARNING_STATUS')");
        	query.append(" AND (e[\'timestamp\'] BETWEEN \'"+previous.toString()+"\' AND \'"+now.toString()+"\'"+")");
    	}
    	query.append("\"");
    	query.append(",");
    	query.append("\"parameters\":");
    	query.append("[{\"name\": \"@deviceid\",\"value\":\"");
    	query.append(deviceId+"\"");
    	query.append("}]");
    	query.append("}");
    	logger.debug(METHOD_NAME+"Query:"+query.toString());
    	
    	return query.toString();
    	//StringBuilder query ="{\"query\": \"SELECT * FROM events e where e.id = @id\",\"parameters\": [{\"name\": \"@id\",\"value\": \""+deviceid+"\"}]}";
    	
    }
}
