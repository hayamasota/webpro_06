"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

//Delete
app.get("/keiyo2/confirm_delete/:number",(req, res) => {
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_delete',{id: number, data: detail});
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});

// --- 図書管理データの定義 ---
let books = [
  { id: 1, title: "銀河鉄道の夜", author: "宮沢賢治", status: "貸出可", pages: 250 },
  { id: 2, title: "吾輩は猫である", author: "夏目漱石", status: "貸出中", pages: 400 },
  { id: 3, title: "人間失格", author: "太宰治", status: "貸出可", pages: 180 },
];

// 一覧 (Books)
app.get("/books", (req, res) => {
  res.render('books', { data: books });
});

// Create - 画面（htmlファイルへリダイレクト）
app.get("/books/create", (req, res) => {
  res.redirect('/public/books_new.html');
});

// Read - 詳細
app.get("/books/:number", (req, res) => {
  const number = req.params.number;
  const detail = books[number];
  res.render('books_detail', { id: number, data: detail });
});

// Delete確認画面
app.get("/books/confirm_delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = books[number];
  res.render('books_delete', { id: number, data: detail });
});

// Delete実行
app.get("/books/delete/:number", (req, res) => {
  books.splice(req.params.number, 1);
  res.redirect('/books');
});

// Create - 保存 (POST)
app.post("/books", (req, res) => {
  const id = books.length + 1;
  const title = req.body.title;
  const author = req.body.author;
  const status = req.body.status;
  const pages = req.body.pages;
  books.push({ id: id, title: title, author: author, status: status, pages: pages });
  res.redirect('/books');
});

// Edit - 編集画面
app.get("/books/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = books[number];
  res.render('books_edit', { id: number, data: detail });
});

// Update - 更新処理 (POST)
app.post("/books/update/:number", (req, res) => {
  const num = req.params.number;
  books[num].title = req.body.title;
  books[num].author = req.body.author;
  books[num].status = req.body.status;
  books[num].pages = req.body.pages;
  res.redirect('/books');
});


// --- メニューデータの定義 ---
let menus = [
  { id: 1, name: "ブレンドコーヒー", category: "ドリンク", price: 450, calorie: 5 },
  { id: 2, name: "カフェラテ", category: "ドリンク", price: 500, calorie: 120 },
  { id: 3, name: "チョコスコーン", category: "フード", price: 380, calorie: 350 },
];

// 一覧 (Menus)
app.get("/menus", (req, res) => {
  res.render('menus', { data: menus });
});

// Create - 画面（htmlファイルへリダイレクト）
app.get("/menus/create", (req, res) => {
  res.redirect('/public/menus_new.html');
});

// Read - 詳細
app.get("/menus/:number", (req, res) => {
  const number = req.params.number;
  const detail = menus[number];
  res.render('menus_detail', { id: number, data: detail });
});

// Delete確認画面
app.get("/menus/confirm_delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = menus[number];
  res.render('menus_delete', { id: number, data: detail });
});

// Delete実行
app.get("/menus/delete/:number", (req, res) => {
  menus.splice(req.params.number, 1);
  res.redirect('/menus');
});

// Create - 保存 (POST)
app.post("/menus", (req, res) => {
  const id = menus.length + 1;
  menus.push({ 
    id: id, 
    name: req.body.name, 
    category: req.body.category, 
    price: req.body.price, 
    calorie: req.body.calorie 
  });
  res.redirect('/menus');
});

// Edit - 編集画面
app.get("/menus/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = menus[number];
  res.render('menus_edit', { id: number, data: detail });
});

// Update - 更新処理 (POST)
app.post("/menus/update/:number", (req, res) => {
  const num = req.params.number;
  menus[num].name = req.body.name;
  menus[num].category = req.body.category;
  menus[num].price = req.body.price;
  menus[num].calorie = req.body.calorie;
  res.redirect('/menus');
});


// --- 映画リストデータの定義 ---
let movies = [
  { id: 1, title: "君の名は。", director: "新海誠", year: 2016, rating: "★★★★★" },
  { id: 2, title: "となりのトトロ", director: "宮崎駿", year: 1988, rating: "★★★★" },
  { id: 3, title: "パラサイト", director: "ポン・ジュノ", year: 2019, rating: "★★★★" },
];

// 一覧 (Movies)
app.get("/movies", (req, res) => {
  res.render('movies', { data: movies });
});

// Create - 新規登録画面へ
app.get("/movies/create", (req, res) => {
  res.redirect('/public/movies_new.html');
});

// Read - 詳細
app.get("/movies/:number", (req, res) => {
  const number = req.params.number;
  const detail = movies[number];
  res.render('movies_detail', { id: number, data: detail });
});

// Delete確認画面
app.get("/movies/confirm_delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = movies[number];
  res.render('movies_delete', { id: number, data: detail });
});

// Delete実行
app.get("/movies/delete/:number", (req, res) => {
  movies.splice(req.params.number, 1);
  res.redirect('/movies');
});

// Create - 保存 (POST)
app.post("/movies", (req, res) => {
  const id = movies.length + 1;
  movies.push({ 
    id: id, 
    title: req.body.title, 
    director: req.body.director, 
    year: req.body.year, 
    rating: req.body.rating 
  });
  res.redirect('/movies');
});

// Edit - 編集画面
app.get("/movies/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = movies[number];
  res.render('movies_edit', { id: number, data: detail });
});

// Update - 更新処理 (POST)
app.post("/movies/update/:number", (req, res) => {
  const num = req.params.number;
  movies[num].title = req.body.title;
  movies[num].director = req.body.director;
  movies[num].year = req.body.year;
  movies[num].rating = req.body.rating;
  res.redirect('/movies');
});


app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
