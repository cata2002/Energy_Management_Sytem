#FROM ubuntu:latest
#LABEL authors="robot"
#
#ENTRYPOINT ["top", "-b"]
FROM maven:3.8.3-openjdk-17 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package
EXPOSE 8082
ENTRYPOINT ["java","-jar","/home/app/target/monitoring-0.0.1-SNAPSHOT.jar"]