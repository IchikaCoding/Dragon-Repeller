/** 経験値(experience point) */
let xp = 0;
/** 体力値 */
let health = 100;
let gold = 50;
// Todo 変数名を変更するか検討する
/** 持っている武器の総数-1。
 * weapons配列の何番目の武器を持っているのかを示す↓ */
/** targetMonsterIndex */
let currentWeaponIndex = 0;
/** 戦っているモンスターのID */
let currentMonsterIndex;
// Todo currentMonsterHealthに修正するか検討
/** これはHTMLと関係なし */
let monsterHealth;
/** 所持している武器名 */
let inventory = ["stick"];

// todo textはmessageText, 数値系はValueに変更する
/** クエリーセレクターとはHTML内から最初に該当する要素や属性を取ってくるもの */
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpTextEl = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStatsEl = document.querySelector("#monsterStats");
const monsterNameEl = document.querySelector("#monsterName");
// Todo monsterHealthValueElにするか迷う
const monsterHealthEl = document.querySelector("#monsterHealth");

// Todo powerを他の箇所の言い回しに揃える
/** お店が用意している武器一覧 */
const weapons = [
  { name: "stick", attackValue: 5 },
  {
    name: "dagger",
    attackValue: 30,
  },
  {
    name: "claw hammer",
    attackValue: 50,
  },
  {
    name: "sword",
    attackValue: 100,
  },
];

/**
 * モンスターの配列(currentMonsterIndexがインデックスとなっている)
 */
const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
];

/** 場面とボタンとボタンのテキストをまとめている定数。*/
const scenes = [
  {
    name: "town square",
    buttonText: ["Go to store", "Go to cave", "Fight dragon"],
    buttonFns: [goStore, goCave, fightDragon],
    message: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    buttonText: [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    buttonFns: [buyHealth, buyWeapon, goTown],
    message: "You enter the store.",
  },
  {
    name: "cave",
    buttonText: ["Fight slime", "Fight fanged beast", "Go to town square"],
    buttonFns: [fightSlime, fightBeast, goTown],
    message: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    buttonText: ["Attack", "Dodge", "Run"],
    buttonFns: [attack, dodge, goTown],
    message: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    buttonText: ["Go to town square", "Go to town square", "Go to town square"],
    buttonFns: [goTown, goTown, easterEgg],
    message:
      'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    buttonText: ["REPLAY?", "REPLAY?", "REPLAY?"],
    buttonFns: [restart, restart, restart],
    message: "You die. &#x2620;", // &#x2620は絵文字
  },
  {
    name: "win",
    buttonText: ["REPLAY?", "REPLAY?", "REPLAY?"],
    buttonFns: [restart, restart, restart],
    message: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    buttonText: ["2", "8", "Go to town square?"],
    buttonFns: [pickTwo, pickEight, goTown],
    message:
      "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// Todo ボタンDOM変数の意味が不明

/** initialize buttons */
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

/** --- ここから関数 --- */
/** 街に戻るとき（場所移動のとき）の処理 */
// sceneはパラメーター。引数に渡されたデータを関数内で受け取って使うための名前。
function update(scene) {
  monsterStatsEl.style.display = "none";
  button1.innerHTML = scene.buttonText[0];
  button1.onclick = scene.buttonFns[0];
  button2.innerHTML = scene.buttonText[1];
  button2.onclick = scene.buttonFns[1];
  button3.innerHTML = scene.buttonText[2];
  button3.onclick = scene.buttonFns[2];
  text.innerHTML = scene.message;
}

function goTown() {
  /** scenes[0]は実引数。呼び出すときに実際に渡す値のこと。 */
  update(scenes[0]);
}

/** --ストアに行く-- */
function goStore() {
  update(scenes[1]);
}
/** --洞窟に行く-- */
function goCave() {
  update(scenes[2]);
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
      /** 武器を購入したら１個増える。つまりこの変数が武器の総数だとわかる。 */
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
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  currentMonsterIndex = 0;
  goFight();
}

function fightBeast() {
  currentMonsterIndex = 1;
  goFight();
}

/** --ドラゴンと戦う-- */
function fightDragon() {
  currentMonsterIndex = 2;
  goFight();
}

function goFight() {
  update(scenes[3]);
  monsterHealth = monsters[currentMonsterIndex].health;
  console.log({ monsterHealth });
  monsterStatsEl.style.display = "block"; // 普段出さないため？
  /** Monster Name: ○○の○○にモンスターの名前を表示するためのもの */
  monsterNameEl.innerText = monsters[currentMonsterIndex].name;
  monsterHealthEl.innerText = monsterHealth; // 一応、変数を作ってHTMLの表示を更新している
}

function attack() {
  text.innerText = "The " + monsters[currentMonsterIndex].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  /** プレイヤーのhealthが減る式 */
  health -= getMonsterAttackValue(monsters[currentMonsterIndex].level);
  /** モンスターに攻撃があったときの処理 */
  if (isMonsterHit()) {
    /** モンスターのhealthが減る式(毎回6が引かれる計算) */
    monsterHealth -=
      weapons[currentWeaponIndex].attackValue +
      Math.floor(Math.random() * xp) +
      1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthEl.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (currentMonsterIndex === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  /** 10%の確率で武器が壊れる */
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeaponIndex--;
  }

  /** (デバック用)100%の確率で武器が壊れる */
  // if (Math.random() <= 1 && inventory.length !== 1) {
  //   text.innerText += " Your " + inventory.pop() + " breaks.";
  //   currentWeaponIndex--;
  //   return; // 早期リターンだけ明示
  // }
}

/**
 * モンスターを攻撃する値を取得する関数
 * @param {number} level
 */
function getMonsterAttackValue(level) {
  let check = Math.floor(Math.random() * xp);
  const hit = level * 5 - check;
  console.log("{monsterレベル：}" + level);
  console.log("{xp：}" + xp);
  console.log("{Check：}" + check);
  console.log("{hit：}" + hit);
  /** hit > 0が真のときhit、偽のとき0 */
  return hit > 0 ? hit : 0;
}

/** プレイヤーの攻撃が当たるかどうかの判定の処理 */
function isMonsterHit() {
  // ランダム値を作って命中率80％にしている
  // もしくは体力が20未満なら100％命中とする
  return Math.random() > 0.2 || health < 20;
}

/** シンプル版：モンスターに攻撃をするときの処理 */
// if (health < 20) {
//   return true;
// } else if (Math.random() > 0.2) {
//   return true;
// } else {
//   return false;
// }

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[currentMonsterIndex].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[currentMonsterIndex].level * 6.7);
  xp += monsters[currentMonsterIndex].level;
  goldText.innerText = gold;
  xpTextEl.innerText = xp;
  update(scenes[4]);
}

function lose() {
  update(scenes[5]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  xpTextEl.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  goTown();
}

function winGame() {
  update(scenes[6]);
}
/**
 * 隠し機能
 */
function easterEgg() {
  update(scenes[7]);
}

/**
 *
 * @param {number} guess ユーザーが選んだ２か８の値が入る
 */
function pick(guess) {
  const numbers = [];
  /** numbers配列を10まで生成するループ */
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  /** ユーザーが選んだ数字を表示する処理 */
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  /** 10回まわすforループ
   * iはnumbers配列のインデックス
   *　numbers[i]を表示したい
   */
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  /** ユーザーが選んだ値がnumbers配列に含まれているかどうかを確認する処理 */
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    /** healthがマイナスになるのを防ぐ処理
     * もしマイナスになりそうならlose関数を呼ぶ
     */
    if (health <= 0) {
      lose();
    }
  }
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
