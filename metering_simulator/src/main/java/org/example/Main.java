package org.example;

import com.opencsv.CSVReader;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.json.JSONObject;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

public class Main {
    private static final String QUEUE_NAME = "sensor_data_queue";
    private static final String CLOUDAMQP_URL = "amqps://marbaffn:XZqeOZenkbJaN0OSjDyzRjnR1TL97awY@kangaroo.rmq.cloudamqp.com/marbaffn";
    private static final String DEVICE_ID = "3";
    private static final String CSV_FILE_PATH = "C:\\Users\\robot\\Downloads\\sensor.csv";
    private static final long INTERVAL = 10 * 1000;

    private Channel channel;

    public Main() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri(CLOUDAMQP_URL);
        Connection connection = factory.newConnection();
        channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
    }

    public void start() throws IOException {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                try {
                    sendDataFromCSV();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, 0, INTERVAL);
    }

    private void sendDataFromCSV() {
        try (CSVReader reader = new CSVReader(new FileReader(Paths.get(CSV_FILE_PATH).toFile()))) {
            String[] nextLine;
            int lineCount = 0;
            double sumMeasurementValue = 0.0;
            double previousSum = 0.0;

            while ((nextLine = reader.readNext()) != null) {
                if (nextLine.length < 1 || nextLine[0].isEmpty()) {
                    System.out.println("Skipping empty or incomplete row.");
                    continue;
                }

                double measurementValue = Double.parseDouble(nextLine[0]);
                sumMeasurementValue += 0;
                lineCount++;

                if(lineCount == 5) {
                    sumMeasurementValue += measurementValue;
                }

                if (lineCount == 6) {
                    String timestamp = LocalDateTime.now().toString();
                    double difference = sumMeasurementValue - previousSum;

                    JSONObject message = new JSONObject();
                    message.put("timestamp", timestamp);
                    message.put("device_id", DEVICE_ID);
                    message.put("measurement_value", difference);

                    channel.basicPublish("", QUEUE_NAME, null, message.toString().getBytes());
                    System.out.println("Sent message: " + message.toString());

                    previousSum = sumMeasurementValue;
                    lineCount = 0;
                    sumMeasurementValue = 0.0;

                    Thread.sleep(INTERVAL);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
            Main simulator = new Main();
            simulator.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}