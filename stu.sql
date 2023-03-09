/*
Navicat MySQL Data Transfer

Source Server         : Vue
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : stu

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2023-03-01 19:39:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `classname` varchar(20) NOT NULL,
  `classroom` varchar(20) DEFAULT NULL,
  `tid` varchar(20) DEFAULT NULL,
  `teacher` varchar(20) DEFAULT NULL,
  `tphone` varchar(20) DEFAULT NULL,
  `startdate` varchar(50) NOT NULL,
  `classstate` varchar(20) NOT NULL,
  `number` int(10) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('1', 'H5211030', '峨眉山', 'T00003', '王老师', '98765432198', '2021-10-30', '已结课', '2', '1');
INSERT INTO `class` VALUES ('2', 'UI220125', '长白山', 'T00001', '刘老师', '78978978978', '2021-12-10', '已封班', '2', '1');
INSERT INTO `class` VALUES ('3', 'AI211210', '武夷山', 'T00002', '赵老师', '12345678912', '2021-12-25', '已封班', '2', '1');
INSERT INTO `class` VALUES ('4', 'VR220518', '五台山', 'T00004', '吴老师', '45645645645', '2022-03-25', '已开班', '2', '1');
INSERT INTO `class` VALUES ('5', 'CAD220325', '普陀山', 'T00005', '孙老师', '16698766689', '2022-05-20', '未开班', '2', '1');
INSERT INTO `class` VALUES ('11', 'JAVA220612', '太行山', 'T00006', '周老师', '17898765432', '2022-06-12', '未开班', '3', '1');

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdate` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '新通知！！！', 'admin', '<p>&nbsp;&nbsp;&nbsp;&nbsp;2022-03-02新版本更新维护，当天无法登录系统<img src=\"http://img.baidu.com/hi/bobo/B_0018.gif\"/>。请提前一天办结所需操作。感谢您的使用<img src=\"http://img.baidu.com/hi/jx2/j_0003.gif\"/>。</p>', '2022-02-10', '1');
INSERT INTO `news` VALUES ('2', '建议收集', 'admin', '<p>&nbsp;&nbsp;&nbsp;&nbsp;如果大家发现系统漏洞<img src=\"http://img.baidu.com/hi/face/i_f42.gif\"/>请联系管理员admin<img src=\"http://img.baidu.com/hi/youa/y_0037.gif\"/>进行修复，同时也欢迎大家提出完善系统的建议。感谢大家的使用，祝您生活愉快<img src=\"http://img.baidu.com/hi/bobo/B_0020.gif\"/>。</p>', '2022-01-05', '1');
INSERT INTO `news` VALUES ('3', '2023新年快乐', '路飞', '<p>新年快乐，前兔无量<img src=\"http://img.baidu.com/hi/jx2/j_0003.gif\"/></p>', '2023-01-30', '1');

-- ----------------------------
-- Table structure for `router`
-- ----------------------------
DROP TABLE IF EXISTS `router`;
CREATE TABLE `router` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `path` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `link` varchar(50) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of router
-- ----------------------------
INSERT INTO `router` VALUES ('1', '0', '/manage', 'Manage', '/manage', '主体', 'admin-user-teacher');
INSERT INTO `router` VALUES ('2', '1', 'manageindex', 'ManageIndex', '/manage/manageindex', '首页', 'admin-user-teacher');
INSERT INTO `router` VALUES ('4', '3', 'adduser', 'AddUser', '/manage/usercontrol/adduser', '添加用户', 'admin-teacher');
INSERT INTO `router` VALUES ('5', '3', 'users', 'Users', '/manage/usercontrol/users', '用户配置', 'admin-teacher');
INSERT INTO `router` VALUES ('3', '1', 'usercontrol', 'UserControl', '/manage/usercontrol', '用户管理', 'admin-teacher');
INSERT INTO `router` VALUES ('6', '1', 'schoolclass', 'SchoolClass', '/manage/schoolclass', '班级管理', 'admin-user-teacher');
INSERT INTO `router` VALUES ('9', '1', 'students', 'Students', '/manage/Students', '学员信息', 'admin-teacher');
INSERT INTO `router` VALUES ('7', '6', 'class', 'Class', '/manage/schoolclass/class', '班级列表', 'admin-teacher');
INSERT INTO `router` VALUES ('8', '6', 'Enterclass', 'EnterClass', '/manage/schoolclass/Enterclass', '加入班级', 'admin-user-teacher');
INSERT INTO `router` VALUES ('10', '1', 'chart', 'Chart', '/manage/chart', '图表展示', 'admin-user-teacher');
INSERT INTO `router` VALUES ('11', '10', 'studentchart', 'StudentChart', '/manage/chart/studentchart', '学生图表', 'admin-user-teacher');
INSERT INTO `router` VALUES ('12', '10', 'classchart', 'ClassChart', '/manage/chart/classchart', '班级图表', 'admin-user-teacher');
INSERT INTO `router` VALUES ('14', '13', 'addnews', 'AddNews', '/manage/news/addnews', '新闻公告', 'admin-teacher');
INSERT INTO `router` VALUES ('21', '1', 'details', 'Details', '/manage/details', '个人信息', 'admin-user-teacher');
INSERT INTO `router` VALUES ('13', '1', 'news', 'News', '/manage/news', '新闻管理', 'admin-teacher');
INSERT INTO `router` VALUES ('15', '13', 'newslist', 'NewsList', '/manage/news/newslist', '新闻列表', 'admin-teacher');
INSERT INTO `router` VALUES ('17', '1', 'excel', 'Excel', '/manage/excel', 'excel表', 'admin-user-teacher');
INSERT INTO `router` VALUES ('18', '17', 'addexcel', 'AddExcel', '/manage/excel/addexcel', '导入excel', 'admin-user-teacher');
INSERT INTO `router` VALUES ('19', '17', 'exportexcel', 'ExportExcel', '/manage/excel/exportexcel', '导出excel', 'admin-user-teacher');
INSERT INTO `router` VALUES ('22', '1', 'routerreplace', 'RouterReplace', '/manage/routerreplace', '页面刷新', 'admin-user-teacher');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) DEFAULT NULL,
  `cid` varchar(20) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `userurl` varchar(255) DEFAULT NULL,
  `userstate` varchar(20) NOT NULL,
  `paystate` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `sex` varchar(20) NOT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'U000001', '5', '123456', '首测', '123456', 'http://localhost:3000/uploadImg/user.jpeg', '1', '已缴费', '16688886666', '男', '吃饭睡觉打豆豆', 'user');
INSERT INTO `users` VALUES ('2', 'A00001', '0', 'admin', 'admin', 'admin', 'http://localhost:3000/uploadImg/44316b60-81d5-11ed-b7cb-a544fb925dca.jpg', '1', '', '18888888888', '男', '无', 'admin');
INSERT INTO `users` VALUES ('3', 'U000002', '2', '123', '123', '123', null, 'null', '', '12345678912', '女', '123', 'user');
INSERT INTO `users` VALUES ('12', 'T00001', '2', 'liu', '刘老师', 'liu', 'http://localhost:3000/uploadImg/user.jpeg', '1', '', '78978978978', '男', '游泳', 'teacher');
INSERT INTO `users` VALUES ('5', 'U000003', '1', '000', '000', '000', null, '0', '未缴费', '12345678912', '男', '000', 'user');
INSERT INTO `users` VALUES ('4', 'A00002', '0', 'lufei', '路飞', 'lufei', null, 'null', '', '12346578912', '男', '学习', 'admin');
INSERT INTO `users` VALUES ('6', 'T00002', '3', 'zhao', '赵老师', 'zhao', 'http://localhost:3000/uploadImg/user.jpeg', '1', '', '12345678912', '男', '玩游戏', 'teacher');
INSERT INTO `users` VALUES ('7', 'U000004', '1', 'zhangsan', '张三', 'zhangsan', null, '1', '未缴费', '12345678912', '男', '唱歌', 'user');
INSERT INTO `users` VALUES ('8', 'U000005', '2', 'lisi', '李四', 'lisi', null, '0', '未缴费', '12345678912', '女', '跳舞', 'user');
INSERT INTO `users` VALUES ('9', 'U000006', '3', 'wangwu', '王五', 'wangwu', null, '1', '已缴费', '78945612312', '男', '打篮球', 'user');
INSERT INTO `users` VALUES ('10', 'T00003', '1', 'wang', '王老师', 'wang', 'http://localhost:3000/uploadImg/user.jpeg', '1', '', '98765432198', '男', '跳伞', 'teacher');
INSERT INTO `users` VALUES ('11', 'T00004', '4', 'wu', '吴老师', 'wu', 'http://localhost:3000/uploadImg/5491cf10-82a5-11ed-af88-7145dd7600ec.jpg', '1', '', '45645645645', '女', '弹琴', 'teacher');
INSERT INTO `users` VALUES ('13', 'U000007', '4', 'test', '测试', 'test', '', '1', '已缴费', '12345678912', '男', '测试', 'user');
INSERT INTO `users` VALUES ('14', 'A00003', '0', 'suolong', '索隆', 'suolong', '', 'null', '未缴费', '18866799976', '男', '三刀流', 'admin');
INSERT INTO `users` VALUES ('15', 'T00005', '5', 'sun', '孙老师', 'sun', '', '1', '', '16698766689', '女', '大会员', 'teacher');
INSERT INTO `users` VALUES ('16', 'U000008', '4', 'xiaoxiao', '小小', 'xiaoxiao', 'http://localhost:3000/uploadImg/737f8da0-82a4-11ed-b095-b7131066b4ca.jpg', '1', '已缴费', '18838868898', '女', '读书，学习', 'user');
INSERT INTO `users` VALUES ('19', 'U000009', '11', 'jingjing', '静静', 'jingjing', '', '1', '已缴费', '16699996666', '女', '钢琴', 'user');
INSERT INTO `users` VALUES ('20', 'U0000010', '11', 'tianqi', '田七', 'tianqi', '', '1', '未缴费', '13789654321', '男', '跑步', 'user');
INSERT INTO `users` VALUES ('21', 'U000011', '2', 'chengyong', '程勇', 'chengyong', '', '1', '已缴费', '17894561230', '男', '篮球', 'user');
INSERT INTO `users` VALUES ('22', 'A00004', '0', 'admin000', 'admin000', 'admin000', '', '1', 'null', '12345678900', '男', '找茬', 'admin');
INSERT INTO `users` VALUES ('23', 'T00006', '11', 'zhou', '周老师', 'zhou', '', '1', 'null', '17898765432', '女', '读书', 'teacher');
