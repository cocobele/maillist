#!/usr/bin/perl

#######################################################################
# $FILE="/sbin/ifconfig |";    #提示 Insecure dependency in open while running setuid at getip.pl line 7. 因此先要untaint
# $FILE =~ /(.*)/;	
# $FILE = $1;
# open (IN, $FILE);

# $i=0;
# while (<IN>)
# {
#     if ( /^\s*inet addr:([\d\.]*)\s*Bcast:([\d\.]*)\s*Mask:([\d\.]*)/ )
#     {
#        $host_ip = $1;
#	if($i>0)
#	{
#	    print "\n";
#	}
#	print $host_ip;
#        last ;
#     }
# }
# close(IN);
#######################上面代码在非root调用下报Insecure dependency in open while running setuid at getip.pl line 7.改用下面代码

use strict;
use warnings;
require 'sys/ioctl.ph';
use Socket;

my %interfaces;
my $max_addrs = 30;
my $i=0;

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

for my $addr (sort values %interfaces)
{
    $addr = inet_ntoa((sockaddr_in($addr))[1]);
    
    if($addr ne "127.0.0.1" && $addr ne "192.168.122.1" && $addr ne "172.16.36.1")            ##跳过本地127地址和OpenVZ虚拟机地址
    {
    	if($i>0){
          print "\n";
        }
        print $addr;
        $i++;
    }
}

#foreach  my $key(sort keys %interfaces)
#{
#    $addr = $interfaces{$key};
#}

#use Data::Dumper;
#print Dumper \%interfaces;
