#!/usr/bin/perl


$selectlist=@ARGV[0];
$list_host=@ARGV[1];
$StartTime=@ARGV[2];
$Subject=@ARGV[3];

$List=$selectlist."\@".$list_host;
$Subject="Subject: ".$Subject;

$queue_dir="/var/qmail/queue";
$mess_dir="$queue_dir/mess";
#######################################################################

opendir(CURRDIR,$mess_dir);
@dir=readdir(CURRDIR);
closedir(CURRDIR);

#for($i=0;$i<scalar(@dir);$i++)
foreach $temp_dir(@dir)
{
   #print $temp_dir."\r\n";
   #$temp_dir=@dir[$i];
   if($temp_dir ne '.' && $temp_dir ne '..')
   {

     if(-d $mess_dir."/".$temp_dir)
     {

       opendir(CURRDIR,$mess_dir."/".$temp_dir);
       @file=readdir(CURRDIR);
       closedir(CURRDIR);

       ##��Ϊ���ļ�����ʱ���ж�
       foreach $temp_file(@file)
       {
          #print $temp_file."\r\n";
         if($temp_file ne '.' && $temp_file ne '..')
         {
   	       
    	       #print "$temp_file: ", scalar localtime(time -24*60*60 * -M $mess_dir."/".$temp_dir."/".$temp_file), "\n";
    	       $filetime=time -24*60*60 * -M $mess_dir."/".$temp_dir."/".$temp_file;
    	       #print "$temp_file: ", $filetime, "\n";

               ##������ʼ����崴��ʱ����$StartTime֮����ѹ�����
               if($filetime>=$StartTime)
               {
                  #push(@MaxMailID,$temp_file);
                  #$MaxMailDir{$temp_file}=$temp_dir;
                  
                  #open(FILE,$mess_dir."/".$MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i]) || die ("���ļ����󣡣�");
		  #binmode(FILE);
    		  open(FILE,$mess_dir."/".$temp_dir."/".$temp_file) || die ("���ļ����󣡣�");
    		  $bytes=read(FILE,$Content,1536,0);  #����ȡ�ʼ�ͷ����Ϣ
    		  close(FILE);

        	  #print "$Content\r\n";

		   ##�ж��Լ��Ƿ���Ϲ���
                   if(index($Content,$List)!=-1)
    		   {
        		#print "$List==$Subject\r\n";
        		$pos=index($Content,$Subject);
        		print "$pos\r\n";
        		if($pos!=-1)
        		{
            			#print $MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i];
            			print $temp_dir."/".$temp_file;
            			exit;
			}
    		    }
                  
               }

         }  
       }
       
     }
   }
}


#foreach $mail(@MaxMailID)
#for($i=0;$i<scalar(@MaxMailID);$i++)
#{
    #print $mess_dir."/".$MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i]."\r\n";
#    open(FILE,$mess_dir."/".$MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i]) || die ("���ļ����󣡣�");
    #binmode(FILE);
#    $bytes=read(FILE,$Content,1536,0);  #����ȡ�ʼ�ͷ����Ϣ
#    close(FILE);
    
    #if(@MaxMailID[$i] eq '532408')
    #{ print $Content;};
    
#    if(index($Content,$List)!=-1)
#    {
        #print "$List==$Subject\r\n";
 #       $pos=index($Content,$Subject);
        #print "$pos\r\n";
#        if($pos!=-1)
#        {
#            print $MaxMailDir{@MaxMailID[$i]}."/".@MaxMailID[$i];
#            last;
#        }
#    }
#}