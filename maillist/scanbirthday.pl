#!/usr/bin/perl

sub UrlEncode{
	local %escapes;
	local $text=shift;

	for (0..255) {
		$escapes{chr($_)} = sprintf("%%%02X", $_);
	}

	$text =~ s/([\x00-\x20"#%;<>?{}|\\\\^~`\[\]\x7F-\xFF])/$escapes{$1}/g; #";

	return $text;
}

$Username=@ARGV[0];
$Listname=@ARGV[1];
$SendUrl=@ARGV[2];
#$SendUrl=UrlEncode($SendUrl);

if($WebHost eq "")
{
	 $WebHost="127.0.0.1";
}

    use LWP::UserAgent;
    use HTTP::Request;
    use HTTP::Response;
    $Url="http://$WebHost/birthday_scan.php?Username=$Username&Listname=$Listname&Url=$SendUrl";

    $ua = new LWP::UserAgent;				# �a�� UserAgent ���

    $ua->agent("Mozilla/8.0");   			#αװ��Netscape
    $request = new HTTP::Request('GET', $Url);		# �a�� Request ���
    $response = $ua->request($request);			# �_ʼץȡ�W퓣��K���Y������ $response
    if ($response->is_success) {			# ��ץȡ�W퓳ɹ����tӡ�� HTML ԭʼ�a
	$Doc=$response->content;
	#print $Doc;
    }
    else {						# ��ץȡ�W퓲��ɹ����tӡ���e�`ӍϢ
        print $response->error_as_HTML;
        exit;

    }