﻿/// <reference path="../../bower_components/ag-grid/dist/lib/components/aggridng1.d.ts" />
/// <reference path="../../bower_components/ag-grid/main.d.ts" />
import {initialiseAgGridWithAngular1} from '../../bower_components/ag-grid/dist/lib/components/aggridng1'

module TestGridApp{

    initialiseAgGridWithAngular1(angular);
    angular.module('TestGridApp', ['agGrid']);


    interface IGridDefinitions {
        gridOptions: ag.grid.GridOptions;
    }

    

    export class GridController implements IGridDefinitions {

        gridOptions: ag.grid.GridOptions;

        static $inject = [];

        constructor() {
            this.gridOptions = {
                columnDefs: [
                    { headerName: "Make", field: "make" },
                    { headerName: "Model", field: "model" },
                    { headerName: "Price", field: "price" }
                ]
                , rowData: [
                    { make: "Toyota", model: "Celica", price: 35000 },
                    { make: "Ford", model: "Mondeo", price: 32000 },
                    { make: "Porsche", model: "Boxter", price: 72000 }
                ]
                
            }
        }
    }

    angular.module('TestGridApp')
        .controller('TestGridApp.gridController', GridController);


}