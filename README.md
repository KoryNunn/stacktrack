# stack-track

Tracks the state of a stack, and raises events when it changes.

## Usage

Install:

    npm install stack-track

Use:

    // Instanciate
    var tracker = new StackTracker();

    // Bind to events
    tracker.on('push', eventHandler);
    tracker.on('remove', eventHandler);
    tracker.on('top', eventHandler);
    tracker.on('empty', eventHandler);

    // Push an item onto the stack
    var removeA = tracker.push('a');

    // Remove a previously pushed item.
    removeA();

## Events

### push

Raised when any item is pushed onto the stack. The pushed item is passed to the handler.

### remove

Raised when any item is removed from the stack. The removed item is passed to the handler.

### top

Raised when there is a different last item in the stack to the last time the top event was raised. The last item is passed to the handler.

### empty

Raised when the stack is empty. Nothing passed to the handler.