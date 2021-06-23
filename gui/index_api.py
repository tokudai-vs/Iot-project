import eel
import json
# Set web files folder
eel.init('web')

@eel.expose
def recieveJSValues(x):
    print(x)


eel.start('index.html', size=(300, 200))  # Start
