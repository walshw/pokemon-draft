#!/bin/bash
echo Starting both socket-server and webapp applications 🤖

node socket-server > serverlog.txt & 
cd webapp
npm start > ../webapplog.txt &
cd ..
sleep 6
while true
do
    clear
    CONSOLE_WIDTH="$(tput cols)"
    pr -m -t -w $CONSOLE_WIDTH -s" | " webapplog.txt serverlog.txt | sed 's/\x1B\[[0-9;]\{1,\}[A-Za-z]//g'
    echo -e "\n🤚🛑(ctrl/cmd)+c quit 🃏"
    sleep 3
done
wait
