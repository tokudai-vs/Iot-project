import paho.mqtt.client as mqttClient
import time
import sys
import math
import numpy as np

#########################
# Required functionality:
#     Power: on/off
#     Speed control: 0-5
#     MAC / IP
#########################


# client_name = 'fan'+str(sys.argv[1])  # client name should be unique
client_name = "fan1"
# Required functionality variables
power = False
speed = 0


def parse_incoming_message(incoming_message):
    # incoming message format : client_name/{power/speed/status}/value
    c_name, category, value = [x for x in incoming_message.strip().split("/")]
    if c_name != client_name:
        print("Incorrect client")
    return category, value


def actions(category, value):
    if category == "power":
        power = value
    if category == "speed":
        speed = value
    if category == "status":
        status_string = "power: " + str(power) + ", speed: " + str(speed)
        client.publish("controller_return_channel",client_name + "/" + status_string)


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected  # Use global variable
        Connected = True  # Signal connection
    else:
        print("Connection failed")


def on_message(client, userdata, message):
    cat, val = parse_incoming_message(message.payload.decode("utf-8"))
    actions(cat, val)

Connected = False  # global variable for the state of the connection
broker_address = "127.0.0.1"  # Broker address
port = 1883  # Broker port
user = "admin"  # Connection username
password = "hivemq"  # Connection password


client = mqttClient.Client(client_name)  # create new instance
client.on_connect = on_connect  # attach function to callback
client.on_message = on_message  # attach function to callback
client.connect(broker_address, port=port)  # connect to broker
client.loop_start()  # start the loop
client.subscribe(client_name)
# client.subscribe( + client_name)

while Connected != True:  # Wait for connection
    time.sleep(0.1)

try:
    while True:
        time.sleep(2)
except KeyboardInterrupt:
    print("exiting")
    client.disconnect()
    client.loop_stop()