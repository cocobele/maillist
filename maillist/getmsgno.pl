#!/usr/bin/perl

use IO::File;


$selectlist=@ARGV[0];
$list_host=@ARGV[1];
$StartTime=@ARGV[2];
$ArchiveNo=@ARGV[3];

$SenderEmail="F".$selectlist."-return-".$ArchiveNo."-\@".$list_host."-\@[]";

$queue_dir="/var/qmail/queue";
$info_dir="$queue_dir/info";
#######################################################################

opendir(CURRDIR,$info_dir);
@dir=readdir(CURRDIR);
closedir(CURRDIR);

###改用比较 info文件 判断 其 msgid  2010 09 16

#for($i=0;$i<scalar(@dir);$i++)
foreach $temp_dir(@dir)
{
   #print $temp_dir."\r\n";
   #$temp_dir=@dir[$i];
   if($temp_dir ne '.' && $temp_dir ne '..')
   {

     if(-d $info_dir."/".$temp_dir)
     {

       opendir(CURRDIR,$info_dir."/".$temp_dir);
       @file=readdir(CURRDIR);
       closedir(CURRDIR);

       ##改为以文件创建时间判断
       foreach $temp_file(@file)
       {
         #print $temp_file."\r\n";
         if($temp_file ne '.' && $temp_file ne '..')
         {
   	       
    	       #print "$temp_file: ", scalar localtime(time -24*60*60 * -M $info_dir."/".$temp_dir."/".$temp_file), "\n";
    	       $filetime=time -24*60*60 * -M $info_dir."/".$temp_dir."/".$temp_file;
    	       # print $temp_dir."/"."$temp_file: ", $filetime, "--$StartTime--\n";

               ##如果该文件创建时间在$StartTime之后，则压入队列 (注：有时可能出现$filename比$StartTime大上1-2秒的情况，这是由于程序中设延迟造成的，已修改，但为保险，还是如此处理)
               if($filetime+2>=$StartTime)
               {
                  #push(@MaxMailID,$temp_file);
                  #$MaxMailDir{$temp_file}=$temp_dir;
                  
                  #open(FILE,$info_dir."/".$MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i]) || die ("读文件错误！！");
    		  open(FILE,"<".$info_dir."/".$temp_dir."/".$temp_file) || die ("读文件错误！！");
		  binmode(FILE);
    		  #$bytes=read(FILE,$Content,128,0);  #读取第一行信息
    		  $Content="";
    		  while(!eof(FILE))
    		  {
    		      my $chr=getc(FILE);
    		      #print ord($chr)."\n";
    		      if(ord($chr)>0)   ##去掉末尾00字符
    		      {
    		          $Content.=$chr;
    		      }
    		  }
    		  close(FILE);

        	  ###print "$temp_file: ", $filetime, "\n";
        	  ###print "$bytes==$Content\r\n";

		   
                   ###print $Content."\n".$SenderEmail."\n";
                   ###print length($Content)."\n".length($SenderEmail)."\n";

		   ##判断以及是否符合规则
                   if($Content eq $SenderEmail)
    		   {
    		   	print $temp_dir."/".$temp_file;
            		exit;
    		   }
                  
               }

         }  
       }
       
     }
   }
}