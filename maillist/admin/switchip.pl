#!/usr/bin/perl

use strict;
use warnings;
require 'sys/ioctl.ph';
use Socket;

my %interfaces;
my $max_addrs = 30;
my $i=0;
my @iplist;
my $FILE;
my $line;
my $IP;
my $NextIP;

###读取当前投递用IP，如无此文件表示未用轮循。
$FILE="/var/qmail/control/bindroutes";
open(MAIL,"<$FILE") || exit;
while($line=<MAIL>)
{
    $IP=$line;
}
close(MAIL);

socket(my $socket, AF_INET, SOCK_DGRAM, 0) or die "socket: $!";
{
    my $ifreqpack = 'a16a16';
    my $buf = pack($ifreqpack, '', '') x $max_addrs;
    my $ifconf = pack('iP', length($buf), $buf);

    # This does the actual work
    ioctl($socket, SIOCGIFCONF(), $ifconf) or die "ioctl: $!";

    my $len = unpack('iP', $ifconf);
    substr($buf, $len) = '';

    %interfaces = unpack("($ifreqpack)*", $buf);

    unless (keys(%interfaces) < $max_addrs) {
        # Buffer was too small
        $max_addrs += 10;
        redo;
    }
}

for my $addr (values %interfaces)
{
    $addr = inet_ntoa((sockaddr_in($addr))[1]);
    
    if($addr ne "127.0.0.1")            ##跳过本地127地址
    {
        $iplist[$i]=$addr;
        $i++;
    }
}

#use Data::Dumper;
#print Dumper \%interfaces;

if(scalar(@iplist)<=1)
{
    exit;
}

$NextIP="";
if($IP ne "")
{
    $IP=substr($IP,1);
    #取其下一个IP轮换
    for($i=0;$i<scalar(@iplist);$i++)
    {
        if($iplist[$i] eq $IP)
        {

            if($i==scalar(@iplist)-1)
            {
                $NextIP=$iplist[0];
            }
            else
            {
                $NextIP=$iplist[$i+1];
            }
            last;
        }
    }
}

if($NextIP eq "")
{
    exit;
}

$NextIP=":".$NextIP;

open(MAIL,">$FILE")||die("不能打开文件!");
print MAIL  $NextIP;
close(MAIL);
