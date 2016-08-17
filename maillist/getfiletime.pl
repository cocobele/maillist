#!/usr/bin/perl

$file=@ARGV[0];
$filetime=time -24*60*60 * -M $file;
my $mtime=(stat("$fileName" ))[9];
($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime($filetime); 
$year+=1900;
$mon+=1;
print $year."-".$mon."-".$mday." ".$hour.":".$min.":".$sec;
exit;