#!/usr/bin/perl

require "cgi-lib.pl";

#######################################У�鲢�޸�email��ַ������һ��email��ַ���ϸ������@gotaddresses��
sub  validate_email{  

my($email)=$_[0];

$email=~s/\s//g;  #�����ո�
$email=~s/^\.+//g;  #������ͷ��.
$email=~s/\.+$//g; #������β��.
$email=~s/^-+//g;  #������ͷ��-
$email=~s/^_+//g;  #������ͷ��_
$email=~s/\@{2,}/\@/g;  #����������������@����һ��@
$email=~s/\.{2,}/\./g;  #����������������.����һ��.
$email=~s/\@\.+/\@/g;  #��@.ת����@
$email=~s/[\\|&|\;|\`|\'|\/|\||\"|\*|\%|\#|\?|\~|\<|\>|\^|\(|\)|\[|\]|\{|\}|\$|\n|\r]//g; ##���������Ƿ��ַ�

#####�ж�email��ʽ
if($email =~ /(@.*@)|(\.@)|(^@)/ || $email !~ /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/)
{  return(0);  }

if(length($email) > 127)  #���email��ַ̫���򷵻ش���
{  return(0);  }

push(@gotaddresses,$email);
return(1);  
}

###############################�����ظ�Email������@gotaddresses
sub FilterDuplicateEmail
{

    @tempaddresses=sort(@gotaddresses);
    @gotaddresses=();

       ##push(@gotaddresses,@tempaddresses[0]);  ##��һ���϶�����
       for($i=1;$i<scalar(@tempaddresses);$i++)
       {
           print @tempaddresses[$i-1]."==".@tempaddresses[$i]."<br>";
           if(@tempaddresses[$i-1] ne @tempaddresses[$i])
           {
          	push(@gotaddresses,@tempaddresses[$i-1]);
           }
       }            			
    
}
####################################################

#########ͷ����Ϣ##############
 print "Content-type: text/html\n\n"; 
 print "<html><head><title>��̳</title>\n"; 
 print "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">\n";
 print "<LINK href=\"/css/style.css\" type=text/css rel=stylesheet>\n";
 print "</HEAD><BODY>"; 

#################################################
&ReadParse();

$Username=$in{"Username"};

if($Username eq ""){
 print "
 <script>
 alert('�Ƿ�������');
 history.back();
 </script>";
 exit;
}

$MailData_Dir="/home/httpd/bizsky/maillist/mail";
$MailData_HttpDir="/mail";
$uploadfile=$in{"uploadfile"};
@rawaddresses=split(/\n/,$uploadfile);
$OldEmailCount=scalar(@rawaddresses);
@gotaddresses =();   ##�������г��������Email��ַ

#####################��ԭʼ�ʼ���ַ����У����ˣ������µ�ַ�б���
foreach $rawemail(@rawaddresses){
&validate_email($rawemail);
}

&FilterDuplicateEmail();


$EmailCount=scalar(@gotaddresses);
print qq!
	<p style="line-height=16pt;">ԭʼEmail��ַ��$OldEmailCount����������ʽУ�顢ʧ���޸����ظ���ַ���˺�ʣ�µ�Email��ַ��$EmailCount����<br>���ɴ����أ� <a href=$MailData_HttpDir/$Username/mail.lst>�ӹ�����ʼ���ַ�嵥</a> (���ü��±���д�ְ����򿪲鿴)��<br>��Ҫ����Щ�ʼ���ַ�����ʼ��б����� <a href="loadlist_form1.php">�����ַ�嵥</a></p>
	<p>!;
	
############д���ļ����沢�����ʾ��ǰ��500��
$i=0;
$FILE="$MailData_Dir/$Username/mail.lst";
open(MAIL,">$FILE")||die("���ܴ��ļ�!");
foreach $Email(@gotaddresses)
{
    print MAIL "$Email\n";
    if($i<500)  ##�����ʾǰ���500����¼
    {
       print "$Email<br>";
       $i++;
    }  
    
}
close(MAIL);


if($i>500)
{
  print "...</p><font style=\"font-size:9pt\">����500���ϵ��ʼ���ַ��</font><br>";
}


print qq!</body></html>!;