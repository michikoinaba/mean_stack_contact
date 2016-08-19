
var app = angular.module('ContactApp', ['ngResource']);


//Create a resource factory to access products table from database 
app.factory('Contact',function($resource) {
return $resource('/api/contacts/:id', { id: '@_id' }, {//adding the endpoint
 update: { // We need to define this method manually as it is not provided with ng-resource
   method: 'PUT'
	 
 },

 // save:  { method: 'POST' },
   // 'index':   { method: 'GET', isArray: true },
   // 'show':    { method: 'GET', isArray: false },
   // 'update':  { method: 'PUT' },
   // 'destroy': { method: 'DELETE' }
	
});
});


//Showing loading indicator on top while data is requested from database
app.directive('editForm',   function ()
{
 return {
     restrict: 'EA',
     scope: true,  // use a child scope that inherits from parent
     replace: true,
     //templateUrl: "js/edit.tmpl.html",
     template: '<h3>Hello World!!</h3>'
     // controllerAs: 'modify'
 };
});

