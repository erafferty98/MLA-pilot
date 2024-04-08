plugins {
	java
	id("org.springframework.boot") version "2.7.16"
	id("io.spring.dependency-management") version "1.0.15.RELEASE"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_1_8
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.passay:passay:1.6.0") // Add Passay dependency
	implementation ("org.springframework.boot:spring-boot-starter-oauth2-client") // Add Spring OAuth2 dependency
	implementation("javax.validation:validation-api:2.0.1.Final") // Add javax.validation dependency
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
		    // Micrometer Prometheus registry for exposing metrics
    implementation("io.micrometer:micrometer-registry-prometheus")
    // Spring Boot Actuator for metrics endpoint
    implementation ("org.springframework.boot:spring-boot-starter-actuator")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("org.mockito:mockito-core:3.+")
}

tasks.withType<Test> {
	useJUnitPlatform()
}