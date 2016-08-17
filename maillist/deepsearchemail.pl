#!/usr/bin/perl

require "common.pl";
require "func_baidu.pl";

  #
  # provide subclassed Robot to override on_connect, on_failure and
  # on_return methods
  #
  package myUA;

  use Exporter();
  use LWP::Parallel::UserAgent qw(:CALLBACK);
  @ISA = qw(LWP::Parallel::UserAgent Exporter);
  @EXPORT = @LWP::Parallel::UserAgent::EXPORT_OK;

  # redefine methods: on_connect gets called whenever we're about to
  # make a a connection
  sub on_connect {
    my ($self, $request, $response, $entry) = @_;
    #print "成功连接上 ",$request->url,"<br>";
  }

  # on_failure gets called whenever a connection fails right away
  # (either we timed out, or failed to connect to this address before,
  # or it's a duplicate). Please note that non-connection based
  # errors, for example requests for non-existant pages, will NOT call
  # on_failure since the response from the server will be a well
  # formed HTTP response!
  sub on_failure {
    my ($self, $request, $response, $entry) = @_;
    #print "连接网页 ",$request->url,"失败<br>\t",
          $response->code, ", ", $response->message,"<br>"
	    if $response;
  }

  # on_return gets called whenever a connection (or its callback)
  # returns EOF (or any other terminating status code available for
  # callback functions). Please note that on_return gets called for
  # any successfully terminated HTTP connection! This does not imply
  # that the response sent from the server is a success! 

sub on_return {
    my ($self, $request, $response, $entry) = @_;
    #$Url=&ExtractUrlFromGoogleSnapshot($request->url);
    $Url=&ExtractUrlFromBaiduSnapshot($request->url);
    if ($response->is_success) {
       #print "<br>耶! 获取网页",&ExtractUrlFromGoogleSnapshot($request->url)," 返回代码：", $response->code,": ", $response->message, "<br>";
       print "耶! 网页<font color=blue>",$Url,"</font>抓取成功！";
       #print $response->content;
       &ExtractEmail($response->content);
    } else {
       print "呜! 网页<font color=blue>",$Url,"</font>抓取失败！<br>";
       # print $response->error_as_HTML;
    }
    
    
    return;
  }


###############################从google网页快照地址中提取出原始网页地址
sub ExtractUrlFromGoogleSnapshot{
	
	my ($Snapshot)= @_;
	$Snapshot=~/http:\/\/(.+):(.+):([\w|:|\.|\/|\-|\~|\?|\&|=]+)+(.+)/;
	return $3;

}

###############################从baidu网页快照地址中提取出原始网页地址
sub ExtractUrlFromBaiduSnapshot{
	
	my ($Snapshot)= @_;
	$Snapshot=~/http:\/\/(.+)&url=(.+)&b=(.+)/;
	my $Url=$2;
	$Url =~s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
	return $Url;

}

###############################从一个字符串中解析出所有的Email，结果存入@gotaddresses中
sub ExtractEmail{

    local($Content)=@_;

# YOUR RESULTS EMAIL ADDRESSES result_txt.txt

        $indexposition = 0;
        $getoutvar = "NO";
        $emailnum=0;  ##记录提取的email数
        while ($getoutvar eq "NO")
        {
                if (index($Content,"\@",$indexposition) > 0)
                {
                        $indexposition = index($Content,"\@",$indexposition);

                        $findinvalidchar1 = $indexposition;
                        $findinvalidchar1--;
                        while ((substr($Content,$findinvalidchar1,1) =~ tr/[a-zA-Z0-9]\-\_\./[a-zA-Z0-9]\-\_\./) == 1 && $findinvalidchar1 > 0)
                        {
                                $findinvalidchar1--;
                        }
                        $findinvalidchar2 = $indexposition;
                        $findinvalidchar2++;
                        while ((substr($Content,$findinvalidchar2,1) =~ tr/[a-zA-Z0-9]\-\_\./[a-zA-Z0-9]\-\_\./) == 1 && $findinvalidchar2 < length($Content))
                        {
                                $findinvalidchar2++;
                        }
			
                        $theaddress = substr($Content,$findinvalidchar1 + 1,($findinvalidchar2 - $findinvalidchar1) - 1);
                        
                        $emailnum++;
                        &validate_email($theaddress);  ##校验修补该Email

                        $indexposition = $indexposition + 2;
                }
                else
                {
                        $getoutvar = "YES";
                }
        }

	print "提取Email地址<font color=red>$emailnum</font>个<br>";

}

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

