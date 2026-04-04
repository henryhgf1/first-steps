
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY . .
ENV MAVEN_OPTS="-Xmx256m"
RUN mvn clean package -DskipTests


FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
