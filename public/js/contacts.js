/* angular.module('ContactApp',[])
.controller('ContactCtrl',['$scope','Contact', function($scope, Contact) {

$scope.contact = new Contact();

var refresh = function() {
  $scope.contacts = Contact.query(); 
  console.log("contacts.js contacs " +  $scope.contacts);
  $scope.contact ="";
}
refresh();

$scope.add = function(contact) {
  Contact.save(contact,function(contact){
    refresh();
  });
};

$scope.update = function(contact) {
	contact.$update(function(){
    refresh();
  });
};

$scope.remove = function(contact) {
	contact.$delete(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.contact = Contact.get({ id: id });
};  

$scope.deselect = function() {
  $scope.contact = "";
}

}])

*/

//var app = angular.module('ContactApp',[]);

app.controller('ContactCtrl', function($scope, Contact)  {
	
	  'use strict';
      $scope.title= "Contact List";
      $scope.contact = new Contact();
     
    
   
     
     //refresh function retreive all contact data from mongodb and output them.
     var refresh = function() {
       
    	//hide the add contact form 
       $scope.addcontact_button_clicked = true;
       
       //unset ng-hide the add new contact button.
       $scope.addcontact_button=false;
       
       //returns all contact objects.
       $scope.contacts = Contact.query(); 
       $scope.contact ="";
       
       //loop thru all contacts data and set the submit button as a disabled button
       Contact.query( function(data) {
		    $scope.data = data;
		    //console.log("contacts.js data " + $scope.data.length);
		    angular.forEach( $scope.data,function(value,index){
		    	  // console.log("foreach value " +   value.name);
		    	   $scope['submit_button_'+value._id]=true;  
		       });
       } );   
		    
 
     }//  var refresh = function() {
     refresh();
    // console.log("contacts.js contacs " + $scope.contacts.length);
     

     //add new contact and save it.
     $scope.addContact = function() {
    	 
    	 //set the submitted to true to use angularjs validations
    	 $scope.submitted=true;
    	 
    	 console.log("name " + $scope.newname+' phone '+$scope.newphone);
    	 
    	 if(($scope.newname !==null ) && ($scope.newphone !==null)){
    		 $scope.contact = new Contact();
        	 $scope.contact.name=$scope.newname;
        	 $scope.contact.phone=$scope.newphone;
        	 
        	  Contact.save( $scope.contact,function(data){
        			//hide the add contact form 
        	       $scope.addcontact_button_clicked = true;
        	       
        	       //unset ng-hide the add new contact button.
        	       $scope.addcontact_button=false;
        	    
        	       console.log("save data " + data);
        	       //show contact list
        	       refresh();
        	  },
        	  function(error){
        		  console.log("save error " + error['data'].toSource());
        		  
        		 var str=JSON.stringify(error);
        		console.log("save error " + str);
        	  }
        	  );
    		 
    	 }// if(($scope.newname !=='undefined' ) && ($scope.newphone !=='undefined')){
    	
    	};// $scope.add = function() {
    	
   
	
    $scope.addFields = function (id) {
    	
    	//before clicking the edit button, the fields are undefind. 
        if(typeof $scope.fields === 'undefined') {
        	$scope.fields = [];
        }
       
        //get a contact by ID
        Contact.get({id:id}, function(result) {
		    $scope.contact = result;
		    //console.log('User name is ',$scope.contact.name);
		    
		    // console.log(" selected_contact.name " +   selected_contact.toSource() );
		      
		    //add input fields after the edit button is clicked.
		    $scope.fields.push({'form_name': id, 'name': $scope.contact.name, 'phone': $scope.contact.phone, 'id':$scope.contact.id });
		    
		    //ng-hide  to hide contact name and phone when the edit button is clicked.
		    $scope['hide_content_'+id] = true;
		    
		    //enable the submit button
		    $scope['submit_button_'+id]=false;  
          
		    //disable the edit button
		    $scope.clicked=true;
		  
		});	
      
        
      }//  $scope.addFields = function (id,form) {
      
    //submit button in the form
      $scope.submit = function(id,name,phone){
    	  
    	 
    	//ng-hide  to unhide contact name and phone after submitting the form.
		 $scope['hide_content_'+id] = false;  
    	//enable the edit button
		$scope.clicked=false;
		
		//remove the input fields for editing.
		$scope.fields = [];
		
		//update the phone/name from the form.
		$scope.entry = Contact.get({id:id}, function() {
	         
			//name shouldn't be empty
			if(name==''){
				
				//alert('Name is required field');
				 refresh();
			}
			else{
				
				//assign new data for update.
				$scope.entry.name= name;
				$scope.entry.phone= phone;
				$scope.entry.$update(function(){
		        	  
		        //console.log('Updating user with id ');
					
				//show all contacts	
		        refresh();
		       });
			}//else
			
	     });//$scope.entry = Contact.get({id:id}, function() {
		
	
      };// $scope.submit = function(){
      
      //cancel button in the form.
      $scope.cancel = function(id){
    	  
    	//ng-hide  to unhide contact name and phone after submitting the form.
 		 $scope['hide_content_'+id] = false;
 		 
 		//enable the edit button
 		$scope.clicked=false;
 		
    	//remove the input fields for editing.
  		$scope.fields = [];
    	  refresh();
    	  
      };//  $scope.cancel = function(){
      
});

