## Pesudo Code

### Limited Banner

```JavaScript
function limited(pulls, characters){
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1){
        for (let i = 1, i <= pulls, i ++){
            pull('limited', characters, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will be saved. Just know your password and username!!!!!";
    }
}
```

### Standard Banner

```JavaScript
function standard(pulls){
    currentPull.innerHTML = "";
    const standardCharacters = [];  //insert the characters later on when coding!!!!!!!
    const standardWeapons = [];     //insert later...
    const standard = {
        characters: `${standardCharacters}`,
        weapons: `${standardWeapons}`,
    };
    if (pulls === 10 || pulls === 1){
        for (let i = 1, i <= pulls, i ++){
            pull('standard', standard, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will be saved. Just know your password and username!!!!!";
    }
}
```

### Weapon Banner

```JavaScript
function weapon(pulls, weapons){
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1){
        for (let i = 1, i <= pulls, i ++){
            pull('weapon', weapons, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will be saved. Just know your password and username!!!!!";
    }
}
```

### Pull

```JavaScript
function pull(type, items, i){
    //the code do it later...
}
```

### Select Your Banner

```JavaScript
function banner(){
    //the code do it later...
}
```

### History

```JavaScript
function history(){
    //the code do it later...
}
```

### Display Current Wish + Animation for Wishing

```JavaScript
function wishing(){
    //the code do it later...
}
```

## Appearance

### Homepage



### Wishing Page



### Banners

    Standard

        do it later...

    Weapon

        do it later...

    Limited

        do it later...


### History



# The End!!!!!!