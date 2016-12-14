//Checks if string is empty
var isEmpty = function (ev) {
    return ((typeof (ev) == 'undefined') || ev == null || ev == '' || angular.equals({}, ev));
};

//Checks if main-string contains sub-string
var stringContainsSubString = function (main, sub) {
    return main.indexOf(sub) >= 0 ? true : false;
};

//Removes all White spaces from string
var removerAllWhiteSpacesFromString = function (main) {
    return main.replace(/\s+/g, '');
};

//Removes whites spaces from beginning and ending
var removeWhiteSpacesFromString = function (main) {
    return main.trim();
};

//Counts numbers of words
var countNumberOfWords = function (main) {
    return removeWhiteSpacesFromString(main).replace(/(^\s*)|(\s*$)/gi, "").replace(/[ ]{2,}/gi, " ").replace(/\n /, "\n").split(' ').length;
};

//Replaces oChar with nChar in main string(All occurances)
var replaceCharcter = function (main, oChar, nChar) {
    return main.replace(new RegExp(oChar, 'g'), nChar);
};

//Returns Object matching atr val from list
var filterBy = function (list, atr, val) {
    return list.filter(function (obj) {
        return obj[atr] == val;
    });
};

//Returns Objects except matching atr val from list
var removeBy = function (arr, attr, id) {
    return arr.filter(function (t) {
        return t[attr] != id;
    });
};

//Removes matching value from Array
var removeByValue = function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
};

//Returns key for value from Array
var getKeyByValue = function (dict, value) {
    for (var prop in dict) {
        if (dict.hasOwnProperty(prop)) {
            if (dict[prop] === value)
                return prop;
        }
    }
};

//Trim lead character from string
var stringByTrimmingLeadingCharactersInSet = function (str) {
    return str.substring(1);
};

//Trim trail character from string
var stringByTrimmingTrailingCharactersInSet = function (str) {
    return str.substring(0, str.length - 1);
};

//Checks if text contains only alphabets
var containsOnlyLetters = function (text) {
    var Regx = /^[A-Za-z]*$/;
    if (Regx.test(text)) {
        return true;
    } else {
        return false;
    }
};

//Checks if text contains only numbers
var containsOnlyNumbers = function (text) {
    var Regx = /^\d+$/;
    if (Regx.test(text)) {
        return true;
    } else {
        return false;
    }
};

//Checks if text contains only Alphanumeric
var containsOnlyNumbersAndLetters = function (text) {
    var Regx = /^[0-9a-zA-Z]+$/;
    if (Regx.test(text)) {
        return true;
    } else {
        return false;
    }
};

//Checks if email is valid
var isValidEmail = function (text) {
    var Regx = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    if (Regx.test(text)) {
        return true;
    } else {
        return false;
    }
};

//Checks if phone-number is valid
var isVAlidPhoneNumber = function (text) {
    var Regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (Regx.test(text)) {
        return true;
    } else {
        return false;
    }
};

//Checks if URL is valid
var isValidUrl = function (text) {
    var Regx = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})");
    if (Regx.test(text)) {
        return true;
    } else {
        return false;
    }
};

//Generates random alphanumeric string based upon given length
var generateRandomString = function (len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

//Creates Date in UTC Format
var createDateAsUTC = function (now) {
    return new Date(now.get('year'), now.get('month'), now.get('date'), now.get('hour'), now.get('minute'), now.get('second'));
}

//Counts days from given date to today
var daysAgo = function (data) {
    var date1 = new Date(data);
    var date2 = new Date(moment());
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
};

//Counts and returns string based upon days
var stringDaysAgoAgainstMidnight = function (data) {
    var days = daysAgo(data);
    var response = "";
    switch (days) {
        case 0:
            response = "today";
            break;
        case 1:
            response = "yesterday";
            break;
        default:
            response = days + " days ago";
            break;
    }
    return response;
};

//Returns starting date for given date's week
var beginningOfWeek = function (data) {
    return data.startOf('week').format(Format_SQLDate);
};

//Returns ending date for given date's week
var endOfWeek = function (data) {
    return data.endOf('week').format(Format_SQLDate);
};

//Returns weekday
var weekday = function (data) {
    return data ? data.getDay() : new Date().getDay();
};

//Returns week number
var weekNumber = function (data) {
    return data ? data.week() : moment().week();
};

//Converts to date format from string in given format or YYYY-MM-DD
var dateFromString = function (data, format) {
    return format ? moment(data, format) : moment(data, Format_SQLDate);
};

//Convert image to base64 from URL
var convertImgToBase64URL = function (url, success, error) {
    var data, canvas, ctx;
    var img = new Image();
    img.onload = function () {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try {
            data = canvas.toDataURL();
            success({ image: img, data: data });
        } catch (e) {
            consoleNow(e);
        }
    }
    img.src = url;
};

//generates SHA1 from given string
var stringToSha1 = function (msg) {
    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;
        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;
        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);
    while ((word_array.length % 16) != 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
};

//Creates clone for given object
var cloneObject = function (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};

/*~~~~~~~~~~~~~~~~~~~~~~~ PROTOTYPES ~~~~~~~~~~~~~~~~~~~~~~~*/

//Checks if string exist in Array
Array.prototype.isInThisarray = function (sub) {
    var i = this.length;
    while (i--) {
        try {
            var temp = this[i];
            for (var z in temp) {
                if (stringContainsSubString(temp[z], sub)) {
                    return true;
                }
            }
        } catch (q) {
            console.log(q.message)
        }
    }
    return false;
};

//Removes value from passed index
Array.prototype.remove = function (x) {
    var y = this.slice(x + 1);
    var z = [];
    for (i = 0; i <= x - 1; i++) {
        z[z.length] = this[i];
    }
    for (i = 0; i < y.length; i++) {
        z[z.length] = y[i];
    }
    return z;
};

//String starts with
String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
};

//String ends with
String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};

//Capitalizes first letter from string
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};