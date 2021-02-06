//Create variables here
var dog,happyDog;
var foodS,foodStock;
var database;
var addFood,feedFood;
var fedTime,lastFed
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")

}

function setup() {
  createCanvas(1000,500);
  dog = createSprite(800,250)
  dog.addImage(dogImg)
  dog.scale = 0.2
  database = firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  foodObj = new Food(200,100,40,40);
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("addFood");
  addFood.position(800,95);
  addFood.mousePressed(addFood) 
  
}


function draw() {  
  background(46,139,87)
  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
  }

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12AM",350,30);
  }else{
    text("Last Fed : " + lastFed + "AM",350,30);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.uptdateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function AddFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function getFoodStock(){
  
}