var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: 500,
  randSelector: .8,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td id='" + w + "-" + h + "' class='dead'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    for (x=0;x<this.width;x++){
      for (y=0;y<this.height;y++){
        cell = document.getElementById(x + "-" + y)
        iteratorFunc(cell,x,y)
      }
    }
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board

    // var overallSetup = function() {
    //   for (i=0;i<this.width;i++){
    //     for (j=0;j<this.height;j++){
    //       if (document.getElementById(i + "-" + j).getAttribute('data-status') == 'dead') this.className = "dead";
    //       if (document.getElementById(i + "-" + j).getAttribute('data-status') == 'alive') this.className = "alive";
    //     }
    //   }
    // } 

    var onCellClick = function () {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      
      // how to set the style of the cell when it's clicked
      if (this.className == 'dead') {
        this.className = "alive";
//        this.setAttribute('data-status', 'alive');
        console.log("turned " +this.id + " on")
      } else {
        this.className = "dead";
  //      this.setAttribute('data-status', 'dead');
        console.log("turned " +this.id + " off")
      }
    };
    for (i=0;i<this.width;i++){
      for (j=0;j<this.height;j++){
        document.getElementById(i + "-" + j).onclick = onCellClick
      }
    }

    var clearCell = function(cell) {
      console.log("cleared" + this)
      // document.getElementById(x + "-" + y)
      cell.className = "dead"
      // for (i=0;i<allCells.length;i++){
      //   allCells[i].setAttribute("data-status", "dead")
      //   allCells[i].className = "dead"
      //   console.log(allCells[i])
      }
      
    document.getElementById('clear_btn').onclick = function(){this.forEachCell(clearCell)}.bind(this)

    document.getElementById('step_btn').onclick = this.step.bind(this)
    document.getElementById('reset_btn').onclick = this.random.bind(this)
    document.getElementById('play_btn').onclick = this.autoPlay.bind(this)

    // var cell00 = document.getElementById('0-0');
    // cell00.onclick = onCellClick;
  },

  step: function () {
    // console.log("test")
    var scoreArr = []
    var cellScore = function(cell,x,y){
      var score = 0
      for (i=x-1;i<=x+1;i++){
        for (j=y-1;j<=y+1;j++){
          if (i==x && j==y) continue
          if (i<0 || j<0) continue
          if (i>11 || j>11) continue
          //console.log(i + "-" +j)
          loopCell = document.getElementById(i + "-" + j)
          if (loopCell.className == "alive") score++
          }
        }
        //console.log(this)
      scoreArr.push(score)
      //console.log(scoreArr)
      if (loopCell.className == "alive") console.log("cell" + x + "-" + j + " has score " + score)
      }
    this.forEachCell(cellScore)
    var changeCells = function(cell,x,y){
      loopCell = document.getElementById(x + "-" + y)
      if (scoreArr[y*12+x] < 2 && loopCell.className == "alive") loopCell.className = "dead"
      if (scoreArr[y*12+x] > 3 && loopCell.className == "alive") loopCell.className = "dead"
      if (scoreArr[y*12+x] == 3 && loopCell.className == "dead") loopCell.className = "alive"
    }
    this.forEachCell(changeCells)
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    
  },

  random: function () {
    var randomizeCell = function(cell,x,y){
      loopCell = document.getElementById(x + "-" + y)
      if (Math.random() < .44){
        loopCell.className = "alive"
      } else {loopCell.className = "dead"}
    }
    this.forEachCell(randomizeCell)
  },

  autoPlay: function() {
    setInterval(this.step.bind(this), this.stepInterval)
  }
};

  gameOfLife.createAndShowBoard();
