var inherits = require('util').inherits;

var INSTEONMessageCommand = module.exports = function INSTEONMessageCommand(cmd){
	if(!(this instanceof INSTEONMessageCommand)){ 
		return new INSTEONMessageCommand(cmd);
	}
	var buffer = Buffer.alloc(2);
	buffer.__proto__ = INSTEONMessageCommand.prototype;
	if(typeof cmd == "number"){
		buffer[0] = cmd;
		buffer[1] = 0;
	}else if(Buffer.isBuffer(cmd) || Array.isArray(cmd)){
		buffer[0] = cmd[0] || 0;
		buffer[1] = cmd[1] || 0;
	}else if(typeof cmd == "object"){
		buffer[0] = cmd.number || 0;
		buffer[1] = cmd.data || 0;
	}else{
		buffer[0] = buffer[1] = 0;
	}
	return buffer;
};
inherits(INSTEONMessageCommand, Buffer);

Object.defineProperties(INSTEONMessageCommand.prototype, {
	number: {
		get: function(){
			return this[0];
		},
		set: function(value){
			return this[0] = value;
		}
	},
	data: {
		get: function(){
			return this[1];
		},
		set: function(value){
			return this[1] = value;
		}
	}
});
