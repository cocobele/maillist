#!/usr/bin/perl

require "ctnlib/smtp.perl";


$maillisthost = 'mail.bizsky.com.cn';

# list of characters that are OK in an email address
$OK_EMAIL_ADDRESS_CHARS='-a-zA-Z0-9_.@';      

print "Content-type: text/html\n\n";
print "<head>\n<title>订阅天创鸿业企业E化电子杂志</title>\n</head>\n";
print "<body BGCOLOR=ffffff>\n";

# process the user's input
read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});

# Split the name-value pairs

@pairs = split(/&/, $buffer);
foreach $pair (@pairs)
{
    ($name, $value) = split(/=/, $pair);

    # Un-Webify plus signs and %-encoding
    $value =~ tr/+/ /;
    $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

    # Uncomment for debugging purposes
    # print "Setting $name to $value<P>";

    $FORM{$name} = $value;
}


# Send subscribe message

$recipient = "$FORM{'listtarget'}-$FORM{'list_request'}\@$maillisthost";
$recipient =~ s/[^$OK_EMAIL_ADDRESS_CHARS]/_/go;

print "<!--- mailing to $recipient -->";

$email = $FORM{'user_email'};
$email =~ s/[^$OK_EMAIL_ADDRESS_CHARS]/_/go;

print "<!-- from $email -->";

#location of qmail-inject on your system
##$mailer = '/var/qmail/bin/qmail-inject';
# next line should be the domain name of your ezmlm server
##$maillisthost = 'mail.bizsky.com.cn';
###print "$mailer -f $email $recipient";
###open (MAIL, "|$mailer -f $email $recipient") || die "Can't open $mailer!\n";
###close (MAIL);

$MailHost="202.108.105.59";
$Sender=$email;
$Receiver="$recipient";
$Subject="";
$CC="";
$Message="";


$Reply=&SendEmail($MailHost,$Receiver,$Receiver,$CC,$Subject,$Message,$Sender,$Sender);

####################
if ($Reply==1) {
	print qq|<blockquote><br><center><br><br><br><font color=red>您的订阅信息已经成功发出，请在1~2分钟后查收我们发给您的确认信!</font><br><br>|;
}
else{
	print qq|<br><center><br><span class="font">订阅失败，请按返回键重试！</span><br><br>
		<center><a href="#" onClick="javacript:history.back()">[返回]</a></center>|;
}


# Following code sends a notification someone who might be interested
if ($FORM{'noticetarget'}) {
	$noticetarget = $FORM{'noticetarget'};
	$noticetarget =~ s/[^$OK_EMAIL_ADDRESS_CHARS]/_/go;
	print "<!-- trying $FORM{'noticetarget'} -->";
	open (MAIL2, "|$mailer $noticetarget") || die "Can't open $mailer!\n";
	print MAIL2 <<END;
From: $email ($FORM{'user_name'})
Subject: LIST: $FORM{'listtarget'} ACTION $FORM{'list_request'}

User's comments:
$FORM{'comments'}
END
    close (MAIL2);
}


# HTML confirmation notice
print "</body>\n</html>";
