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

###���ñȽ� info�ļ� �ж� �� msgid  2010 09 16

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

       ##��Ϊ���ļ�����ʱ���ж�
       foreach $temp_file(@file)
       {
         #print $temp_file."\r\n";
         if($temp_file ne '.' && $temp_file ne '..')
         {
   	       
    	       #print "$temp_file: ", scalar localtime(time -24*60*60 * -M $info_dir."/".$temp_dir."/".$temp_file), "\n";
    	       $filetime=time -24*60*60 * -M $info_dir."/".$temp_dir."/".$temp_file;
    	       # print $temp_dir."/"."$temp_file: ", $filetime, "--$StartTime--\n";

               ##������ļ�����ʱ����$StartTime֮����ѹ����� (ע����ʱ���ܳ���$filename��$StartTime����1-2���������������ڳ��������ӳ���ɵģ����޸ģ���Ϊ���գ�������˴���)
               if($filetime+2>=$StartTime)
               {
                  #push(@MaxMailID,$temp_file);
                  #$MaxMailDir{$temp_file}=$temp_dir;
                  
                  #open(FILE,$info_dir."/".$MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i]) || die ("���ļ����󣡣�");
    		  open(FILE,"<".$info_dir."/".$temp_dir."/".$temp_file) || die ("���ļ����󣡣�");
		  binmode(FILE);
    		  #$bytes=read(FILE,$Content,128,0);  #��ȡ��һ����Ϣ
    		  $Content="";
    		  while(!eof(FILE))
    		  {
    		      my $chr=getc(FILE);
    		      #print ord($chr)."\n";
    		      if(ord($chr)>0)   ##ȥ��ĩβ00�ַ�
    		      {
    		          $Content.=$chr;
    		      }
    		  }
    		  close(FILE);

        	  ###print "$temp_file: ", $filetime, "\n";
        	  ###print "$bytes==$Content\r\n";

		   
                   ###print $Content."\n".$SenderEmail."\n";
                   ###print length($Content)."\n".length($SenderEmail)."\n";

		   ##�ж��Լ��Ƿ���Ϲ���
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