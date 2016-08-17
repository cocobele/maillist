#!/usr/bin/perl


$list_host=@ARGV[0];
$selectlist=@ARGV[1];
#$list_rootdir="/var/qmail/alias";   #不用alias目录保存列表了
$list_rootdir="/home/vpopmail/domains/$list_host";

#######################################################################
$filedir="$list_rootdir/$selectlist/archive";

opendir(CURRDIR,$filedir);
@dir=readdir(CURRDIR);
closedir(CURRDIR);

$maxdir="";
foreach $temp_file(@dir)
{
    if($temp_file ne '.' && $temp_file ne '..')
    {
    	if($maxdir eq "")
    	{
    	    $maxdir=$temp_file;
    	}
    	elsif($maxdir < $temp_file)
    	{
    	    $maxdir=$temp_file;
    	}
    	#print $temp_file."\r\n";
    }
}

$filedir=$filedir."/".$maxdir;
opendir(CURRDIR,$filedir);
@file=readdir(CURRDIR);
closedir(CURRDIR);

$maxmsgno="";
foreach $temp_file(@file)
{

      #print $temp_file."\r\n";
      if($temp_file ne "index")
      {
    	if($maxmsgno eq "")
    	{
    		$maxmsgno=$temp_file;
    	}
    	elsif($maxmsgno < $temp_file)
    	{
    	    $maxmsgno=$temp_file;
    	}
    	    #print $temp_file."\r\n";
      }
}

#########输出信息##########################################
print $maxdir."/".$maxmsgno;