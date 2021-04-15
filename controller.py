import paho.mqtt.client as mqttClient
import time
import argparse

#########################
# Required functionality:
#     Profiles
#     Communication with devices
#     Communication with UI
#########################

parser = argparse.ArgumentParser(description='get configuration values')
parser.add_argument('--fans', type=int, default= 1)
parser.add_argument('--lights', type=int, default= 1)
parser.add_argument('--hvac', type=int, default= 1)


all_devices = []

client_name = "HQ"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected  # Use global variable
        Connected = True  # Signal connection
    else:
        print("Connection failed Return Code : ", rc)


def on_message(client, userdata, message):


Connected = False  # global variable for the state of the connection

broker_address = "127.0.0.1"  # Broker address
port = 1883  # Broker port

client = mqttClient.Client(client_name)  # create new instance
client.on_connect = on_connect  # attach function to callback
client.on_message = on_message  # attach function to callback
client.connect(broker_address, port=port)  # connect to broker
client.loop_start()  # start the loop


for cl in all_devices:
    client.subscribe(cl)
while Connected != True:  # Wait for connection
    time.sleep(0.1)

try:

except KeyboardInterrupt:
    print("exiting")
    client.disconnect()
    client.loop_stop()