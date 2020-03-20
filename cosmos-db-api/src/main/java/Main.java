import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;


public class Main {

	public static void main(String[] args) {
		
		Instant now=Instant.now();
		Instant onehourbefore=now.minus(1, ChronoUnit.HOURS);
		System.out.println("now:"+now);
		System.out.println("one hour before:"+onehourbefore.toString());
		
		
		
	}

}
