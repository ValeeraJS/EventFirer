# EventFirer

A light library for creating custom events.

## Install

npm i @valeera/eventfirer

or

yarn add @valeera/eventfirer

## Basic usage

```html
<script src="EventFirer.js"></script>
<script>

    class Car extends EventFirer {
        start = () => {
            this.fire('car-a', {message: 'aaa'});
            this.fire('car-b', {message: 'bbb'});
            this.fire('car-c', {message: 'ccc'});
            this.fire('bus-1', {message: '111'});
            this.fire('bus-2', {message: '222'});
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
