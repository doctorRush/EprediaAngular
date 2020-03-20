package com.epredia.cosmosdbapi;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages="com.epredia")
public class CosmosDbApiApplication {

	public static void main(String[] args) {
		ApplicationContext applicationContext=(ApplicationContext) SpringApplication.run(CosmosDbApiApplication.class, args);
		String [] beanNames=applicationContext.getBeanDefinitionNames();
		System.out.println("Beans loaded ...");
		for(String temp:beanNames)
		{
		System.out.println("--->"+temp);
		}
		
	}

}
