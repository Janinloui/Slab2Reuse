# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY slab2reuse/pom.xml .
COPY slab2reuse/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar slab2reuse.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "slab2reuse.jar"]