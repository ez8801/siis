//
//  StringEx.js
//
//  2013.04.11  /  Minwoo Baek / usd122@naver.com
//

//String.prototype.trim = function() {
//    this.replace(/(^\s*)|(\s*$)/gi, "");
//};

// 
var ImageRegexp = /\.(gif|jpg|jpeg|tiff|png)$/i;

// �ѱ� �̸� 2~4�� �̳�
var KorRegexp = /^[��-�R]{2,4}$/;

// ���� �̸� 2~10�� �̳� : ����(\s)�� ���� First, Last Name ����
var EngRegexp = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

// �ѱ� �Ǵ� ���� ����ϱ�(ȥ��X)
var KorOrEngRegexp = /^[��-�R]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // "|"�� ���

// Ȯ���ڸ� [ 1 ~ 5 ]
var FileRegexp = /\.[0-9a-z]{1,5}$/i;

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
};

String.prototype.endsWith = function(suffix) {
    return this.length >= suffix.length
        && this.lastIndexOf(suffix) + suffix.length == this.length;
};

String.prototype.isFile = function() {
    return FileRegexp.test(this);
};

String.prototype.isImage = function() {
    return ImageRegexp.test(this);
};

String.prototype.ltrim = function() {
    return this.replace(/^\s*/, "");
};

String.prototype.rtrim = function() {
    return this.replace(/\s*$/, "");
};

String.prototype.replaceAll = function(str1, str2) {
    return this.replace(eval("/" + str1 + "/gi"), str2);
};

String.prototype.replaceNewLineChars = function(value) {
    if (value != null && value != "") {
        return value.replace(/\n/g, "\n");
    }

    return value;
}

//String.prototype.replaceAll2 = function(str1, str2) {
//    return this.replace(eval("/" + str1 + "$/gi"), str2);
//};

//  end of file "EZString.js"