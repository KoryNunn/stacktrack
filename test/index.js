var grape = require('grape'),
    StackTracker = require('../');

grape('events pass correct item', function(t){
    t.plan(3);

    var tracker = new StackTracker(),
        eventHandler = function(item){
            t.equal(item, 'a', 'The correct item was recieved');
        };

    tracker.on('push', eventHandler);
    tracker.on('remove', eventHandler);
    tracker.on('top', eventHandler);

    var removeA = tracker.push('a');
    removeA();
});

grape('events', function(t){
    t.plan(1);

    var tracker = new StackTracker();

    var eventOrder = [];

    tracker.on('push', function(){
        eventOrder.push('push');
    });
    tracker.on('remove', function(){
        eventOrder.push('remove');
    });
    tracker.on('top', function(){
        eventOrder.push('top');
    });
    tracker.on('empty', function(){
        eventOrder.push('empty');
        t.equal(eventOrder.join(' '), 'push top remove empty', 'The event order was correct');
    });

    var removeA = tracker.push('a');
    removeA();
});

grape('deeper stack', function(t){
    t.plan(1);

    var tracker = new StackTracker();

    var eventOrder = [];

    tracker.on('push', function(){
        eventOrder.push('push');
    });
    tracker.on('remove', function(){
        eventOrder.push('remove');
    });
    tracker.on('top', function(){
        eventOrder.push('top');
    });
    tracker.on('empty', function(){
        eventOrder.push('empty');
        t.equal(eventOrder.join(' '), 'push top push top remove top remove empty', 'The event order was correct');
    });

    var removeA = tracker.push('a');
    var removeB = tracker.push('b');
    removeB();
    removeA();
});

grape('remove non-last item', function(t){
    t.plan(1);

    var tracker = new StackTracker();

    var eventOrder = [];

    tracker.on('push', function(){
        eventOrder.push('push');
    });
    tracker.on('remove', function(){
        eventOrder.push('remove');
    });
    tracker.on('top', function(){
        eventOrder.push('top');
    });
    tracker.on('empty', function(){
        eventOrder.push('empty');
        t.equal(eventOrder.join(' '), 'push top push top remove remove empty', 'The event order was correct');
    });

    var removeA = tracker.push('a');
    var removeB = tracker.push('b');
    removeA();
    removeB();
});