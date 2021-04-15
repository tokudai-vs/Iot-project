#!/bin/sh
# Runs all the files according to the configuration

fans = 3
lights = 10
hvac = 3

gnome-terminal -e "python controller.py --fans=$fans --lights=$lights --hvac=$hvac"


for ((i=1;i<=lights;i++)); do
    gnome-terminal -e "python devices/light.py $i"
done

for ((i=1;i<=fans;i++)); do
    gnome-terminal -e "python devices/fan.py $i"
done

for ((i=1;i<=hvac;i++)); do
    gnome-terminal -e "python devices/hvac.py $i"
done
