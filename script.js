/** 経験値 */
let xp = 0;
/** 体力値 */
let health = 100;
let gold = 50;
/** weaponsの配列に対応している↓ */
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
/** クエリーセレクターとはHTML内から最初に該当する要素や属性を取ってくるもの */
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "stick", power: 5 },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
/** locationsが関数に入った時、どのロケーションを入れたらいいの？ */
/** locationsをまとめている。場所と表示内容を管理するもの！ */
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
];

/** initialize buttons */
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

/** --- ここから関数 --- */

/** 街に戻るとき（場所移動のとき）の処理 */
// locationはパラメーター。外からデータを受け取るための受け口。
function update(location) {
  button1.innerText = location["button text"][0];
  button1.onclick = location["button functions"][0];
  button2.innerText = location["button text"][1];
  button2.onclick = location["button functions"][1];
  button3.innerText = location["button text"][2];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  // locations[0]は引数。呼び出すときに実際に渡す値のこと。
  update(locations[0]);
}

/** --ストアに行く-- */
function goStore() {
  update(locations[1]);
}
/** --洞窟に行く-- */
function goCave() {
  update(locations[2]);
}
/** --ドラゴンと戦う-- */
function fightDragon() {
  console.log("Fighting dragon.");
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon;
  }
}

function fightSlime() {}

function fightBeast() {}
