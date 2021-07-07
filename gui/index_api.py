import eel
import json

import time
import paho.mqtt.client as mqttClient

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected  # Use global variable
        Connected = True  # Signal connection
    else:
        print("Connection failed Return Code : ", rc)

Connected = False  # global variable for the state of the connection

broker_address = "127.0.0.1"  # Broker address
port = 1883  # Broker port

client = mqttClient.Client("api")  # create new instance
client.on_connect = on_connect  # attach function to callback
client.connect(broker_address, port=port)  # connect to broker
client.loop_start()  # start the loop

while Connected != True:  # Wait for connection
    time.sleep(0.1)



# Set web files folder
eel.init('web')

@eel.expose
def recieveJSValues(x):
    try:
        client.publish(x)
    except:
        print("Error sending data to broker")
    # print(x)


eel.start('index.html')  # Start