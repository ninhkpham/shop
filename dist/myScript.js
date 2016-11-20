angular.module('myProject', ['firebase', 'ui.router'])
    .directive('headerDirective', function() {
        return {
            templateUrl: 'my_template/header.html'
        }
    })
    .directive('footerDirective', function() {
        return {
            templateUrl: 'my_template/footer.html'
        }
    })
    .directive('productDirective', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'my_template/product.html'
        };
    }])
    .directive('detailDirective', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'my_template/productdetail.html'
        };
    }])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'my_template/home.html'
            })
            .state('product', {
                url: '/product/:type',
                templateUrl: 'my_template/product.html',
                controller: 'ProductCtrl'
            })
            .state('detail', {
                url: '/detail/:code',
                templateUrl: 'my_template/productdetail.html',
                controller: 'DetailProductCtrl'
            })
            .state('search-product', {
                url: '/search-product/:name',
                templateUrl: 'my_template/productsearch.html',
                controller: 'SearchProductCtrl'
            })
            .state('cart', {
                url: '/cart', // khai báo Url hiển thị
                templateUrl: 'my_template/cartproduct.html'
            })
            .state('img', {
                url: '/img/:img', // khai báo Url hiển thị
                controller: 'ImageCtrl'
            })
    })
    .filter('Paging', function() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        }
    })
    .controller("ProductCtrl", ['$scope', '$firebaseArray', '$stateParams', function($scope, $firebaseArray, $stateParams) {
        var ref = new Firebase("https://finalassignment.firebaseio.com/product");
        var type = $stateParams.type;
        $scope.type = type;
        $scope.data = $firebaseArray(ref.orderByChild('type').equalTo(type));
        $scope.nowPage = 0;
        $scope.sizePage = 8;
        $scope.totalPage = function() {
            return Math.ceil($scope.data.length / $scope.sizePage);
        }

    }])
    .controller("SearchProductCtrl", ['$scope', '$firebaseArray', '$stateParams', function($scope, $firebaseArray, $stateParams) {
        var ref = new Firebase("https://finalassignment.firebaseio.com/product");
        $scope.name = $stateParams.name;
        $scope.data = $firebaseArray(ref);
    }])
    .controller("DetailProductCtrl", ['$scope', '$firebaseArray', '$stateParams', function($scope, $firebaseArray, $stateParams) {
        var ref = new Firebase("https://finalassignment.firebaseio.com/product");
        var code = $stateParams.code;
        $scope.data = $firebaseArray(ref.orderByChild('code').equalTo(code));

    }])
    .controller('homeController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
        $scope.collapsein = function() {
            $('.navbar-collapse').toggleClass('in');
        }
        $scope.numcart = 0;
        $scope.shopcart = [];
        $scope.user = {};
        $scope.delProductItem = function(code) {
            var confirmAlert = confirm("Do you want to delete this product?");
            if (confirmAlert == true) {
                $scope.shopcart.splice($scope.shopcart.indexOf(code), 1);
                $scope.numcart = $scope.numcart - 1;
            }
        };
        $scope.addProductItem = function(code) {
            if ($scope.shopcart.indexOf(code) <= 0) {
                var checkCode = true;
                code.quantity = 1;
                for (var i = 0; i < $scope.shopcart.length; i++) {
                    if (code.code == $scope.shopcart[i].code) {
                        checkCode = false;
                    }
                }
                if (checkCode) {
                    $scope.shopcart.push(code);
                    $scope.numcart = $scope.numcart + 1;
                    window.alert('Added this product into your cart');
                } else {
                    window.alert('This product that contained in your cart');
                }
            }
        };
        $scope.addCartToFirebase = function() {
            var ref = new Firebase("https://finalassignment.firebaseio.com/cart/post");
            $scope.postsRef = $firebaseArray(ref);
            $scope.quantity = $scope.shopcart;
            $scope.user.item = $scope.shopcart;
            var confirmAlert = confirm("Do you want to order these products?");
            if (confirmAlert == true) {
                $scope.postsRef.$add($scope.user);
                $scope.user = {};
                $scope.shopcart = [];
                $scope.numcart = 0;
                window.alert("Thank you to order our products! We will contact to you as soon as possible to confirm your order!");
                // change the path
                //                $location.path('/home');
                //                $scope.location.path();
            }
        };

        $scope.getTotal = function(items) {
            var total = 0;
            angular.forEach(items, function(item) {
                total += (parseInt(item.price) * parseInt(item.quantity));
            });
            return total;
        }
    }]);