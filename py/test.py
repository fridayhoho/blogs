import time
from threading import Timer
import json

def print_time( enter_time ):
    print "now is", time.time() , "enter_the_box_time is", enter_time
    Timer(1,  print_time, ( time.time(), )).start()


# Timer(1,  print_time, ( time.time(), )).start()
jsonData = '{"a":1,"b":2,"c":3,"d":4,"e":5}';

text = json.loads(jsonData)

print text['a']

print("\033[1;33;31m==serverACK===="+ str(text['a'])+" \033[0m")

