'use strict';

angular.module('thebestdoctorsfriend')
.controller('addpatientsController', ['$scope', 'patientFactory', function($scope, patientFactory) {
    // create a message to display in our view
    $scope.message = "Add patients!"; 

    $scope.patients = {
        firstName: "",
        lastName: "",
        age: 0,
        gender: "Male",
        phoneNumber: "",
        email: "",
        medicalHistory: "",
        medicalTreatment: "",
        nextAppointment: ""

    }; 

     $scope.sendPatient = function () {

     	patientFactory.save($scope.patients);
        console.log($scope.patients);


        $scope.addPatientsForm.$setPristine();

        $scope.patients = {
        firstName: "",
        lastName: "",
        age: 0,
        gender: "Male",
        phoneNumber: "",
        email: "",
        medicalHistory: "",
        medicalTreatment: "",
        nextAppointment: ""
    }; 
        
    }; 
}])

.controller('patientslistController', ['$scope', 'patientFactory', function ($scope, patientFactory) {

    $scope.showPatientsList = false;
    $scope.message = "Loading ...";

    patientFactory.query(
        function (response) {
            $scope.patients = response;
            $scope.showPatientsList = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });  
}])

.controller('patientdetailController', ['$scope', '$stateParams', '$state', 'patientFactory', function ($scope, $stateParams, $state, patientFactory) {

    $scope.patient = {};
    $scope.showPatient = false;
    $scope.message = "Loading ...";

    $scope.patient = patientFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.patient = response;
                $scope.showPatient = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.deletePatient = function(patientId) {
        console.log('Delete patient', patientId);
        patientFactory.delete({id: patientId});
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('editpatientsController', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = "Edit patients!";    
}])

.controller('deletepatientsController', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = "Delete patients!";    
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])

;