/*
多行注释
*/
#单行注释

#SHOW DATABASES;
#USE phpmyadmin;
#SHOW TABLES;
#USE myinfo;

/**服务器 => DATABASE => TABLE => ROW => COLUMN**/

#指定后续的SQL语句所用的编码方式
SET NAMES UTF8;		#没有-
#试着删除一个指定的数据库(如果存在的话)
DROP DATABASE IF EXISTS jd;
#创建指定的数据库，声明保存数据所用的编码方式
CREATE DATABASE jd CHARSET=UTF8;
#进入刚刚创建的库
USE jd;

#创建保存产品的表：jd_user
CREATE TABLE jd_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,	#主键列，不能出现重复值，自增列
  userName VARCHAR(64),	#变长字符串
  age FLOAT(8,2)	#是否特价,最后一个不能加 逗号,
);