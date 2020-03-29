# EventDispatcher

A light library for creating custom events.

## Install

npm i @valeera/eventdispatcher

or

yarn add @valeera/eventdispatcher

## Basic usage

```html
<script src="EventDispatcher.js"></script>
<script>

    class Car extends EventDispatcher {
        start = () => {
            this.dispatchEvent('car-a', {message: 'aaa'});
            this.dispatchEvent('car-b', {message: 'bbb'});
            this.dispatchEvent('car-c', {message: 'ccc'});
            this.dispatchEvent('bus-1', {message: '111'});
            this.dispatchEvent('bus-2', {message: '222'});
        };
    }

    const car = new Car();

    car.on('car-a', function (event) {
        console.log("on: ", event.target.message)
    }).filt((type) => {
        return type.indexOf('car') > -1;
    }, (event) => {
        console.log('filt: ', event.target.message);
    }).all((event) => {
        console.log('all: ', event.target.message);
    });

    car.start();

</script>
```

In broswer console, you could see:
```
on:  aaa
filt:  aaa
all:  aaa
filt:  bbb
all:  bbb
filt:  ccc
all:  ccc
all:  111
all:  222
```
