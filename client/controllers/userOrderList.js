Template.userOrderList.helpers({
	getUser:function(userId){
    	var result = users.findOne({_id:userId});
    	return result.profile.firstname;
    },
    getOrder:function(){
    	var user = Meteor.userId();
    	return order.find({userid:user});
    },
    getProductName:function(title){
    	var result = products.findOne({_id:title}).title;
    	return result;
    },
    getProductInfo:function(product){
    	var result = products.findOne({_id:product});
    	return result;
    },
    getProduct:function(){
    	return order.find({});
    },
    getTime:function(time){

		  var d = new Date(time * 1000), // Convert the passed timestamp to milliseconds
		  yyyy = d.getFullYear(),
		  mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		  dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
		  hh = d.getHours(),
		  h = hh,
		  min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
		  ampm = 'AM',
		  time;
	   
		 if (hh > 12) {
		  	h = hh - 12;
		  	ampm = 'PM';
		 } else if (hh === 12) {
	  	 h = 12;
		  	 ampm = 'PM';
		 } else if (hh == 0) {
		  	h = 12;
		 }
	 // ie: 2013-02-18, 8:35 AM 
	 	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
	
		return time;
     }
   
});

Template.orderDetail.helpers({
	getProductOrder:function(){
		var user = Meteor.userId();
    	return order.find({userid:user});
	},
	getProductInfo:function(product){
    	var result = products.findOne({_id:product});
    	return result;
    }
});