#!/usr/bin/perl

#########################################解析google记录，提取Email
sub ParseGoogleRecord{

    local($Content)=@_;	
    
    ##提取主页地址
    $Content=~/<a href=([\w|:|\.|\/|\-|\~|\?|\&|=]+)>(.+)<\/a><br><font size=-1>/;
    $Homepage=$1;   ##$x值不可改变，故转赋;
    $Title=$2;   ##$x值不可改变，故转赋;
    $Title=~s/<[^>]*>//g;  ##对网页标题去除html标签 
    push(@goturls,$Title."  ".$Homepage);
    #print "$Homepage<br>";
    ##提取快照网页地址
    $Content=~/<a class=fl href=http:\/\/216.239.33.100\/(.+)>Cached<\/a>/;   ##除掉访问分类目录的可能
    $snapshot=$1;
    if($snapshot eq ""){ ##可能为doc、ppt或pdf等文档，没有网页快照，只有HTML档，取HTML档Url
    	$Content=~/<a href=http:\/\/216.239.33.100\/(.+)>View as HTML<\/a>/;
    	$snapshot="http://216.239.33.100/".$1;
    }
    else{
    	$snapshot="http://216.239.33.100/".$1;
    }
    
    push(@gotsnapshots,$snapshot);

    #print "<p>$HomePage";
    #print "<p>$SnapShotUrl";
    ##去除html标签
    ##$Content=~s/<[^>]*>//g;
    &ExtractEmail($Content);
    	

}

#########################################获取google搜索结果，并解析出每个记录//---------------------------------------------------------------------------
sub ParseGoogleFile{
	
    $CallIndex++;    ###如果有最大结果限制，则只取到最大结果数
    
    
    #use LWP::Simple;
    use LWP::UserAgent;
    use HTTP::Request;
    use HTTP::Response;
    
    local($Url)=@_;
	
 
    $Results=0;  ##//本次搜索的结果数
    
    ###首先取得google搜索结果页面  必须送出agent信息才被接受
    #print $Url;
    #$Doc = get $Url;
    $ua = new LWP::UserAgent;				# 產生 UserAgent 物件
    #$ua->timeout   (20);  # in seconds
    #$ua->delay    ( 5);  # in second
    #$us->agent("$0/0.1".$ua->agent);
    $ua->agent("Mozilla/8.0");   			#伪装成Netscape 
    $request = new HTTP::Request('GET', $Url);		# 產生 Request 物件
    $response = $ua->request($request);			# 開始抓取網頁，並將結果傳會 $response
    if ($response->is_success) {			# 若抓取網頁成功，則印出 HTML 原始碼
	$Doc=$response->content;
    }
    else {						# 若抓取網頁不成功，則印出錯誤訊息
	
	print("<p><br><br><font style='font-size:14.8px'>不能访问搜索引擎结果页面结果！</font></p>");
        print "<p>错误结果信息为：".$response->error_as_HTML;
        print "<p><br><br>如果出现错误信息，可能为暂时的网络繁忙引起，请刷新此页面多试一两次。";
        exit;
	
    }
    
    ##print($Doc);
    
    ##将$Doc按照<p>分割，并去掉头尾两条记录 第一个记录为头部，即第一个<p>之前的所有字符
    @Records=split(/$RecordFlag/,$Doc);
    $Head=shift(@Records);
    $Tail=pop(@Records);   ##最后一个不是结果记录，去掉
    
    ###判断是否是最后一个有效结果页面，通常标志在倒数第二个记录里，去掉尾巴后为倒数第一个
    $ValidResultsNumber=@Records[scalar(@Records)-1];
    if(index($ValidResultsNumber,$PreValidResultsNumberFlag)!=-1)
    {
    	$ValidResultsNumber=~/$PreValidResultsNumberFlag(.+)$PostValidResultsNumberFlag/;
        $ValidResults=$1;
        $LastValidPage=1;  ##表示该页面为最后一个有效的相关结果页面，后面的结果都是重复此页面
        pop(@Records);	   ##去除该记录
        $TotalValidResults=$ValidResults;
    }
    
    ##解析出搜索结果文件头，取得查询结果数目并删除头部
    ##格式："共约有<b>2,800</b>项查询结果"
    ##另一种格式 of about <b>2,800</b>.   Search took
    if($CallIndex==1)    ##如果是第一个搜索结果文件，计算查询结果
    {
    	   
        $Head=~/$PreResultsNumberFlag(.+)$PostResultsNumberFlag/;
        $Results=$1;
        ##删除结果数目中的,符号
        $Results=~s/,//g;

        if($Results=="")
        {
            print("<p><br><br><font style='font-size:14.8px'>没有提取到搜索结果数！</font></p>");
            exit;
        }

	$TotalResults=$Results;
	
        if($Results>=$MaxResults)
        {
            
             $Warning="查询到的结果数为$Results，超过最大能显示的数目$MaxResults，\\r\\n\\r\\n请您最好输入更精确的查询关键字减少查询结果。";
             print("<script>alert('$Warning');</script>\n");
        }
    }

    ##parse emails from the record
    foreach $Record(@Records){
    	
    	$RecordNo++;
	&ParseGoogleRecord($Record);
    }
    
    ##如果是第一个搜索结果文件,自动搜索其它结果文件
    if($CallIndex==1)
    {
        ###如果有最大结果限制，则只取到最大结果数
        if($Results>$MaxResults){
          $Results=$MaxResults; 
        }
        
        ###取得有效的查询结果页面数  google超过1000无效
        if($Results%$RecordsPerPage==0){
           $ResultPages=$Results/$RecordsPerPage-1;
        }
        else{
           $ResultPages=$Results/$RecordsPerPage;
        }
         
   
        for($i=1;$i<=$ResultPages;$i++)
        {
            $TempUrl=$Url;
            $CurrentResutlsNumFlag=$FirstResultsPageFlag;   ##goole中为start=0;
            chop($CurrentResutlsNumFlag);         
            $Num=$i*$RecordsPerPage;
            $CurrentResutlsNumFlag.=$Num;
            $TempUrl=~s/$FirstResultsPageFlag/$CurrentResutlsNumFlag/;
            ##print $TempUrl;
            &ParseGoogleFile($TempUrl);
            
            if($LastValidPage==1){   ###如果为真，则表示到头，结束循环，不再解析后面的结果页面
            	last;}
        }
    }

}


