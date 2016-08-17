(function () {
    'use strict';

    angular
        .module('data.service',[])
        .service('Data', Data);

    function Data($http,$localStorage ) {
        var DataService = this;
        DataService.pageLocation = {};
        DataService.tableData = [];
        DataService.store = $localStorage;
        
        // only init of it's not already in localstorage
        if (!DataService.store.favedItems) {
            DataService.store.favedItems = [];
        }
    
        DataService.isInStore = function(itemUrl) {
            return DataService.store.favedItems.includes(itemUrl);
        };
        
        DataService.storeItem = function(itemUrl) {
            DataService.isInStore(itemUrl) ? '' : DataService.store.favedItems.push(itemUrl);
            console.log('itemUrl added: ', itemUrl);
        };
    
        DataService.removeItem = function(itemUrl) {
            DataService.store.favedItems.splice(DataService.store.favedItems.indexOf(itemUrl),1);
            console.log('itemUrl removed: ', itemUrl);
        };
    
        DataService.toggleItem = function(itemUrl) {
            DataService.isInStore(itemUrl) ? DataService.removeItem(itemUrl):  DataService.storeItem(itemUrl);
            console.log('store operation occured. current items in store:', DataService.store.favedItems);
        };
        
        DataService.parsePageParam = function(url) {
            var pageLocation = url.indexOf('page=');
            var pageNumber;
            if (pageLocation === -1) {
                // if no param was found it's the first page
                pageNumber = 1;
            } else {
                pageNumber = parseInt(url.substring(url.indexOf('page=')+5));
            }
            return pageNumber;
        };
        
        DataService.loadData = function(dataType,page) {
            // removes prev data saved on the service
            DataService.tableData.pop();
            
            return $http({
                url: 'http://swapi.co/api/' + dataType,
                method: 'GET',
                params: {page: page}
            })
                .then(function (response) {
                    DataService.pageLocation.next = response.data.next ? DataService.parsePageParam(response.data.next) : undefined;
                    DataService.pageLocation.prev = response.data.previous ? DataService.parsePageParam(response.data.previous) : undefined;
                    DataService.pageLocation.current =  DataService.pageLocation.next ?  DataService.pageLocation.next - 1 : DataService.pageLocation.prev  + 1;
                    if (!DataService.pageLocation.current) {
                        // default to page 1 if non was found
                        DataService.pageLocation.current = 1;
                    }
                    DataService.tableData.push(response.data.results);
                }).
                catch(function(e){
                    console.log("Error calling swapi API",e);
                });
        };
        

    }

})();

