System.register(["./rowRenderer", "../gridPanel/gridPanel", "../context/context"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var rowRenderer_1, gridPanel_1, context_2, context_3;
    var AutoWidthCalculator;
    return {
        setters:[
            function (rowRenderer_1_1) {
                rowRenderer_1 = rowRenderer_1_1;
            },
            function (gridPanel_1_1) {
                gridPanel_1 = gridPanel_1_1;
            },
            function (context_2_1) {
                context_2 = context_2_1;
                context_3 = context_2_1;
            }],
        execute: function() {
            let AutoWidthCalculator = class AutoWidthCalculator {
                // this is the trick: we create a dummy container and clone all the cells
                // into the dummy, then check the dummy's width. then destroy the dummy
                // as we don't need it any more.
                // drawback: only the cells visible on the screen are considered
                getPreferredWidthForColumn(column) {
                    var eDummyContainer = document.createElement('span');
                    // position fixed, so it isn't restricted to the boundaries of the parent
                    eDummyContainer.style.position = 'fixed';
                    // we put the dummy into the body container, so it will inherit all the
                    // css styles that the real cells are inheriting
                    var eBodyContainer = this.gridPanel.getBodyContainer();
                    eBodyContainer.appendChild(eDummyContainer);
                    // get all the cells that are currently displayed (this only brings back
                    // rendered cells, rows not rendered due to row visualisation will not be here)
                    var eOriginalCells = this.rowRenderer.getAllCellsForColumn(column);
                    eOriginalCells.forEach((eCell, index) => {
                        // make a deep clone of the cell
                        var eCellClone = eCell.cloneNode(true);
                        // the original has a fixed width, we remove this to allow the natural width based on content
                        eCellClone.style.width = '';
                        // the original has position = absolute, we need to remove this so it's positioned normally
                        eCellClone.style.position = 'static';
                        eCellClone.style.left = '';
                        // we put the cell into a containing div, as otherwise the cells would just line up
                        // on the same line, standard flow layout, by putting them into divs, they are laid
                        // out one per line
                        var eCloneParent = document.createElement('div');
                        // table-row, so that each cell is on a row. i also tried display='block', but this
                        // didn't work in IE
                        eCloneParent.style.display = 'table-row';
                        // the twig on the branch, the branch on the tree, the tree in the hole,
                        // the hole in the bog, the bog in the clone, the clone in the parent,
                        // the parent in the dummy, and the dummy down in the vall-e-ooo, OOOOOOOOO! Oh row the rattling bog....
                        eCloneParent.appendChild(eCellClone);
                        eDummyContainer.appendChild(eCloneParent);
                    });
                    // at this point, all the clones are lined up vertically with natural widths. the dummy
                    // container will have a width wide enough just to fit the largest.
                    var dummyContainerWidth = eDummyContainer.offsetWidth;
                    // we are finished with the dummy container, so get rid of it
                    eBodyContainer.removeChild(eDummyContainer);
                    // we add 4 as I found without it, the gui still put '...' after some of the texts
                    return dummyContainerWidth + 4;
                }
            };
            __decorate([
                context_3.Autowired('rowRenderer'), 
                __metadata('design:type', rowRenderer_1.RowRenderer)
            ], AutoWidthCalculator.prototype, "rowRenderer", void 0);
            __decorate([
                context_3.Autowired('gridPanel'), 
                __metadata('design:type', gridPanel_1.GridPanel)
            ], AutoWidthCalculator.prototype, "gridPanel", void 0);
            AutoWidthCalculator = __decorate([
                context_2.Bean('autoWidthCalculator'), 
                __metadata('design:paramtypes', [])
            ], AutoWidthCalculator);
            exports_1("AutoWidthCalculator", AutoWidthCalculator);
        }
    }
});
//# sourceMappingURL=autoWidthCalculator.js.map