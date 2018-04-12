<?php

class Connector
{
    public static $instance=null;
    public $conn;

    private function __construct()
    {
            echo "construct"
            $server = stream_socket_server("tcp://127.0.0.1:1337", $errno, $errorMessage);

            if ($server === false) {
                throw new UnexpectedValueException("Could not bind to socket: $errorMessage");
            }

            for (;;) {
                $client = @stream_socket_accept($server);
                echo "someone connected\n";
                if ($client) {
                    stream_copy_to_stream($client, $client);
                    fclose($client);
                }
            }
    }
    public static function getInstance()
    {
        if(is_null(self::$instance))
        {
            self::$instance = new Connector;
        }
        return self::$instance;
    }
    public function sendMsg($msg)
    {
        socket_write($this->conn,$msg);
    }
    public function getMsg()
    {
        $clients = array($this->conn);
        while(true)
        {
            $read = $clients;
            $wrSet = NULL;
            $errSet = NULL;
            if(socket_select($read, $wrSet,$errSet, 3) < 1)
            {
                continue;
            }
            foreach($read as $read_sock)
            {
                $data = @socket_read($read_sock,1024,PHP_BINARY_READ);
                socket_close($this->conn);
                return $data;
            }
        }
    }

}



?>