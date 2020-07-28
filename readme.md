# Body Diary

App for quickly tracking food, mood, energy levels, and more

## Developing

```bash
npx react-native start
```

### Notes for me

```javascript
console.log(RNLocalize.getTimeZone())
var timedifference = new Date().getTimezoneOffset()
console.log(moment.tz.guess())
console.log(timedifference / 60)
console.log(moment().tz(RNLocalize.getTimeZone()).format())
```
