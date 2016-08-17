#!/bin/bash

#yum -y install openssl openssl-devel

##### set up a RSA key pair
mkdir /etc/domainkeys
chown -R qmailq:qmail /etc/domainkeys
chmod -R 755 /etc/domainkeys     # ע���˴���Ϊ744 644 ��Ȩ�޲��㡣�޷�ִ�� wrap script

mkdir -p /etc/domainkeys/$1
cd /etc/domainkeys/$1/
#/usr/local/ssl/bin/openssl genrsa -out rsa.private 1024    #����gz���������·�� ע1024bit���²���ȫ��gmail����
#/usr/local/ssl/bin/openssl rsa -in rsa.private -out rsa.public -pubout -outform PEM
openssl genrsa -out rsa.private 1024    #����gz���������·�� ע1024bit���²���ȫ��gmail����
openssl rsa -in rsa.private -out rsa.public -pubout -outform PEM
echo "s1" > selector

#ע�����default��ln���ɣ���shell���� if -f $DKSIGN �Ҳ����ļ������default��mv rsa.private default
chown -R qmailq:qmail /etc/domainkeys
mv rsa.private default
chmod 0644 default

###### ���ɹ���key  Make your public DomainKey:
cd /etc/domainkeys/$1/
grep -v ^- rsa.public | perl -e 'while(<>){chop;$l.=$_;}print "k=rsa; p=$l;\n";'

