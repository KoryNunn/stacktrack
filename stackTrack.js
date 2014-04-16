var EventEmitter = require('events').EventEmitter;

function StackTracker(item){
    this._stack = [];
}
StackTracker.prototype = Object.create(EventEmitter.prototype);
StackTracker.prototype.constructor = StackTracker;
StackTracker.prototype.push = function(item){
    var stackTracker = this,
        stack = this._stack;

    var itemWrapper = {
        item: item
    };

    stack.push(itemWrapper);
    this.emit('push', item);
    this.emit('top', item);

    return function(){
        var index = stack.indexOf(itemWrapper);

        if(index>=0){
            stack.splice(index, 1);
            stackTracker.emit('remove', item);
        }if(index === stack.length){
            if(stack.length === 0){
                stackTracker.emit('empty');
            }else{
                stackTracker.emit('top', stack[stack.length-1].item);
            }
        }
    };
};

module.exports = StackTracker;