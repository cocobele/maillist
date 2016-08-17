#!/usr/bin/perl

$Param=@ARGV[0];

#######################################################################

        $FILE="/var/qmail/control/".$Param;
        #print $FILE."<br>";
	open(MAIL,"<$FILE") || exit;
	while($line=<MAIL>)
	{  
	    print $line;
	}
  	close(MAIL);