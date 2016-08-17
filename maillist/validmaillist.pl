#!/usr/bin/perl

require "cgi-lib.pl";

#######################################校验并修复email地址，输入一个email地址，合格输出到@gotaddresses中
sub  validate_email{  

my($email)=$_[0];

$email=~s/\s//g;  #消除空格
$email=~s/^\.+//g;  #消除开头的.
$email=~s/\.+$//g; #消除结尾的.
$email=~s/^-+//g;  #消除开头的-
$email=~s/^_+//g;  #消除开头的_
$email=~s/\@{2,}/\@/g;  #把两个以上连续的@换成一个@
$email=~s/\.{2,}/\./g;  #把两个以上连续的.换成一个.
$email=~s/\@\.+/\@/g;  #把@.转换成@
$email=~s/[\\|&|\;|\`|\'|\/|\||\"|\*|\%|\#|\?|\~|\<|\>|\^|\(|\)|\[|\]|\{|\}|\$|\n|\r]//g; ##消除其他非法字符

#####判断email格式
if($email =~ /(@.*@)|(\.@)|(^@)/ || $email !~ /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/)
{  return(0);  }

if(length($email) > 127)  #如果email地址太长则返回错误
{  return(0);  }

push(@gotaddresses,$email);
return(1);  
}

###############################过滤重复Email，对象@gotaddresses
sub FilterDuplicateEmail
{

    @tempaddresses=sort(@gotaddresses);
    @gotaddresses=();

       ##push(@gotaddresses,@tempaddresses[0]);  ##第一个肯定加入
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

#########头部信息##############
 print "Content-type: text/html\n\n"; 
 print "<html><head><title>论坛</title>\n"; 
 print "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">\n";
 print "<LINK href=\"/css/style.css\" type=text/css rel=stylesheet>\n";
 print "</HEAD><BODY>"; 

#################################################
&ReadParse();

$Username=$in{"Username"};

if($Username eq ""){
 print "
 <script>
 alert('非法操作！');
 history.back();
 </script>";
 exit;
}

$MailData_Dir="/home/httpd/bizsky/maillist/mail";
$MailData_HttpDir="/mail";
$uploadfile=$in{"uploadfile"};
@rawaddresses=split(/\n/,$uploadfile);
$OldEmailCount=scalar(@rawaddresses);
@gotaddresses =();   ##保存所有抽提出来的Email地址

#####################对原始邮件地址进行校验过滤，存入新地址列表中
foreach $rawemail(@rawaddresses){
&validate_email($rawemail);
}

&FilterDuplicateEmail();


$EmailCount=scalar(@gotaddresses);
print qq!
	<p style="line-height=16pt;">原始Email地址共$OldEmailCount个，经过格式校验、失误修复和重复地址过滤后，剩下的Email地址共$EmailCount个。<br>请由此下载： <a href=$MailData_HttpDir/$Username/mail.lst>加工后的邮件地址清单</a> (可用记事本或写字板程序打开查看)。<br>如要将这些邮件地址导入邮件列表，请点击 <a href="loadlist_form1.php">导入地址清单</a></p>
	<p>!;
	
############写入文件保存并最多显示最前面500个
$i=0;
$FILE="$MailData_Dir/$Username/mail.lst";
open(MAIL,">$FILE")||die("不能打开文件!");
foreach $Email(@gotaddresses)
{
    print MAIL "$Email\n";
    if($i<500)  ##最多显示前面的500条记录
    {
       print "$Email<br>";
       $i++;
    }  
    
}
close(MAIL);


if($i>500)
{
  print "...</p><font style=\"font-size:9pt\">超过500以上的邮件地址略</font><br>";
}


print qq!</body></html>!;