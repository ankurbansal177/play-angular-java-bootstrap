angular.module("getbookmarks.services", ["ngResource"]).
    factory('Story', function ($resource) {
        var Story = $resource('/api/v1/stories/:storyId', {storyId: '@id'});
        Story.prototype.isNew = function(){
            return (typeof(this.id) === 'undefined');
        }
        return Story;
    });

angular.module("getbookmarks", ["getbookmarks.services"]).
    config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'homePage.html', controller: mainData})
            .when('/about', {templateUrl: 'about.html', controller: mainData})
            .when('/blog', {templateUrl: 'blog.html', controller: mainData})
            .when('/contact', {templateUrl: 'contact.html', controller: mainData})
            .when('/stories/new', {templateUrl: '/assets/views/stories/create.html', controller: StoryCreateController})
            .when('/stories/:storyId', {templateUrl: '/assets/views/stories/detail.html', controller: StoryDetailController});
    });

function StoryListController($scope, Story) {
    $scope.stories = Story.query();
    
}

function StoryCreateController($scope, $routeParams, $location, Story) {

    $scope.story = new Story();

    $scope.save = function () {
    	$scope.story.$save(function (story, headers) {
    		toastr.success("Submitted New Story");
            $location.path('/');
        });
    };
}


function StoryDetailController($scope, $routeParams, $location, Story) {
    var storyId = $routeParams.storyId;

    $scope.story = Story.get({storyId: storyId});

}
function mainData($scope){
    $scope.venture = "Smartstudy"
    $scope.companyName = "Angular Technologies PVT. LTD."
    $scope.companyEmail= "angulartechnologies@gmail.com"
    $scope.contactNumber = "+918469049314"
    $scope.companyAddress = "Chandigarh, India"
}
function SuperCtrl($scope){
    $scope.venture = "Smartstudy"
    $scope.companyName = "Angular Technologies PVT. LTD."
    $scope.companyEmail= "angulartechnologies@gmail.com"
    $scope.contactNumber = "+918469049314"
    $scope.companyAddress = "Chandigarh, India"
}
