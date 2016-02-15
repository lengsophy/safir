    Template.registerHelper('getImgForProduct', function (id_product) {

       // console.log('calling img for '+id);
        var p=products.findOne({_id:id_product});
        if(p.image instanceof Array)
            var id= p.image[0];
        else
            var id= p.image;

    if(id=='' || typeof id == "undefined")
        return '/img/unknown.png';

    else if(id.indexOf("uploads")>-1){

        id=id.replace(/ /g, "%20");
       // console.log("id img---" + id);
        path = id.replace('/uploads/images/','');
        return 'http://d1ak0tqynavn2m.cloudfront.net/'+path;

    }
    else if(id.indexOf("http://")>-1){
   
        return id;

    }else{
        var img = images.findOne({_id:id});
        if(img){
            var id= img.copies.images.key;
           // console.log("id img---" + id);
            path = id.replace('images/','');
            return 'http://d1ak0tqynavn2m.cloudfront.net/'+path;
        }else{
            return;
        } 
    }

    });

    //For user upload img
    Template.registerHelper('getImg', function (id) {
        //console.log("ID getImg GENDER=== "+id);
        if(id=='' || typeof id == "undefined")
            return '/img/unknown.png';

        else if(id.indexOf("uploads")>-1){
            id=id.replace(/ /g, "%20");
           // console.log('repaclement===='+id);
            return id;
        }
        else if(id.indexOf("http://")>-1){
           // console.log("http:// "+id);
            return id;

        }else{
          //  console.log('ID:'+id);
            //var id = String(id);
            var img = images.findOne({_id:id});
           // console.log("display img");
          //  console.log(img);
            if(img){
                var id= img.copies.images.key;
            //    console.log("id img---" + id);
                path=id.replace('UserUploads/','');
              //  console.log("path "+path);
              
              //return '/uploads/'+id;
                return 'http://d2l5w8pvs4gpu2.cloudfront.net/'+path;


            }else{
                console.log("bbb");
                return;
            } 
        }

    });

    Template.registerHelper('trimString', function(passedString) {
        var theString = passedString.substring(0,110);
        return new Handlebars.SafeString(theString)
    });

    Template.registerHelper('getDate', function (curdate) {
        var d = new Date(curdate);
        var str=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
        return str;
    }); 

    Template.registerHelper('recap', function (text) {
        return text.split(" ").splice(0,3).join(" ");
    }); 

    Template.registerHelper('getTotal', function (text) {
        return Session.get("total");
    }); 

    Template.registerHelper('getProductInfo', function (item_id) {
        var cartItem=cart.findOne({"_id":item_id});
        var pro=products.findOne({"_id":cartItem.id_product});
        var shop = cartItem.shop; //shops.findOne({"_id":cartItem.shop});
       // console.log('TESTING CART' +pro.title);  
        return {_id:item_id,product:pro, qty:cartItem.quantity, subtotal:cartItem.subtotal, item_id:item_id,shop:shop};
    }); 

    Template.registerHelper('getCart', function (curdate) {
        var mycart = '';

        userid = Session.get('userId');
        mycart = cart.find({userId:userid});
      //  console.log('cart id='+userid);
        var total = 0;

        mycart.forEach( function(value,index){
            total = total + value.subtotal;
        })
        Session.set("total", total);
       // console.log('TOTAL'+total);
        return mycart;
    }); 

    var clock = 100;

    var timeLeft = function() {
        if (clock > 0) {
            clock--;
            Session.set("time", clock);
    // return console.log(clock);
    } else {
       // console.log("That's All Folks");
        return Meteor.clearInterval(interval);
    }
    };

    var interval = Meteor.setInterval(timeLeft, 1000);

    Template.registerHelper("time", function() {
        return Session.get("time");
    });


    Template.registerHelper("getFirstImgContent",function(id){
        var p=contents.findOne({_id:id});
        if(p.image instanceof Array)
            return p.image[0];
        else
            return p.image;
    });

    Template.registerHelper("getFirstImgProduct",function(id){
        var p=products.findOne({_id:id});
        if(p.image instanceof Array)
            return p.image[0];
        else
            return p.image;
    });

    Template.registerHelper("validProduct",function(img,price){
        if(typeof price === "undefined" || price=="" || typeof img === "undefined" || img=="")
            return false;
        else
            return true;
    });

    Template.registerHelper("getDirection",function(img,price){
        if(TAPi18n.getLanguage()=='fa')
            return 'rtl';
        else
            return 'ltr'
    });

    Template.registerHelper("getCurrentLanguage",function(img,price){
        if(TAPi18n.getLanguage()=='fa')
            return 'fa-IR';
        else
            return 'en'
    });

    Template.registerHelper("getDirectionMenu",function(img,price){
        if(TAPi18n.getLanguage()=='fa')
            return 'navbar-right';
        else
            return 'navbar-left'
    });

Template.registerHelper("classCom",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'megamenu_left';
    else
        return 'megamenu_right'
    });

Template.registerHelper("classItem",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'megamenu_right';
    else
        return 'megamenu_left'
    });
Template.registerHelper("backCom",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'background:url(/images/bg_nav1.png)';
    else
        return 'background:url(/images/bg_nav_right.png)'
    });


Template.registerHelper("smaller",function(text,size){
    var finalText='';
        var line=text.split(' ');
        if(line.length<size)
            var wordmax=line.length;
        else
            wordmax=size;
        for(var i=0;i<wordmax;i++){
            finalText=finalText+line[i]+' ';
        }
        return finalText;
    });

    Template.registerHelper("slug",function(){
        return slugify(this.title);
    });

    Template.registerHelper("slugProduct",function(){
        var title=this.title;
       // console.log("SLUG="+title);
        title=title.toLowerCase();
        title=title.replace(/ /g, "-");
        title=title.replace(/\+/g, "(plus)");
        title=title.replace(/ô/g, "(o-cir)");
        return title;
    });

   // Template.registerHelper("getMenuClass",function(index){

Template.registerHelper("getMenuClass",function(index){
    if(TAPi18n.getLanguage()=='fa')
        return 'dropdown_fullwidth';
        if(index==1)
            return 'dropdown_fullwidth';
        index=Number(index);
        var newIndex=12-(1*index);
        var str='dropdown_'+newIndex+'columns dropdown_container'
        return str;
    });

