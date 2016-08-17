#!/usr/bin/perl

$Username=@ARGV[0];
$list_name=@ARGV[1];
$list_cname=@ARGV[2];
$ModEmail=@ARGV[3];
$function=@ARGV[4];;

if($WebHost eq "")
{
	 $WebHost="127.0.0.1";
}

    use LWP::UserAgent;
    use HTTP::Request;
    use HTTP::Response;
    $Url="http://$WebHost/maillist/createlist.php?Username=$Username&list_name=$list_name&list_cname=$list_cname&ModEmail=$ModEmail&function=$function";
    $ua = new LWP::UserAgent;				# 產生 UserAgent 物件

    $ua->agent("Mozilla/8.0");   			#伪装成Netscape
    $request = new HTTP::Request('GET', $Url);		# 產生 Request 物件
    $response = $ua->request($request);			# 開始抓取網頁，並將結果傳會 $response
    if ($response->is_success) {			# 若抓取網頁成功，則印出 HTML 原始碼
	$Doc=$response->content;
	#print $Doc;
    }
    else {						# 若抓取網頁不成功，則印出錯誤訊息
        print $response->error_as_HTML;
        exit;

    }