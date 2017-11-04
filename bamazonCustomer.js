var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1597532011zZ!",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  //start();
console.log("connected as id " + connection.threadId);
  showProducts();
});
function showProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    postAuction()
  });
}
// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "itemToBuy",
      type: "rawlist",
      message: "Select [item_id] of product to buy",
      choices: ["POST", "BID"]
    })
    .then(function(answer) {
      console.log(answer)
      // based on their answer, either call the bid or the post functions
      if (answer.itemToBuy.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}

// function to handle posting new items up for auction
function postAuction() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: validate

      },
      {
        name: "stock",
        type: "input",
        message: "How many units of the product would you like to buy?",
        validate: validate
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      //console.log(answer)
    connection.query("SELECT * FROM products", function(err, results) {
      var chosenItem;
      //console.log(answer.product)
    for (var i = 0; i < results.length; i++) {
      //console.log(results[1].item_id)
      if (results[i].item_id == answer.product) {
            chosenItem = results[i];
        //    console.log('sjdkfsjdlkfs')
          }
    }
    //console.log(chosenItem)
    console.log("-----------------------------------");

    //console.log(chosenItem.stock_quantity)
    if (answer.stock < chosenItem.stock_quantity) {

      console.log("you have enough in stock!")
      var totalCost = answer.stock * chosenItem.price
      console.log("Total cost for " + answer.stock + " "+ chosenItem.product_name + "(s)")
      console.log(" $" + totalCost)
          // bid was high enough, so update db, let the user know, and start over


      var updatedStockNumber = chosenItem.stock_quantity - answer.stock;
      updateProduct(updatedStockNumber,chosenItem.product_name)
      showProducts()

        }
        else {
          console.log("Insufficient quantity!")
          showProducts()
        }


  });

    });
}

function updateProduct(amount,name) {
  //console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: amount
      },
      {
        product_name: name
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      //deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}
function validate (value) {
  if (isNaN(value) === false) {
    return true;
  }
  return false;
} 