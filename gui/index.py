import eel
import json
import paho.mqtt.client as mqttClient
import time

# Set web files folder
eel.init('web')


# below function is used to create the new components in the JSON files
@eel.expose
def updateJSON(t0, t1, key, value):
    with open('web/data.json') as json_file:
        json_decoded = json.load(json_file)

    # print(json_decoded[t0][t1])
    # print(t0,t1,key,value)
    client.publish("controller", str(t0)+' ' +
                   str(t1)+' '+str(key)+' status new')
    json_decoded[t0][t1][key] = value

    with open('web/data.json', 'w') as json_file:
        json_file.write(json.dumps(json_decoded, sort_keys=True,
                        indent=4, separators=(',', ': ')))


# Below function is used to update the new componets in the json files
@eel.expose
def valueFromJS(t1, t2, t3, t4, value):
    # print(t1, t2, t3, t4, value)
    client.publish("controller", str(t1)+' '+str(t2) +
                   ' '+str(t3)+' '+str(t4)+' '+str(value))

    with open('web/data.json') as json_file:
        json_decoded = json.load(json_file)

    # print(json_decoded['LivingRoom']['Light'])
    json_decoded[t1][t2][t3][t4] = value

    with open('web/data.json', 'w') as json_file:
        json_file.write(json.dumps(json_decoded, sort_keys=True,
                        indent=4, separators=(',', ': ')))
    updatedata()

# below function is used to refresh the page


def updatedata():
    eel.updatePage()


# below function is used to check whether scene is activated or not
@eel.expose
def activateScene(x):
    client.publish("controller", x)


@eel.expose
def deactivateScene(x):
    client.publish("controller", x)


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

# try:
#     pass
# except KeyboardInterrupt:
#     print("exiting")
#     client.disconnect()
#     client.loop_stop()

# @eel.expose
# def updateScene(t1, t2, t3, t4, value):
#     print(t1, t2, t3, t4, value)

eel.start('home.html', size=(600, 600))  # Start
