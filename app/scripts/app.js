
'use strict';

angular.module('thebestdoctorsfriend', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'

                    },
                    'content': {
                        templateUrl : 'views/home.html',
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html'                 
                    }
                }
            })

            // route for the patientslist page
            .state('app.patientslist', {
                url:'patientslist',
                views: {
                    'content@': {
                        templateUrl : 'views/patientslist.html',
                        controller  : 'patientslistController'                 
                    }
                }
            })

            // route for the editpatients page
            .state('app.patientdetail', {
                url:'patientslist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/patientdetail.html',
                        controller  : 'patientdetailController'                 
                    }
                }
            })
            
            // route for the addpatients page
            .state('app.addpatients', {
                url:'addpatients',
                views: {
                    'content@': {
                        templateUrl : 'views/addpatients.html',
                        controller  : 'addpatientsController'                
                    }
                }
            })

            // route for the editpatients page
            .state('app.editpatients', {
                url:'editpatients',
                views: {
                    'content@': {
                        templateUrl : 'views/editpatients.html',
                        controller  : 'editpatientsController'                 
                    }
                }
            })

            // route for the deletepatients page
            .state('app.deletepatients', {
                url:'deletepatients',
                views: {
                    'content@': {
                        templateUrl : 'views/deletepatients.html',
                        controller  : 'deletepatientsController'                 
                    }
                }
            })

            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html'                  
                    }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;