push(@main::gotaddresses,$email);   ##由于@gotaddresses定义在package main中，所以要用@main::gotaddresses才能引用
#print "$email<br>";
return(1);  
}


###############################过滤重复Email，对象@gotaddresses
sub FilterDuplicateEmail{

@tempaddresses=sort(@main::gotaddresses);
@main::gotaddresses=();

       for($i=1;$i<scalar(@tempaddresses)-1;$i++)
       {
          if(@tempaddresses[$i-1] ne @tempaddresses[$i]){
          	push(@main::gotaddresses,@tempaddresses[$i-1]);
          }
       }            			
    
}

##################################开始正文
package main;
use HTTP::Request; 


&Head();
&ReadCGI();
$Username=$form{Username};

print "<p>";


#读出文件中的Email地址
$MailData_Dir="/home/httpd/bizsky/maillist/mail";
$filename="$MailData_Dir/$Username/url.txt",
open(FILE,"$filename") || die("错误：不能打开文件");

while($line=<FILE>)
{  
   push(@urls,$line);
}

close(FILE);


$CurrentUrlNo=0;  ##保存当前操作的Url编号
$TotalUrls=scalar(@urls);
@gotaddresses=();  ##保存所有Email

     my $pua = myUA->new();
     $pua->agent("Mozilla/8.0");   			#伪装成Netscape 
     #$pua->timeout   (2);  # in seconds
     #$pua->delay    ( 5);  # in seconds
     #$pua->max_req  ( 2);  # max parallel requests per server
     #$pua->max_hosts(10);  # max parallel servers accessed

     #local($\) = ""; # ensure standard $OUTPUT_RECORD_SEPARATOR

     for($CurrentUrlNo=0;$CurrentUrlNo<$TotalUrls;$CurrentUrlNo++){
        my $req = HTTP::Request->new('GET', @urls[$CurrentUrlNo]);
     	##print "登记网页 $CurrentUrlNo '".$req->url."<br>";
     	$pua->register ($req);
     
    }
    
    
    my $entries = $pua->wait(); # responses will be caught by on_return, etc

    
    print "<hr height=1 color=000099><p>共从<font color=red>$TotalUrls</font>个有效相关网页中提取原始Email<font color=red>".scalar(@gotaddresses)."</font>个<br>";
    
    &myUA::FilterDuplicateEmail();
    
    print "在经过Email格式校验、修补和重复地址过滤工作后，剩下的有效Email数为<font color=red>".scalar(@gotaddresses)."</font>个,请由此下载：<a href=$MailData_HttpDir/$Username/mail.txt>邮件地址清单</a></p>";
    
    
    ############写入文件保存
    $FILE="$MailData_Dir/$Username/mail.txt";
    open(MAIL,">$FILE")||die("不能打开文件!");
    foreach $Email(@gotaddresses){
      print MAIL "$Email\n";
    }
    close(MAIL);


    $Emails=join("\n",@gotaddresses);

	print qq!<p>
	<table width=80% border=0>
	<tr></td>
	<form>
	深度搜索到的有效Email地址列表：
	<textarea cols=70 rows=10 style="font-size:9pt">$Emails</textarea><br><br>
	</form>
	</td></tr>
	</table>
	</p>!;

    
