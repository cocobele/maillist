#!/usr/bin/perl

use strict;
#use warnings;    ##不显示警告信息
use Net::IP;
use Net::DNS;
my $ip = new Net::IP($ARGV[0],4);
#print $ip->reverse_ip()."\n";
#print "Resolving ...\n";
my $res = Net::DNS::Resolver->new;
my $answer = $res->query($ip->reverse_ip(),'PTR');
my $namer = $answer->{'answer'}[0];
print "PTR Name: $namer->{'ptrdname'}";