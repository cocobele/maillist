#!/bin/bash

#yum -y install openssl openssl-devel

##### set up a RSA key pair
mkdir /etc/domainkeys
chown -R qmailq:qmail /etc/domainkeys
chmod -R 755 /etc/domainkeys     # 注：此处如为744 644 则权限不足。无法执行 wrap script

mkdir -p /etc/domainkeys/$1
cd /etc/domainkeys/$1/
#/usr/local/ssl/bin/openssl genrsa -out rsa.private 1024    #如用gz包则是这个路径 注1024bit以下不安全，gmail报警
#/usr/local/ssl/bin/openssl rsa -in rsa.private -out rsa.public -pubout -outform PEM
openssl genrsa -out rsa.private 1024    #如用gz包则是这个路径 注1024bit以下不安全，gmail报警
openssl rsa -in rsa.private -out rsa.public -pubout -outform PEM
echo "s1" > selector

#注：如果default用ln生成，则shell汇总 if -f $DKSIGN 找不到文件，因此default用mv rsa.private default
chown -R qmailq:qmail /etc/domainkeys
mv rsa.private default
chmod 0644 default

###### 生成公开key  Make your public DomainKey:
cd /etc/domainkeys/$1/
grep -v ^- rsa.public | perl -e 'while(<>){chop;$l.=$_;}print "k=rsa; p=$l;\n";'