#########################################从google中提取Email的主例程
sub Main_GoogleParse{

local($Key)=@_;

#######google搜索引擎的一些参数设置

####高级搜索，简体中文，每页结果数100
$Url="http://www.google.com/search?as_q=&num=100&btnG=Google%CB%D1%CB%F7&as_epq=&as_oq=&as_eq=&lr=lang_zh-CN&as_occt=any&as_dt=i&as_sitesearch=&q=&start=0";  ##不加filter=0，显示过滤过的页面结果
#$Url="http://216.239.33.100/search?as_q=&num=100&btnG=Google%CB%D1%CB%F7&as_epq=&as_oq=&as_eq=&lr=lang_zh-CN&as_occt=any&as_dt=i&as_sitesearch=&q=&start=0";  ##不加filter=0，显示过滤过的页面结果
$HeadFlag="<p>";
$PreResultsNumberFlag="of about <b>";
$PostResultsNumberFlag="</b>.   Search took";
$MaxResults=1000;
$RecordsPerPage=100;
$FirstResultsPageFlag="start=0";
$RecordFlag="<p>";
$PreValidResultsNumberFlag="we have omitted some entries very similar to the ";
$PostValidResultsNumberFlag=" already displayed";

##处理查询字符串
if($Key=~/ or /)    ##有或的情况  北京 Email 地址 造纸 or 纺织 or 印染
{
  @KeywordTails=split(" or ", $Key);
  @KeywordHeads=split(" ", shift(@KeywordTails));
  unshift(@KeywordTails,pop(@KeywordHeads));
  
  $Key1=join(" ",@KeywordHeads);
  $Key2=join(" ",@KeywordTails);
  $Key1=UrlEncode($Key1);
  $Key2=UrlEncode($Key2);
  $Url=~s/as_q=/as_q=$Key1/;
  $Url=~s/as_oq=/as_oq=$Key2/;
}
else
{
  $Key=UrlEncode($Key);
  $Url=~s/as_q=/as_q=$Key/;
}

#print $Url;
#exit;

$TotalResults=0;  #保存本次搜索结果总数
$TotalValidResults=0;  #保存本次有效搜索结果总数
$CallIndex=0;    #表示第几次调用下面的函数，在第一次时计算搜索结果数
$LastValidPage=0;  #表示最后一个有效的相关结果页面，后面的结果都是重复此页面
@gotaddresses =();   #保存所有抽提出来的Email地址
@goturls =();   #保存所有抽提出来的网页标题和原始网页地址
@gotsnapshots =();   #保存所有抽提出来的google网页快照

&ParseGoogleFile($Url);

$EmailCount=scalar(@gotaddresses);
print qq!
	<p>本次搜索共搜索到符合条件的网页<font color=red>$TotalResults</font>个，其中有效相关结果网页<font color=red>$TotalValidResults</font>个，从这些有效网页中搜索到的有效Email地址共<font color=red>$EmailCount</font>个，这些Email在提取的同时都已进行了Email地址
	格式校验和重复地址过滤工作，请由此下载：<a href=$MailData_HttpDir/$Username.txt>邮件地址清单</a></p>
	!;
	
############写入文件保存
$FILE="$MailData_Dir/$Username/mail.txt";
open(MAIL,">$FILE")||die("不能打开文件!");
foreach $Email(@gotaddresses){
    print MAIL "$Email\n";
    }
close(MAIL);

$FILE="$MailData_Dir/$Username/url.txt";
open(MAIL,">$FILE")||die("不能打开文件!");
foreach $snapshot(@gotsnapshots){
    print MAIL "$snapshot\n";
    }
close(MAIL);

$Emails=join("\n",@gotaddresses);
$Urls=join("\n",@goturls);

print qq!<p>
	<table width=80% border=0>
	<tr></td>
	<form method=post name=form1 action="deepsearchemail.pl">
	搜索到的有效Email地址列表：
	<textarea cols=70 rows=10 style="font-size:9pt">$Emails</textarea><br><br>
	有效搜索结果网址列表：
	<textarea cols=70 rows=10 style="font-size:9pt">$Urls</textarea><br><br>!;
	      
if($DeepSearch eq "n"){   ##说明是试用用户，不进行深度搜索

      print qq!<input type=button value="深度搜索邮件地址" onclick="alert('您的帐号为试用帐号，只有正式帐号才有深度搜索功能！\\r\\n\\r\\n关于如何购买正式帐号请看帮助中的注册购买一栏。');">　　　　<input type=button value=" 立即返回 " onclick="history.back()">!;
}
else
{	      
	print qq!	      <input type=hidden name=Username value='$Username'>
				<input type=submit value="深度搜索邮件地址">　　　　
				<input type=button value=" 立即返回 " onclick="history.back()">
				!;
}
print qq!
	</form>
	</td></tr>
	</table>
	</p>!;
   

}


1;