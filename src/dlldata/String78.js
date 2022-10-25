/**
 * 字符串处理类
 */
export default class String78{
	constructor(){
		
	} 
	
	static str2Base64(strin){
		let tmparr=String78.str2ArrayBuffer(strin)
		let base64str=uni.arrayBufferToBase64(tmparr)
		return base64str
	}
	
	static str2ArrayBuffer(str){
		var bytes = new Array();
		var len,c;
		len = str.length;
		for(let i = 0; i < len; i++){
			c = str.charCodeAt(i);
			if(c >= 0x010000 && c <= 0x10FFFF){
				bytes.push(((c >> 18) & 0x07) | 0xF0);
				bytes.push(((c >> 12) & 0x3F) | 0x80);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			}else if(c >= 0x000800 && c <= 0x00FFFF){
				bytes.push(((c >> 12) & 0x0F) | 0xE0);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			}else if(c >= 0x000080 && c <= 0x0007FF){
				bytes.push(((c >> 6) & 0x1F) | 0xC0);
				bytes.push((c & 0x3F) | 0x80);
			}else{
				bytes.push(c & 0xFF);
			}
		}
		let array = new Int8Array(bytes.length);
		for(let i in bytes){
		  array[i] =bytes[i];
		}
		return array.buffer;
	}
	
	
}