/*
����ע��
*/
#����ע��

#SHOW DATABASES;
#USE phpmyadmin;
#SHOW TABLES;
#USE myinfo;

/**������ => DATABASE => TABLE => ROW => COLUMN**/

#ָ��������SQL������õı��뷽ʽ
SET NAMES UTF8;		#û��-
#����ɾ��һ��ָ�������ݿ�(������ڵĻ�)
DROP DATABASE IF EXISTS jd;
#����ָ�������ݿ⣬���������������õı��뷽ʽ
CREATE DATABASE jd CHARSET=UTF8;
#����ոմ����Ŀ�
USE jd;

#���������Ʒ�ı�jd_user
CREATE TABLE jd_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,	#�����У����ܳ����ظ�ֵ��������
  userName VARCHAR(64),	#�䳤�ַ���
  age FLOAT(8,2)	#�Ƿ��ؼ�,���һ�����ܼ� ����,
);