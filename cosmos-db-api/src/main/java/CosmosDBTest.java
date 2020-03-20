import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.io.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLPeerUnverifiedException;


public class CosmosDBTest {

	
		 String getAuthorization() throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException
		{
			String verb="POST";
			// String resourceType="colls";
			 String resourceType="docs";
			// String resourceType="dbs"; 
			// String resourceId = "dbs/epredia/colls/events";
			 String resourceId = "dbs/eprediaDB/colls/events";
			 //String resourceId = "dbs/epredia-iotdatabase/colls/revosDeviceMetadata";
			 //String resourceId = "dbs/epredia";
			 String date=getCurrentTime();
			 System.out.println(date);
			 String key="lOJpTfWxhCq0Zfd3NWaEDjHt811s84lWSwvTV0MS4chRZ3TcnwRj6ApicHeP3NopZunEuzH799Xx6gWM9yItzg=="; //epredia database
			 //String key="eMsOms4Q6dvXkVLuQ7tu0zrI2S1rnzwBAOFgrStQtEUjjWPnWFgahBS0VPPjQ8g7aXeI9Py7ociejaWd6FZb1A=="; //epredia-iotdatabase
			 String keyType = "master";
			 String tokenVersion = "1.0";
			 String payload=verb.toLowerCase()+"\n"
			 +resourceType.toLowerCase()+"\n"
			 +resourceId+"\n"
			 +date.toLowerCase()+"\n"
			 +""+"\n";
			 System.out.println("Payload : "+payload);
			 Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
			 SecretKeySpec secret_key = new SecretKeySpec(Base64.getDecoder().decode(key), "HmacSHA256");
			 sha256_HMAC.init(secret_key);
			 String signature = Base64.getEncoder().encodeToString(sha256_HMAC.doFinal(payload.getBytes("UTF-8")));
			 System.out.println("Signature:"+signature);
			 String authorization=URLEncoder.encode("type="+keyType+"&ver="+tokenVersion+"&sig="+signature, "utf-8");
			 System.out.println("Authorizatoion-->"+authorization);
			 return authorization;
		}
		 String getCurrentTime()
		 {
			 String date=DateTimeFormatter.RFC_1123_DATE_TIME.format(ZonedDateTime.now(ZoneId.of("GMT")));
			 System.out.println(date);
			 return date;
		 }
		 public static void main(String[] args) throws MalformedURLException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException
		   {
			 System.setProperty("java.net.useSystemProxies", "true");
			// HTTP
			 System.setProperty("http.proxyHost", "10.152.108.2");
			 System.setProperty("http.proxyPort", "80");
			 System.setProperty("http.nonProxyHosts", "localhost|127.0.0.1");

			 // HTTPS
			 System.setProperty("https.proxyHost", "10.152.108.2");
			 System.setProperty("https.proxyPort", "80");
			 
			 //String cosmosdb="https://www.google.com/";
		    // String cosmosdb="https://pkumar17.documents.azure.com/dbs/epredia/colls/events";
		    // String cosmosdb="https://pkumar17.documents.azure.com/dbs/epredia";
		    // String cosmosdb="https://epredia.documents.azure.com/dbs/eprediaDB/colls/events/docs/naman";
		     String cosmosdb="https://epredia.documents.azure.com/dbs/eprediaDB/colls/devices/docs";
		    		 
		        new CosmosDBTest().testIt(new URL(cosmosdb));
		     //new CosmosDBTest().getAuthorization();
		   }
			
		   private void testIt(URL paramURL) throws InvalidKeyException, NoSuchAlgorithmException{

		      
		      URL url;
		      try {

			     url = paramURL;
			     HttpsURLConnection con = (HttpsURLConnection)url.openConnection();
					con.setDoInput(true);
					con.setDoOutput(true);
					con.setRequestMethod("GET");
					con.setRequestProperty("x-ms-version","2018-12-31" );
					con.setRequestProperty("x-ms-date",getCurrentTime() );
					//con.setRequestProperty("x-ms-consistency-level","Session" );
					
					//con.setRequestProperty("x-ms-documentdb-partitionkey","[\"events\"]" );
					
					con.setRequestProperty("Authorization",getAuthorization() );
			     //dumpl all cert info
			    // print_https_cert(con);
					
			     //dump all the content
			     print_content(con);
					
		      } catch (MalformedURLException e) {
			     e.printStackTrace();
		      } catch (IOException e) {
			     e.printStackTrace();
		      }

		   }
			
		   private void print_https_cert(HttpsURLConnection con){
		     
		    if(con!=null){
					
		      try {
						
			System.out.println("Response Code : " + con.getResponseCode());
			System.out.println("Cipher Suite : " + con.getCipherSuite());
			System.out.println("\n");
						
			Certificate[] certs = con.getServerCertificates();
			for(Certificate cert : certs){
			   System.out.println("Cert Type : " + cert.getType());
			   System.out.println("Cert Hash Code : " + cert.hashCode());
			   System.out.println("Cert Public Key Algorithm : " 
		                                    + cert.getPublicKey().getAlgorithm());
			   System.out.println("Cert Public Key Format : " 
		                                    + cert.getPublicKey().getFormat());
			   System.out.println("\n");
			}
						
			} catch (SSLPeerUnverifiedException e) {
				e.printStackTrace();
			} catch (IOException e){
				e.printStackTrace();
			}

		     }
			
		   }
			
		   private void print_content(HttpsURLConnection con) throws IOException{
			   System.out.println("Response Code : " + con.getResponseCode());
			if(con!=null){
					
			try {
				
			   System.out.println("****** Content of the URL ********");			
			   BufferedReader br = 
				new BufferedReader(
					new InputStreamReader(con.getInputStream()));
						
			   String input;
						
			   while ((input = br.readLine()) != null){
			      System.out.println(input);
			   }
			   br.close();
						
			} catch (IOException e) {
			   e.printStackTrace();
			}
					
		       }
				
		   }

	}


