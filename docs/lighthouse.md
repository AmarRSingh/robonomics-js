Создание маяка
========

```javascript
const minimalFreeze = 1000 // Wn
const timeout = 25 // blocks
const name = 'mylighthouse' // название маяка
robonomics.factory.send('createLighthouse', [minimalFreeze, timeout, name], { from: robonomics.account })
	.then((tx) => console.log(tx))
​
robonomics.factory.watchLighthouse((lighthouse) => {
	console.log(lighthouse.name)
})
```
