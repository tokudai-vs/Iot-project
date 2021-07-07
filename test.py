import json

f = open('data/data.json', 'r')
data = json.load(f)

# print(data)
for room in data:
    for device_type in data[room]:
        for device in data[room][device_type]:
            print(room+'_'+device_type+'_'+device)
            print('Status:'+str(data[room][device_type][device]))