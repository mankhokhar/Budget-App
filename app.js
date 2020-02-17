

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

	function deleteIncomeItem(index){
		incomeList.splice(index,1);
	}

	function deleteExpensesItem(index){
		expensesList.splice(index,1);
	}

    return {

    	add: function(iName,iValue,iType){
    		addItem(iName,iValue,iType);
    		calculateBudget();
    		calclulateTotal();
    		},

    	getBudget: function(){
    		return [totalBudget,totalIncome,totalExpenses,incomeList,expensesList];
    		},

    	del_item: function(type,index){
    		if (type=="income"){
    			deleteIncomeItem(index);
    		}else{
    			deleteExpensesItem(index);
    		}
    		calculateBudget();
    		calclulateTotal();
    	}

    }


})();

var UIController = (function(){

	function displayBudget(budget,income,expense){
		document.querySelector(".budget__value").innerHTML = budget;
		document.querySelector(".budget__income--value").innerHTML = "+" + income;
		document.querySelector(".budget__expenses--value").innerHTML = "-" + expense; 
	}

	function showIncomeList(incomeList){
		document.querySelector(".income__list").innerHTML = "";
		incomeList.forEach(function(curr,index){
			$(".income__list").append(
				'<div class="item clearfix" id="income-'+ index +'">' +
                    '<div class="item__description">' + curr.name + '</div>' +
		                   '<div class="right clearfix">' +
                    			'<div class="item__value">+ ' + curr.value + '</div>' +
                    			'<div class="item__delete">' +
                        			'<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                    			'</div>' +
                			'</div>' +
                '</div>'


			);
		});
	}

	function showExpenseList(expenseList){
		document.querySelector(".expenses__list").innerHTML = "";
		expenseList.forEach(function(curr,index){
			$(".expenses__list").append(
				'<div class="item clearfix" id="expense-' + index + '">' +
                    '<div class="item__description">' + curr.name + '</div>' +
                    '<div class="right clearfix">' +
                        '<div class="item__value">-' + curr.value + '</div>' +
                        '<div class="item__percentage">' + '21%' + '</div>' +
                        '<div class="item__delete">' +
                            '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>'
			);
		});
	}

	return{
		showBudget: function(budget,income,expense){
			displayBudget(budget,income,expense);
		},

		showIncome: function(list){
			showIncomeList(list);
		},

		showExpense: function(list){
			showExpenseList(list);
		}
	}

})();


//app controller
var controller = (function(budgetCtrl,UICtrl){

	//eventlistener for add button (tick mark)
	function add_btn(){
		document.querySelector(".add__btn").addEventListener("click",function(){
			var iType = document.querySelector(".add__type").value;
			var iName = document.querySelector(".add__description").value
			var iValue = parseInt(document.querySelector(".add__value").value)
			budgetCtrl.add(iName,iValue,iType);
			
			var budget = budgetCtrl.getBudget();
			UICtrl.showBudget(budget[0],budget[1],budget[2]);
			UICtrl.showIncome(budget[3]);
			UICtrl.showExpense(budget[4]);
			delete_btn();

		});
	}

	function delete_btn(){
		$(".item__delete--btn").on("click",function(){
			var id = this.parentElement.parentElement.parentElement.id;
			console.log(id);

			[type, index] = id.split("-");

			budgetCtrl.del_item(type,index); 

			var budget = budgetCtrl.getBudget();
			UICtrl.showBudget(budget[0],budget[1],budget[2]);
			UICtrl.showIncome(budget[3]);
			UICtrl.showExpense(budget[4]);
			delete_btn();
		});
	}

	return{

		ctrl_addBtn: function(){
			add_btn();
		},

		ctrl_delete_btn:function(){
			delete_btn();
		}

	}

})(BudgetController,UIController);


controller.ctrl_addBtn();
// controller.ctrl_delete_btn();
























