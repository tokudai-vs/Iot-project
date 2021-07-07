import paho.mqtt.client as mqttClient
import time
import argparse
import os
import json

#########################
# Required functionality:
#     Profiles
#     Communication with devices
#     Communication with UI
#########################

all_devices = []

Connected = False  # global variable for the state of the connection

broker_address = "127.0.0.1"  # Broker address
port = 1883  # Broker port
client_name = "controller"

def run_device(device,arg):
    os.system("python devices/"+device+".py "+arg)


def parse_incoming_message(incoming_message):
    # incoming message format : client_name/status
    # print(incoming_message)

    room, device, deviceid, status, value= [x for x in incoming_message.strip().split(" ")]
    arg = room+device+deviceid

    if value == "new":
        run_device(device, arg)
    
    else:
        if device == "Light":
            if status == "brightness":
                client.publish(arg, arg+"/brightness/"+value)
            if status == "status":
                if value == "off":
                    client.publish(arg, arg+"/power/False")
                elif value == "on":
                    client.publish(arg, arg+"/power/True")
        if device == "Fan":
            if status == "speed":
                client.publish(arg, arg+"/speed/"+value)
            if status == "status":
                if value == "off":
                    client.publish(arg, arg+"/power/False")
                elif value == "on":
                    client.publish(arg, arg+"/power/True")
        if device == "AC":
            if status == "temperature":
                client.publish(arg, arg+"/temp/"+value)
            if status == "status":
                if value == "off":
                    client.publish(arg,arg+"/power/False")
                elif value == "on":
                    client.publish(arg, arg+"/power/True")


def scenes(scene_args):
    # print(scene_args)
    scene, rank, status = [x for x in scene_args.strip().split(' ')]
    f = open("gui/web/scene.json","r")

    if status == "activated":
        data = json.load(f)
        for sc in data:
            if sc == scene+str(rank):
                for room in data[sc]:
                    for device_type in data[sc][room]:
                        for device in data[sc][room][device_type]:
                            d = data[sc][room][device_type][device]
                            message = room+" "+device_type+" "+device
                            if device_type == "AC":
                                status_message = message+' '+"status"+' '+str(d["status"])
                                value_message = message+' '+"temperature"+' '+str(d["temperature"])
                                parse_incoming_message(status_message)
                                parse_incoming_message(value_message)
                            elif device_type == "Fan":
                                status_message = message+' '+"status"+' '+str(d["status"])
                                value_message = message+' '+"speed"+' '+str(d["speed"])
                                parse_incoming_message(status_message)
                                parse_incoming_message(value_message)
                            elif device_type == "Light":
                                status_message = message+' '+"status"+' '+str(d["status"])
                                value_message = message+' '+"brightness"+' '+str(d["brightness"])
                                parse_incoming_message(status_message)
                                parse_incoming_message(value_message)


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected  # Use global variable
        Connected = True  # Signal connection
    else:
        print("Connection failed Return Code : ", rc)

def on_message(client, userdata, message):
    # cat, status = parse_incoming_message(message.payload.decode("utf-8"))
    # print(message.payload.decode("utf-8"))
    if "Scene" in message.payload.decode("utf-8"):
        scenes(message.payload.decode("utf-8"))
    else:    
        parse_incoming_message(message.payload.decode("utf-8"))


client = mqttClient.Client(client_name)  # create new instance
client.on_connect = on_connect  # attach function to callback
client.on_message = on_message  # attach function to callback
client.connect(broker_address, port=port)  # connect to broker
client.loop_start()  # start the loop
client.subscribe(client_name)

while Connected != True:  # Wait for connection
    time.sleep(0.1)

f = open('data/data.json', 'r')
data = json.load(f)



def initial_start(data):
    for room in data:
        for device_type in data[room]:
            for device in data[room][device_type]:
                arg = str(room+'_'+device_type+'_'+device)
                all_devices.append(arg)
                run_device(device_type,arg)

initial_start(data)



try:
    while True:
        pass
    # client.publish("fan1","value")
except KeyboardInterrupt:
    print("exiting")
    client.disconnect()
    client.loop_stop()