import paho.mqtt.client as mqttClient
import time
import sys
import math
import numpy as np
import random

#########################
# Required functionality:
#     Power: on/off
#     Brightness: 1-10
#     Color: RGB
#     MAC / IP
#########################


client_name = str(sys.argv[1])  # client name should be unique

# Required functionality variables
power = False
brightness = 10
color = [255, 255, 255]


def parse_incoming_message(incoming_message):
    # incoming message format : client_name/{power/brightness/color/status}/value
    c_name, category, value = [x for x in incoming_message.strip().split("/")]
    if c_name != client_name:
        print("Incorrect client")
    return category, value


def actions(category, value):
    if category == "power":
        power = value
        if value:
            print("Powered on")
        else:
            print("Powered off")
    if category == "brightness":
        brightness = value
        print("Brightness set to", value)
    if category == "color":
        color = value
    if category == "status":
        status_string = "power: " + str(power) + ", brightness: " + str(brightness) + ", color: " + str(color)
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
    # print(message.payload.decode("utf-8"))


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