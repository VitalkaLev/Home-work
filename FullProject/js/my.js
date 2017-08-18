//NgRoute

var app = angular.module('app', ['ngRoute']);

//Забираєм %2F 
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/template/home.html'
        })
        .when('/tasklist', {
            templateUrl: '/template/taskList.html'
        })
        .when('/chat', {
            templateUrl: '/template/chat.html'
        })
        .otherwise({
            redirectTo: '/'
        });

});

//Контроллер авторизації
app.controller("defaultCtrl", function () {
    this.addNewUser = function (userDetails) {
        this.message = userDetails.name + " (" + userDetails.email + ") (" + userDetails.agreed + ")";
    }
    this.message = "Ready";
});
//Рандомні записи
var model = {
    user: 'Petro Zhuk'
    , userTask: [{
        name: 'Винести мусор'
        , done: false
    }, {
        name: 'Підготувати практичні'
        , done: false
    },  {
        name: 'NodeJS'
        , done: false
    }, {
        name: 'Python'
        , done: false
    }, {
        name: 'CMS'
        , done: false
    }, {
        name: 'SEO'
        , done: false   
    }]
};

//Контроллер TaskList
app.controller('TaskListCtrl', function ($scope) {
    $scope.data = model;
    $scope.addNewTask = function () {
        $scope.data.userTask.push({
            name: $scope.taskName
            , done: false
        })
        $scope.taskName = '';
    }
    $scope.changeTextStatus = function (done) {
        return done ? 'Done' : 'In Progress';
    }
    $scope.setTextStyle = function (done) {
        return done ? 'color:green' : 'color:red;font-weight:bold';
    }
    $scope.changeModelStatus = function (done, task) {
        if (done) {
            task.done = true;
            console.log('Model status - ', task.done);
        } else {
            task.done = false;
            console.log('Model status - ', task.done);
        }
    }
    $scope.removeTask = function ($index) {
        model.userTask.splice($index, 1);
    }

    $scope.editMode = false;

    $scope.editBlock = function ($index, task) {
        $scope.editMode = true;
        $scope.taskIndex = $index;
        $scope.editValue = task.name;
    }

    $scope.submit = function () {
        model.userTask[$scope.taskIndex].name = $scope.editValue;
        $scope.editMode = false;
    }
});
//Контроллер Чату
app.controller("ChatCtrl", function ($scope) {
    $scope.date = new Date();
    $scope.textField = "";
    $scope.nameField = "Anonim";
    $scope.EnterProfile = function () {
        $scope.nameField = $scope.Name;
    }

    $scope.textiki = [];

    $scope.EnterText = function () {
        $scope.date = new Date();
        $scope.textiki.push({
            date: $scope.date,
            nameField: $scope.nameField,
            textField: $scope.textField
        });
        $scope.textField = "";
    }
});