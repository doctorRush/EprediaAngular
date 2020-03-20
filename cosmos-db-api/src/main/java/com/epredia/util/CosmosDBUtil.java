package com.epredia.util;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CosmosDBUtil {
	
	@Autowired
	private static RestTemplate restTemplate;
	
	private static Logger logger = LoggerFactory.getLogger(CosmosDBUtil.class);
	public static String getAuthorization(String verb,String resourceType,String resourceLink) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException
		{
		    String METHOD_NAME=" method name :String getAuthorization(String verb,String resourceType,String resourceLink) ";
			 logger.info(METHOD_NAME+" Enter! ");
			 String date=getCurrentTime();
			 logger.debug(METHOD_NAME+" Current Time:"+date);
			 
			 String payload=verb.toLowerCase()+"\n"
			 +resourceType.toLowerCase()+"\n"
			 +resourceLink+"\n"
			 +date.toLowerCase()+"\n"
			 +""+"\n";
			 logger.debug(METHOD_NAME+" Payload :"+payload);
			 
			 Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
			 SecretKeySpec secret_key = new SecretKeySpec(Base64.getDecoder().decode(CosmosDBApplicatonConstants.COSMOS_DB_KEY), "HmacSHA256");
			 sha256_HMAC.init(secret_key);
			 String signature = Base64.getEncoder().encodeToString(sha256_HMAC.doFinal(payload.getBytes("UTF-8")));
			 logger.debug(METHOD_NAME+" Signature :"+signature);
			 String authorization=URLEncoder.encode("type="+CosmosDBApplicatonConstants.KEY_TYPE+"&ver="+CosmosDBApplicatonConstants.TOKEN_VERSION+"&sig="+signature, "utf-8");
			 logger.debug(METHOD_NAME+"Authorizatoion String:"+authorization);
			 
			 logger.info(METHOD_NAME+" Exit! ");
			 return authorization;
		}

	 
	 public static String getCurrentTime()
	 {
		 String METHOD_NAME=" method name :public static String getCurrentTime() ";
		 logger.info(METHOD_NAME+" Enter! ");
		 String date=DateTimeFormatter.RFC_1123_DATE_TIME.format(ZonedDateTime.now(ZoneId.of("GMT")));
		 logger.debug(METHOD_NAME+" Returned date :"+date);
		 logger.info(METHOD_NAME+" Exit! ");
		 return date;
	 }
	 
	 public static String createEndpoint(String url)
	 {
		 String METHOD_NAME=" method name : public static String createEndpoint(String url) ";
		 logger.info(METHOD_NAME+" Enter! ");
		 StringBuilder endpointUrl = new StringBuilder();
		 endpointUrl.append(CosmosDBApplicatonConstants.COSMOS_DB_URL);
		 endpointUrl.append(url);
		 logger.debug(METHOD_NAME+" Endpoint URL :"+endpointUrl);
		 logger.info(METHOD_NAME+" Exit! ");
		 return endpointUrl.toString();
		 
	 }
	 
	 public static Object postRequest(String endpointUrl,HttpEntity requestEntity,Class responseObj) throws URISyntaxException
	 {
		 URI uri = new URI(endpointUrl);
		 //HttpEntity<String> requestEntity = new HttpEntity<>((String)request, headers);
		 ResponseEntity<Object> result = restTemplate.postForEntity(uri, requestEntity, responseObj);
		 return result.getBody();
	 }
}
