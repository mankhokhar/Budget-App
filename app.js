

//Budget controller
var BudgetController = (function () {

	//data structures
	function item(itemName, itemValue){
		this.name = itemName;
		this.value = itemValue;
	}

	var incomeList =[];
	var expensesList =[]
	var totalIncome =0;
	var totalExpenses =0;
	var totalBudget =0;

	//functions

	function addItem(itemName,itemValue,itemType){
		if (itemType=="inc"){
			incomeList.push(new item(itemName,itemValue))
		}else{
			expensesList.push(new item(itemName,itemValue))
		}
	}

	function calculateBudget(){
		totalIncome = 0;
		totalExpenses = 0;
		incomeList.forEach(function(curr){
			totalIncome +=  curr.value;
		});
		expensesList.forEach(function(curr){
			totalExpenses += curr.value;
		});
	}

	function calclulateTotal(){
		totalBudget = totalIncome - totalExpenses;
	}

    return {

    	add: function(iName,iValue,iType){
    		addItem(iName,iValue,iType);
    		calculateBudget();
    		calclulateTotal();
    		},

    	getBudget: function(){
    		return [totalBudget,totalIncome,totalExpenses];
    		}

    }


})();

var UIController = (function(){

	function displayBudget(budget,income,expense){
		document.querySelector(".budget__value").innerHTML = budget;
		document.querySelector(".budget__income--value").innerHTML = "+" + income;
		document.querySelector(".budget__expenses--value").innerHTML = "-" + expense; 
	}

	return{
		showBudget: function(budget,income,expense){
			displayBudget(budget,income,expense);
		}
	}

})();


//app controller
var controller = (function(budgetCtrl,UICtrl){

	//eventlistener for add button (tick mark)
	document.querySelector(".add__btn").addEventListener("click",function(){
		var iType = document.querySelector(".add__type").value;
		var iName = document.querySelector(".add__description").value
		var iValue = parseInt(document.querySelector(".add__value").value)
		budgetCtrl.add(iName,iValue,iType);
		
		var budget = budgetCtrl.getBudget();
		UICtrl.showBudget(budget[0],budget[1],budget[2]);

	});

	return{



	}

})(BudgetController,UIController);


























