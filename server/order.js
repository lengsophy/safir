Meteor.methods({
	insertOrder:function(obj){
		return order.insert(obj)
	},
	updateOrder:function(id,obj){
		order.update({orderId:id},{$set:obj});
	},
	addAdress: function(id,add){
		order.update({orderId:id},{$addToSet:{address:add}});
	},
	addDelivery: function(id,deliv,user){
		console.log('id='+id+'delivery: '+deliv+'/ userid: '+user);
		var time=Date.now();
		order.update({orderId:id},{$set:{delivery:deliv,time:time,status:'new'}});
		cart.remove({"userId":user});
	},
	update:function(id,obj){
		order.update({_id:id},{$set:obj});
	}
	/*insertAddress1:function(id,obj){
		order.update({orderId:id},{$set:obj});
	}*/
});