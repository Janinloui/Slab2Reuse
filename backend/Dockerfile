# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim
# Copy the project files to the container
COPY . /slab2reuse

# Copy the Maven POM file explicitly to ensure it's available
COPY /slab2reuse/pom.xml /slab2reuse/pom.xml

# Set the working directory in the container
WORKDIR /slab2reuse

# Ensure the Maven wrapper exists and build the project
RUN apt-get update && apt-get install -y maven && \
	if [ -f mvnw ]; then chmod +x mvnw && ./mvnw dependency:resolve && ./mvnw clean package -DskipTests; \
	else mvn dependency:resolve && mvn clean package -DskipTests; fi

RUN mvn package

# Copy the build artifact from the host to the container
COPY /slab2reuse/target/*.jar slab2reuse.jar

# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "slab2reuse.jar"]