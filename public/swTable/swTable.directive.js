(function () {
    'use strict';

    angular.module('swTable',[])
        .directive('swTable',swTable);

    function swTable() {
        return {
            restrict: 'E',
            scope: {
                fields:"=",
                pageType:"="
            },
            templateUrl:"swTable/swTable.html",
            controller: function(Data) {
                var vm = this;
                
                vm.tableData = Data.tableData;
                vm.pageLocation = Data.pageLocation;
                vm.toggleFav = Data.toggleItem;
                vm.isFav = Data.isInStore;
                vm.loadData = Data.loadData;
            
                vm.loadData(vm.pageType);
            },
            controllerAs:'ctrl',
            bindToController: true
        };
    }

})();

