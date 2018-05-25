#coding=utf-8
import socket
import sys
import select
import time
from threading import Timer
import datetime
import json

# 1, conn
# 2, send heartBeat
# 3,查车费
def startBeat():
    Timer(0,  sendHearBeat).start()
def sendHearBeat():
    t = time.time()
    data = {
        "head": {
            "cmd": 2001,
            "parkinglotId": 10086,#6位
            "reqTime": int(t),
            "messageId":1 #消息ID，C端回包时原样带上即可
        },
        "reqData": {
            "actType":"heartBeat"
        }
    }
    jsonS = json.dumps(data)
    sys.stdout.write('==sendBeatMsg: '+ jsonS+'\n')
    my_socket.send(jsonS)
    Timer(10,  sendHearBeat).start()

def reqCarFee():
    t = time.time()
    data = {
        "head": {
            "cmd": 2002,
            "parkinglotId": 10086,#6位
            "reqTime": int(t),
            "messageId" : 2,#消息ID，C端回包时原样带上即可
        },
        "reqData": {
             "plateNumber":"粤B88888",#车牌
        }
    }
    jsonS = json.dumps(data)
    sys.stdout.write('===sendMsg===:\n '+ jsonS)
    my_socket.send(jsonS)

def ackFee():
    t = time.time()
    data = {
        "head": {
            "cmd": 2002,
            "parkinglotId": 10086,#6位
            "reqTime": int(t)
        },
        "respData": {
            "retCode": 0,
            "retMsg": "查询成功",
            "messageId":1, #消息ID，C端回包时原样带上即可
            "actData":{
                "sequenceNumber":10000000, #车辆入场产生的序列号，8位
                "plateNumber":"粤B18168",
                "enterTime":1526716142,
                "curCutOffTime":1526716142, #本次计算费用截止时间
                "needParkingFee":1000,#总共应收金额，单位分
                "curNeedParkingFee":800,#本次应收总金额，单位分
                "parkingFeePaid":100, #已经支付总金额，单位分
                "parkingFeeCoupon":100, #优惠金额
                "parkingTimeCoupon":360000,#优惠时长，单位秒
                "parkingTime":7200000,#停车时长
                "paidFreeTime":54000,#付费后免费出场时间，单位秒
                "recharge_Index":10000000000,#c端生成的唯一订单号，10位，支付信息下发时带上该id
                "comments":"" #备注
            }
        }
    }
    jsonS = json.dumps(data)
    sys.stdout.write('===sendMsg===:\n '+ jsonS)
    my_socket.send(jsonS)


def ackPaySuccess():
    t = time.time()
    data = {
        "head": {
            "cmd": 2004,
            "parkinglotId": 10086,#6位
            "reqTime":int(t)
        },
        "respData": {
            "retCode": 0,
            "retMsg": "下发成功",
            "messageId":1, #消息ID，C端回包时原样带上即可
            "actData":{

            }
        }
    }
    jsonS = json.dumps(data)
    sys.stdout.write('===sendMsg===:\n '+ jsonS)
    my_socket.send(jsonS)

def delayPayBack():
    Timer(10,  ackPaySuccess).start()
# def readAck():
#     data = my_socket.recv(1024)
#     print "==serverACK====:\n" , data

# def startReadAck():
#     Timer(0.1,  readAck).start()
#============================================================================
my_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
socket_ip = "123.207.110.89"
socket_port = 28853
try:
    sys.stdout.write('connecting: '+ str(socket_ip)+': '+str(socket_port)+"\n")
    my_socket.connect((socket_ip, socket_port))
    startBeat()
except socket.error,msg:
      raise SocketError,'Connection refused to '+str(socket_ip)+' on port '+str(socket_port)

# sys.stdout.write('your message: ')
# sys.stdout.flush()
while True:
    # r, w, x = select.select([sys.stdin, my_socket], [], [])
    # if not r:
    #     continue
    # if r[0] is sys.stdin:
    #     message = raw_input()
    #     if message == "quit":
    #         my_socket.close()
    #         break
    #     sys.stdout.write('your message: ')
    #     sys.stdout.flush()
    # else:
    print "==waitServerACK====:\n"
    data = my_socket.recv(1024)
    print("\033[1;33;31m==serverACK===="+ data +" \033[0m")
    # print "==serverACK====:\n" , data
    pros = json.loads(data)
    if pros['head']['cmd'] == 2002:
        # 查车费
        ackFee()
    elif pros['head']['cmd'] == 2004:
        #通知支付成功ack
        delayPayBack()





