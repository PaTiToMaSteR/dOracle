#!/bin/bash
input=./oracles.txt
count=0
while IFS= read -r line
do
    tokens=($line)
    cmd="ACCOUNT_NUMBER=${count} URL_TO_QUERY=\"${tokens[0]}\" ATTRIBUTE_TO_FETCH=\"${tokens[1]}\" docker-compose -p p${count} up -d --build"
    echo ${cmd}
    eval $cmd
    (( count++ ))
done < "$input"
