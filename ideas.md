## Pesudo Code

### Limited Banner

```JavaScript
function limited(pulls, characters){
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1){
        for (let i = 1; i <= pulls; i ++){
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
    //add standardCharacters + Weapons as objects outside the function - will use for other pulling mechs too
    const standardCharacters = [];  //insert the characters later on when coding!!!!!!!
    const standardWeapons = [];     //insert later...
    const standard = {
        characters: `${standardCharacters}`,
        weapons: `${standardWeapons}`,
    };
    if (pulls === 10 || pulls === 1){
        for (let i = 1; i <= pulls; i ++){
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
        for (let i = 1; i <= pulls; i ++){
            pull('weapon', weapons, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will be saved. Just know your password and username!!!!!";
    }
}
```

### Pull - Pity         <!-- figure out wishing system later - pity system figured out -->

```JavaScript
function pitySystem(type, items, i){
    let fourStar = 600;
    const fourSoftPity = (fourPity - 5) * 198.8;     //fourPity is the same as pity but for four stars
    fourStar = fourStar + fourSoftPity;
    let fiveStar = 6;
    if (type === 'standard' || type === 'limited'){
        const characterRate = 600;
        const weaponRate = 400;
        const softPity = (pity - 74) * 66;        //pity is a variable made outside of the function: used to hold the number of pulls after your last five star
        fiveStar = fiveStar + softPity;
    }else if (type === 'weapon'){
        const characterRate = 400;
        const weaponRate = 600;
        const softPity = (pity - 64) * 66;
        fiveStar = fiveStar + softPity;
    }else {
        //write code for the refund...
        return "Something wrong has occurred when you were pulling... Apologies. Your currency shall be refunded for the remaining pulls."
    }
    return {five: fiveStar, four: fourStar};        
    //to use this do const pity = pitySystem(...);
    //pity.five; //how do access fiveStar;
}
```

### Pull

```JavaScript

```

### Select Your Banner

```JavaScript
function banner(){
    //the code do it later...
    //Mainly setting up HTML - do this first!!!!
}
```

### History

```JavaScript
function history(){
    //the code do it later...
    //display in list of five at a time - might not do if too hard: just make gallery if too hard
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