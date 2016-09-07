
var app = angular.module('ContactApp', [ 'ngAnimate', 'ngSanitize','ui.bootstrap','ngResource']);


//,'ngAnimate', 'ngSanitize',
//Create a resource factory to access products table from database 
app.factory('Contact',['$resource',function($resource) {
return $resource('/api/contacts/:id', { id: '@_id' }, {//adding the endpoint
 update: { // We need to define this method manually as it is not provided with ng-resource
   method: 'PUT'
	 
 },
// 'delete': { method: 'DELETE'  }
 // save:  { method: 'POST' },
   // 'index':   { method: 'GET', isArray: true },
   // 'show':    { method: 'GET', isArray: false },
   // 'update':  { method: 'PUT' },
   // 'destroy': { method: 'DELETE' }
	
});
}]);




