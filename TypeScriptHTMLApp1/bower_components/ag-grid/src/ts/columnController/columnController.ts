import {Utils as _} from '../utils';
import {Constants as constants} from '../constants';
import {ColumnGroup} from "../entities/columnGroup";
import {Column} from "../entities/column";
import {ColDef} from "../entities/colDef";
import {ColumnGroupChild} from "../entities/columnGroupChild";
import {GridOptionsWrapper} from "../gridOptionsWrapper";
import {Grid} from "../grid";
import {SelectionRendererFactory} from "../selectionRendererFactory";
import {ExpressionService} from "../expressionService";
import {BalancedColumnTreeBuilder} from "./balancedColumnTreeBuilder";
import {DisplayedGroupCreator} from "./displayedGroupCreator";
import {AutoWidthCalculator} from "../rendering/autoWidthCalculator";
import {OriginalColumnGroupChild} from "../entities/originalColumnGroupChild";
import {ValueService} from "../valueService";
import {EventService} from "../eventService";
import {ColumnUtils} from "./columnUtils";
import {Logger} from "../logger";
import {LoggerFactory} from "../logger";
import {Events} from "../events";
import {ColumnChangeEvent} from "../columnChangeEvent";
import {OriginalColumnGroup} from "../entities/originalColumnGroup";
import {GroupInstanceIdCreator} from "./groupInstanceIdCreator";
import {defaultGroupComparator} from "../functions";
import {Bean} from "../context/context";
import {Qualifier} from "../context/context";
import {GridCore} from "../gridCore";
import {Autowired} from "../context/context";
import {GridPanel} from "../gridPanel/gridPanel";
import {AbstractColDef} from "../entities/colDef";
import {PostConstruct} from "../context/context";
import {Context} from "../context/context";

@Bean('columnApi')
export class ColumnApi {

    @Autowired('columnController') private _columnController: ColumnController;

    public sizeColumnsToFit(gridWidth: any): void { this._columnController.sizeColumnsToFit(gridWidth); }
    public setColumnGroupOpened(group: ColumnGroup|string, newValue: boolean, instanceId?: number): void { this._columnController.setColumnGroupOpened(group, newValue, instanceId); }
    public getColumnGroup(name: string, instanceId?: number): ColumnGroup { return this._columnController.getColumnGroup(name, instanceId); }
    public getDisplayNameForCol(column: any): string { return this._columnController.getDisplayNameForCol(column); }
    public getColumn(key: any): Column { return this._columnController.getColumn(key); }
    public setColumnState(columnState: any): boolean { return this._columnController.setColumnState(columnState); }
    public getColumnState(): [any] { return this._columnController.getColumnState(); }
    public resetColumnState(): void { this._columnController.resetColumnState(); }
    public isPinning(): boolean { return this._columnController.isPinningLeft() || this._columnController.isPinningRight(); }
    public isPinningLeft(): boolean { return this._columnController.isPinningLeft(); }
    public isPinningRight(): boolean { return this._columnController.isPinningRight(); }
    public getDisplayedColAfter(col: Column): Column { return this._columnController.getDisplayedColAfter(col); }
    public getDisplayedColBefore(col: Column): Column { return this._columnController.getDisplayedColBefore(col); }
    public setColumnVisible(key: Column|ColDef|String, visible: boolean): void { this._columnController.setColumnVisible(key, visible); }
    public setColumnsVisible(keys: (Column|ColDef|String)[], visible: boolean): void { this._columnController.setColumnsVisible(keys, visible); }
    public setColumnPinned(key: Column|ColDef|String, pinned: string): void { this._columnController.setColumnPinned(key, pinned); }
    public setColumnsPinned(keys: (Column|ColDef|String)[], pinned: string): void { this._columnController.setColumnsPinned(keys, pinned); }

    public getAllColumns(): Column[] { return this._columnController.getAllColumns(); }
    public getDisplayedLeftColumns(): Column[] { return this._columnController.getDisplayedLeftColumns(); }
    public getDisplayedCenterColumns(): Column[] { return this._columnController.getDisplayedCenterColumns(); }
    public getDisplayedRightColumns(): Column[] { return this._columnController.getDisplayedRightColumns(); }
    public getAllDisplayedColumns(): Column[] { return this._columnController.getAllDisplayedColumns(); }
    public getRowGroupColumns(): Column[] { return this._columnController.getRowGroupColumns(); }
    public getValueColumns(): Column[] { return this._columnController.getValueColumns(); }
    public moveColumn(fromIndex: number, toIndex: number): void { this._columnController.moveColumnByIndex(fromIndex, toIndex); }
    public moveRowGroupColumn(fromIndex: number, toIndex: number): void { this._columnController.moveRowGroupColumn(fromIndex, toIndex); }
    public setColumnAggFunction(column: Column, aggFunc: string): void { this._columnController.setColumnAggFunction(column, aggFunc); }
    public setColumnWidth(key: Column | string | ColDef, newWidth: number, finished: boolean = true): void { this._columnController.setColumnWidth(key, newWidth, finished); }
    public removeValueColumn(column: Column): void { this._columnController.removeValueColumn(column); }
    public addValueColumn(column: Column): void { this._columnController.addValueColumn(column); }
    public setRowGroupColumns(colKeys: (Column|ColDef|String)[]): void { this._columnController.setRowGroupColumns(colKeys); }
    public removeRowGroupColumn(colKey: Column|ColDef|String): void { this._columnController.removeRowGroupColumn(colKey); }
    public removeRowGroupColumns(colKeys: (Column|ColDef|String)[]): void { this._columnController.removeRowGroupColumns(colKeys); }
    public addRowGroupColumn(colKey: Column|ColDef|String): void { this._columnController.addRowGroupColumn(colKey); }
    public addRowGroupColumns(colKeys: (Column|ColDef|String)[]): void { this._columnController.addRowGroupColumns(colKeys); }
    public getLeftDisplayedColumnGroups(): ColumnGroupChild[] { return this._columnController.getLeftDisplayedColumnGroups(); }
    public getCenterDisplayedColumnGroups(): ColumnGroupChild[] { return this._columnController.getCenterDisplayedColumnGroups(); }
    public getRightDisplayedColumnGroups(): ColumnGroupChild[] { return this._columnController.getRightDisplayedColumnGroups(); }
    public getAllDisplayedColumnGroups(): ColumnGroupChild[] { return this._columnController.getAllDisplayedColumnGroups(); }
    public autoSizeColumn(key: Column|ColDef|String): void {return this._columnController.autoSizeColumn(key); }
    public autoSizeColumns(keys: (Column|ColDef|String)[]): void {return this._columnController.autoSizeColumns(keys); }

    public columnGroupOpened(group: ColumnGroup|string, newValue: boolean): void {
        console.error('ag-Grid: columnGroupOpened no longer exists, use setColumnGroupOpened');
        this.setColumnGroupOpened(group, newValue);
    }
    public hideColumns(colIds: any, hide: any): void {
        console.error('ag-Grid: hideColumns is deprecated, use setColumnsVisible');
        this._columnController.setColumnsVisible(colIds, !hide);
    }
    public hideColumn(colId: any, hide: any): void {
        console.error('ag-Grid: hideColumn is deprecated, use setColumnVisible');
        this._columnController.setColumnVisible(colId, !hide);
    }

    public setState(columnState: any): boolean {
        console.error('ag-Grid: setState is deprecated, use setColumnState');
        return this.setColumnState(columnState);
    }
    public getState(): [any] {
        console.error('ag-Grid: hideColumn is getState, use getColumnState');
        return this.getColumnState();
    }
    public resetState(): void {
        console.error('ag-Grid: hideColumn is resetState, use resetColumnState');
        this.resetColumnState();
    }

}

@Bean('columnController')
export class ColumnController {

    @Autowired('gridOptionsWrapper') private gridOptionsWrapper: GridOptionsWrapper;
    @Autowired('selectionRendererFactory') private selectionRendererFactory: SelectionRendererFactory;
    @Autowired('expressionService') private expressionService: ExpressionService;
    @Autowired('balancedColumnTreeBuilder') private balancedColumnTreeBuilder: BalancedColumnTreeBuilder;
    @Autowired('displayedGroupCreator') private displayedGroupCreator: DisplayedGroupCreator;
    @Autowired('autoWidthCalculator') private autoWidthCalculator: AutoWidthCalculator;
    @Autowired('valueService') private valueColumns: Column[];
    @Autowired('eventService') private eventService: EventService;
    @Autowired('columnUtils') private columnUtils: ColumnUtils;
    @Autowired('gridPanel') private gridPanel: GridPanel;
    @Autowired('context') private context: Context;

    // these are the columns provided by the client. this doesn't change, even if the
    // order or state of the columns and groups change. it will only change if the client
    // provides a new set of column definitions. otherwise this tree is used to build up
    // the groups for displaying.
    private originalBalancedTree: OriginalColumnGroupChild[];
    // these are every single column, regardless of whether they are shown on
    // screen or not (cols can be missing if visible=false or the group they are
    // in is closed). basically it's the leaf level nodes of the tree above (originalBalancedTree)
    private allColumns: Column[]; // every column available

    // these are the columns actually shown on the screen. used by the header renderer,
    // as header needs to know about column groups and the tree structure.
    private displayedLeftColumnTree: ColumnGroupChild[];
    private displayedRightColumnTree: ColumnGroupChild[];
    private displayedCentreColumnTree: ColumnGroupChild[];

    // these are the lists used by the rowRenderer to render nodes. almost the leaf nodes of the above
    // displayed trees, however it also takes into account if the groups are open or not.
    private displayedLeftColumns: Column[] = [];
    private displayedRightColumns: Column[] = [];
    private displayedCenterColumns: Column[] = [];

    private headerRowCount = 0;
    private rowGroupColumns: Column[];
    private groupAutoColumn: Column;
    private groupAutoColumnActive: boolean;
    private valueService: ValueService;

    private ready = false;
    private logger: Logger;

    @PostConstruct
    public init(): void {
        if (this.gridOptionsWrapper.getColumnDefs()) {
            this.setColumnDefs(this.gridOptionsWrapper.getColumnDefs());
        }
    }

    private setBeans(@Qualifier('loggerFactory') loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.create('ColumnController');
    }

    private setFirstRightAndLastLeftPinned(): void {
        var lastLeft = this.displayedLeftColumns ? this.displayedLeftColumns[this.displayedLeftColumns.length - 1] : null;
        var firstRight = this.displayedRightColumns ? this.displayedRightColumns[0] : null;

        this.allColumns.forEach( (column: Column) => {
            column.setLastLeftPinned(column === lastLeft);
            column.setFirstRightPinned(column === firstRight);
        } );
    }

    public autoSizeColumns(keys: (Column|ColDef|String)[]): void {
        this.actionOnColumns(keys, (column: Column)=> {
            var requiredWidth = this.autoWidthCalculator.getPreferredWidthForColumn(column);
            if (requiredWidth>0) {
                var newWidth = this.normaliseColumnWidth(column, requiredWidth);
                column.setActualWidth(newWidth);
            }
        }, ()=> {
            return new ColumnChangeEvent(Events.EVENT_COLUMN_RESIZED).withFinished(true);
        });
    }

    public autoSizeColumn(key: Column|String|ColDef): void {
        this.autoSizeColumns([key]);
    }

    public autoSizeAllColumns(): void {
        var allDisplayedColumns = this.getAllDisplayedColumns();
        this.autoSizeColumns(allDisplayedColumns);
    }

    private getColumnsFromTree(rootColumns: OriginalColumnGroupChild[]): Column[] {
        var result: Column[] = [];
        recursiveFindColumns(rootColumns);
        return result;

        function recursiveFindColumns(childColumns: OriginalColumnGroupChild[]): void {
            for (var i = 0; i<childColumns.length; i++) {
                var child = childColumns[i];
                if (child instanceof Column) {
                    result.push(<Column>child);
                } else if (child instanceof OriginalColumnGroup) {
                    recursiveFindColumns((<OriginalColumnGroup>child).getChildren());
                }
            }
        }
    }

    public getAllDisplayedColumnGroups(): ColumnGroupChild[] {
        if (this.displayedLeftColumnTree && this.displayedRightColumnTree && this.displayedCentreColumnTree) {
            return this.displayedLeftColumnTree
                .concat(this.displayedCentreColumnTree)
                .concat(this.displayedRightColumnTree);
        } else {
            return null;
        }
    }

    public getOriginalColumnTree(): OriginalColumnGroupChild[] {
        return this.originalBalancedTree;
    }

    // + gridPanel -> for resizing the body and setting top margin
    public getHeaderRowCount(): number {
        return this.headerRowCount;
    }

    // + headerRenderer -> setting pinned body width
    public getLeftDisplayedColumnGroups(): ColumnGroupChild[] {
        return this.displayedLeftColumnTree;
    }
    // + headerRenderer -> setting pinned body width
    public getRightDisplayedColumnGroups(): ColumnGroupChild[] {
        return this.displayedRightColumnTree;
    }
    // + headerRenderer -> setting pinned body width
    public getCenterDisplayedColumnGroups(): ColumnGroupChild[] {
        return this.displayedCentreColumnTree;
    }

    public getDisplayedColumnGroups(type: string): ColumnGroupChild[] {
        switch (type) {
            case Column.PINNED_LEFT: return this.getLeftDisplayedColumnGroups();
            case Column.PINNED_RIGHT: return this.getRightDisplayedColumnGroups();
            default: return this.getCenterDisplayedColumnGroups();
        }
    }

    // gridPanel -> ensureColumnVisible
    public isColumnDisplayed(column: Column): boolean {
        return this.getAllDisplayedColumns().indexOf(column) >= 0;
    }

    // + csvCreator
    public getAllDisplayedColumns(): Column[] {
        // order we add the arrays together is important, so the result
        // has the columns left to right, as they appear on the screen.
        return this.displayedLeftColumns
            .concat(this.displayedCenterColumns)
            .concat(this.displayedRightColumns);
    }

    // used by:
    // + angularGrid -> setting pinned body width
    // todo: this needs to be cached
    public getPinnedLeftContainerWidth() {
        return this.getWithOfColsInList(this.displayedLeftColumns);
    }
    // todo: this needs to be cached
    public getPinnedRightContainerWidth() {
        return this.getWithOfColsInList(this.displayedRightColumns);
    }

    public addRowGroupColumns(keys: (Column|ColDef|String)[]): void {
        keys.forEach( (key)=> {
            var column = this.getColumn(key);
            if (column) {
                this.rowGroupColumns.push(column);
            }
        });

        // because we could be taking out columns, the displayed
        // columns may differ, so need to work out all the columns again.
        // this is why why don't use 'actionOnColumns', as we need to do
        // this before we fire the event
        this.updateModel();

        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_ROW_GROUP_CHANGE);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_ROW_GROUP_CHANGE, event);
    }

    public setRowGroupColumns(keys: (Column|ColDef|String)[]): void {
        this.rowGroupColumns.length = 0;
        this.addRowGroupColumns(keys);
    }

    public addRowGroupColumn(key: Column|ColDef|String): void {
        this.addRowGroupColumns([key]);
    }

    public removeRowGroupColumns(keys: (Column|ColDef|String)[]): void {
        keys.forEach( (key)=> {
            var column = this.getColumn(key);
            if (column) {
                _.removeFromArray(this.rowGroupColumns, column);
            }
        });

        this.updateModel();
        
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_ROW_GROUP_CHANGE);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_ROW_GROUP_CHANGE, event);
    }
    
    public removeRowGroupColumn(key: Column|ColDef|String): void {
        this.removeRowGroupColumns([key]);
    }

    public addValueColumn(column: Column): void {
        if (this.allColumns.indexOf(column) < 0) {
            console.warn('not a valid column: ' + column);
            return;
        }
        if (this.valueColumns.indexOf(column) >= 0) {
            console.warn('column is already a value column');
            return;
        }
        if (!column.getAggFunc()) { // defualt to SUM if aggFunc is missing
            column.setAggFunc(Column.AGG_SUM);
        }
        this.valueColumns.push(column);
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_VALUE_CHANGE);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_VALUE_CHANGE, event);
    }

    public removeValueColumn(column: Column): void {
        if (this.valueColumns.indexOf(column) < 0) {
            console.warn('column not a value');
            return;
        }
        _.removeFromArray(this.valueColumns, column);
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_VALUE_CHANGE);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_VALUE_CHANGE, event);
    }

    // returns the width we can set to this col, taking into consideration min and max widths
    private normaliseColumnWidth(column: Column, newWidth: number): number {
        if (newWidth < column.getMinWidth()) {
            newWidth = column.getMinWidth();
        }

        if (column.isGreaterThanMax(newWidth)) {
            newWidth = column.getMaxWidth();
        }

        return newWidth;
    }

    public setColumnWidth(key: Column | string | ColDef, newWidth: number, finished: boolean): void {
        var column = this.getColumn(key);
        if (!column) {
            return;
        }

        newWidth = this.normaliseColumnWidth(column, newWidth);

        var widthChanged = column.getActualWidth() !== newWidth;

        if (widthChanged) {
            column.setActualWidth(newWidth);
            this.setLeftValues();
        }

        // check for change first, to avoid unnecessary firing of events
        // however we always fire 'finished' events. this is important
        // when groups are resized, as if the group is changing slowly,
        // eg 1 pixel at a time, then each change will fire change events
        // in all the columns in the group, but only one with get the pixel.
        if (finished || widthChanged) {
            var event = new ColumnChangeEvent(Events.EVENT_COLUMN_RESIZED).withColumn(column).withFinished(finished);
            this.eventService.dispatchEvent(Events.EVENT_COLUMN_RESIZED, event);
        }
    }

    public setColumnAggFunction(column: Column, aggFunc: string): void {
        column.setAggFunc(aggFunc);
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_VALUE_CHANGE);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_VALUE_CHANGE, event);
    }

    public moveRowGroupColumn(fromIndex: number, toIndex: number): void {
        var column = this.rowGroupColumns[fromIndex];
        this.rowGroupColumns.splice(fromIndex, 1);
        this.rowGroupColumns.splice(toIndex, 0, column);
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_ROW_GROUP_CHANGE);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_ROW_GROUP_CHANGE, event);
    }

    public getPathForColumn(column: Column): ColumnGroup[] {
        return this.columnUtils.getPathForColumn(column, this.getAllDisplayedColumnGroups());
    }

    public moveColumns(keys: (Column|ColDef|String)[], toIndex: number): void {
        this.gridPanel.turnOnAnimationForABit();
        this.actionOnColumns(keys, (column: Column)=> {
            var fromIndex = this.allColumns.indexOf(column);
            this.allColumns.splice(fromIndex, 1);
            this.allColumns.splice(toIndex, 0, column);
        }, ()=> {
            return new ColumnChangeEvent(Events.EVENT_COLUMN_MOVED).withToIndex(toIndex);
        });
        this.updateModel();
    }

    public moveColumn(key: string|Column|ColDef, toIndex: number) {
        this.moveColumns([key], toIndex);
    }

    public moveColumnByIndex(fromIndex: number, toIndex: number): void {
        var column = this.allColumns[fromIndex];
        this.moveColumn(column, toIndex);
    }

    // used by:
    // + angularGrid -> for setting body width
    // + rowController -> setting main row widths (when inserting and resizing)
    // need to cache this
    public getBodyContainerWidth(): number {
        var result = this.getWithOfColsInList(this.displayedCenterColumns);
        return result;
    }

    // + rowController
    public getValueColumns(): Column[] {
        return this.valueColumns;
    }

    // + toolPanel
    public getRowGroupColumns(): Column[] {
        return this.rowGroupColumns ? this.rowGroupColumns : [];
    }

    public isColumnRowGrouped(column: Column): boolean {
        return this.rowGroupColumns.indexOf(column) >= 0;
    }

    // + rowController -> while inserting rows
    public getDisplayedCenterColumns(): Column[] {
        return this.displayedCenterColumns.slice(0);
    }
    // + rowController -> while inserting rows
    public getDisplayedLeftColumns(): Column[] {
        return this.displayedLeftColumns.slice(0);
    }
    public getDisplayedRightColumns(): Column[] {
        return this.displayedRightColumns.slice(0);
    }

    public getDisplayedColumns(type: string): Column[] {
        switch (type) {
            case Column.PINNED_LEFT: return this.getDisplayedLeftColumns();
            case Column.PINNED_RIGHT: return this.getDisplayedRightColumns();
            default: return this.getDisplayedCenterColumns();
        }
    }

    // used by:
    // + inMemoryRowController -> sorting, building quick filter text
    // + headerRenderer -> sorting (clearing icon)
    public getAllColumns(): Column[] {
        return this.allColumns;
    }

    public isEmpty(): boolean {
        return _.missingOrEmpty(this.allColumns);
    }

    public isRowGroupEmpty(): boolean {
        return _.missingOrEmpty(this.rowGroupColumns);
    }

    public setColumnVisible(key: Column|ColDef|String, visible: boolean): void {
        this.setColumnsVisible([key], visible);
    }

    public setColumnsVisible(keys: (Column|ColDef|String)[], visible: boolean): void {
        this.gridPanel.turnOnAnimationForABit();
        this.actionOnColumns(keys, (column: Column)=> {
            column.setVisible(visible);
        }, ()=> {
            return new ColumnChangeEvent(Events.EVENT_COLUMN_VISIBLE).withVisible(visible);
        });
    }

    public setColumnPinned(key: Column|ColDef|String, pinned: string|boolean): void {
        this.setColumnsPinned([key], pinned);
    }

    public setColumnsPinned(keys: (Column|ColDef|String)[], pinned: string|boolean): void {
        this.gridPanel.turnOnAnimationForABit();
        var actualPinned: string;
        if (pinned === true || pinned === Column.PINNED_LEFT) {
            actualPinned = Column.PINNED_LEFT;
        } else if (pinned === Column.PINNED_RIGHT) {
            actualPinned = Column.PINNED_RIGHT;
        } else {
            actualPinned = null;
        }

        this.actionOnColumns(keys, (column: Column)=> {
            column.setPinned(actualPinned);
        }, ()=> {
            return new ColumnChangeEvent(Events.EVENT_COLUMN_PINNED).withPinned(actualPinned);
        });
    }

    // does an action on a set of columns. provides common functionality for looking up the
    // columns based on key, getting a list of effected columns, and then updated the event
    // with either one column (if it was just one col) or a list of columns
    private actionOnColumns(keys: (Column|ColDef|String)[],
                            action: (column:Column)=>void,
                            createEvent: ()=>ColumnChangeEvent): void {

        if (!keys || keys.length===0) { return; }

        var updatedColumns: Column[] = [];

        keys.forEach( (key: Column|ColDef|String)=> {
            var column = this.getColumn(key);
            if (!column) {return;}
            action(column);
            updatedColumns.push(column);
        });

        if (updatedColumns.length===0) {return;}

        this.updateModel();
        var event = createEvent();

        event.withColumns(updatedColumns);
        if (updatedColumns.length===1) {
            event.withColumn(updatedColumns[0]);
        }

        this.eventService.dispatchEvent(event.getType(), event);
    }

    public getDisplayedColBefore(col: any): Column {
        var allDisplayedColumns = this.getAllDisplayedColumns();
        var oldIndex = allDisplayedColumns.indexOf(col);
        if (oldIndex > 0) {
            return allDisplayedColumns[oldIndex - 1];
        } else {
            return null;
        }
    }

    // used by:
    // + rowRenderer -> for navigation
    public getDisplayedColAfter(col: Column): Column {
        var allDisplayedColumns = this.getAllDisplayedColumns();
        var oldIndex = allDisplayedColumns.indexOf(col);
        if (oldIndex < (allDisplayedColumns.length - 1)) {
            return allDisplayedColumns[oldIndex + 1];
        } else {
            return null;
        }
    }

    public isPinningLeft(): boolean {
        return this.displayedLeftColumns.length > 0;
    }

    public isPinningRight(): boolean {
        return this.displayedRightColumns.length > 0;
    }

    public getAllColumnsIncludingAuto(): Column[] {
        var result = this.allColumns.slice(0);
        if (this.groupAutoColumnActive) {
            result.push(this.groupAutoColumn);
        }
        return result;
    }

    public getColumnState(): [any] {
        if (!this.allColumns || this.allColumns.length < 0) {
            return <any>[];
        }
        var result = <any>[];
        for (var i = 0; i < this.allColumns.length; i++) {
            var column = this.allColumns[i];
            var rowGroupIndex = this.rowGroupColumns.indexOf(column);
            var resultItem = {
                colId: column.getColId(),
                hide: !column.isVisible(),
                aggFunc: column.getAggFunc() ? column.getAggFunc() : null,
                width: column.getActualWidth(),
                pinned: column.getPinned(),
                rowGroupIndex: rowGroupIndex >= 0 ? rowGroupIndex : null
            };
            result.push(resultItem);
        }
        return result;
    }

    public resetColumnState(): void {
        // we can't use 'allColumns' as the order might of messed up, so get the original ordered list
        var originalColumns = this.allColumns = this.getColumnsFromTree(this.originalBalancedTree);
        var state: any[] = [];

        if (originalColumns) {
            originalColumns.forEach( (column) => {
                state.push({
                    colId: column.getColId(),
                    aggFunc: column.getColDef().aggFunc,
                    hide: column.getColDef().hide,
                    pinned: column.getColDef().pinned,
                    rowGroupIndex: column.getColDef().rowGroupIndex,
                    width: column.getColDef().width
                });
            });
        }
        this.setColumnState(state);
    }

    public setColumnState(columnState: any[]): boolean {
        var oldColumnList = this.allColumns;
        this.allColumns = [];
        this.rowGroupColumns = [];
        this.valueColumns = [];

        var success = true;

        if (columnState) {
            columnState.forEach( (stateItem: any)=> {
                var oldColumn: Column = _.find(oldColumnList, 'colId', stateItem.colId);
                if (!oldColumn) {
                    console.warn('ag-grid: column ' + stateItem.colId + ' not found');
                    success = false;
                    return;
                }
                // following ensures we are left with boolean true or false, eg converts (null, undefined, 0) all to true
                oldColumn.setVisible(!stateItem.hide);
                // sets pinned to 'left' or 'right'
                oldColumn.setPinned(stateItem.pinned);
                // if width provided and valid, use it, otherwise stick with the old width
                if (stateItem.width >= this.gridOptionsWrapper.getMinColWidth()) {
                    oldColumn.setActualWidth(stateItem.width);
                }
                // accept agg func only if valid
                var aggFuncValid = [Column.AGG_MIN, Column.AGG_MAX, Column.AGG_SUM, Column.AGG_FIRST, Column.AGG_LAST].indexOf(stateItem.aggFunc) >= 0;
                if (aggFuncValid) {
                    oldColumn.setAggFunc(stateItem.aggFunc);
                    this.valueColumns.push(oldColumn);
                } else {
                    oldColumn.setAggFunc(null);
                }
                // if rowGroup
                if (typeof stateItem.rowGroupIndex === 'number' && stateItem.rowGroupIndex >= 0) {
                    this.rowGroupColumns.push(oldColumn);
                }
                this.allColumns.push(oldColumn);
                oldColumnList.splice(oldColumnList.indexOf(oldColumn), 1);
            });
        }

        // anything left over, we got no data for, so add in the column as non-value, non-rowGroup and hidden
        oldColumnList.forEach( (oldColumn: Column) => {
            oldColumn.setVisible(false);
            oldColumn.setAggFunc(null);
            oldColumn.setPinned(null);
            this.allColumns.push(oldColumn);
        });

        // sort the row group columns
        this.rowGroupColumns.sort(function (colA: Column, colB: Column): number {
            var rowGroupIndexA = -1;
            var rowGroupIndexB = -1;
            for (var i = 0; i<columnState.length; i++) {
                var state = columnState[i];
                if (state.colId === colA.getColId()) {
                    rowGroupIndexA = state.rowGroupIndex;
                }
                if (state.colId === colB.getColId()) {
                    rowGroupIndexB = state.rowGroupIndex;
                }
            }
            return rowGroupIndexA - rowGroupIndexB;
        });

        this.updateModel();

        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_EVERYTHING_CHANGED);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_EVERYTHING_CHANGED, event);

        return success;
    }

    public getColumns(keys: any[]): Column[] {
        var foundColumns: Column[] = [];
        if (keys) {
            keys.forEach( (key: any) => {
                var column = this.getColumn(key);
                if (column) {
                    foundColumns.push(column);
                }
            });
        }
        return foundColumns;
    }

    public getColumnWithValidation(key: string|ColDef|Column): Column {
        var column = this.getColumn(key);
        if (!column) {
            console.warn('ag-Grid: could not find column ' + column);
        }
        return column;
    }

    public getColumn(key: string|ColDef|Column): Column {
        if (!key) {return null;}

        for (var i = 0; i < this.allColumns.length; i++) {
            if (colMatches(this.allColumns[i])) {
                return this.allColumns[i];
            }
        }

        if (this.groupAutoColumnActive && colMatches(this.groupAutoColumn)) {
            return this.groupAutoColumn;
        }

        function colMatches(column: Column): boolean {
            var columnMatches = column === key;
            var colDefMatches = column.getColDef() === key;
            var idMatches = column.getColId() === key;
            return columnMatches || colDefMatches || idMatches;
        }

        return null;
    }

    public getDisplayNameForCol(column: any): string {

        var colDef = column.colDef;
        var headerValueGetter = colDef.headerValueGetter;

        if (headerValueGetter) {
            var params = {
                colDef: colDef,
                api: this.gridOptionsWrapper.getApi(),
                context: this.gridOptionsWrapper.getContext()
            };

            if (typeof headerValueGetter === 'function') {
                // valueGetter is a function, so just call it
                return headerValueGetter(params);
            } else if (typeof headerValueGetter === 'string') {
                // valueGetter is an expression, so execute the expression
                return this.expressionService.evaluate(headerValueGetter, params);
            } else {
                console.warn('ag-grid: headerValueGetter must be a function or a string');
            }

        } else if (colDef.displayName) {
            console.warn("ag-grid: Found displayName " + colDef.displayName + ", please use headerName instead, displayName is deprecated.");
            return colDef.displayName;
        } else {
            return colDef.headerName;
        }
    }

    // returns the group with matching colId and instanceId. If instanceId is missing,
    // matches only on the colId.
    public getColumnGroup(colId: string|ColumnGroup, instanceId?: number): ColumnGroup {

        if (!colId) {return null;}

        if (colId instanceof ColumnGroup) {
            return colId;
        }

        var allColumnGroups = this.getAllDisplayedColumnGroups();
        var checkInstanceId = typeof instanceId === 'number';
        var result: ColumnGroup = null;

        this.columnUtils.deptFirstAllColumnTreeSearch(allColumnGroups, (child: ColumnGroupChild)=> {
            if (child instanceof ColumnGroup) {
                var columnGroup = <ColumnGroup> child;
                var matched: boolean;
                if (checkInstanceId) {
                    matched = colId === columnGroup.getGroupId() && instanceId === columnGroup.getInstanceId();
                } else {
                    matched = colId === columnGroup.getGroupId();
                }
                if (matched) {
                    result = columnGroup;
                }
            }
        });

        return result;
    }

    public getColumnDept(): number {

        var dept = 0;
        getDept(this.getAllDisplayedColumnGroups(), 1);
        return dept;

        function getDept(children: ColumnGroupChild[], currentDept: number) {
            if (dept < currentDept) {
                dept = currentDept;
            }
            if (dept > currentDept) {
                return;
            }
            children.forEach( (child: ColumnGroupChild) => {
                if (child instanceof ColumnGroup) {
                    var columnGroup = <ColumnGroup> child;
                    getDept(columnGroup.getChildren(), currentDept+1);
                }
            });
        }
    }

    public setColumnDefs(columnDefs: AbstractColDef[]) {
        var balancedTreeResult = this.balancedColumnTreeBuilder.createBalancedColumnGroups(columnDefs);
        this.originalBalancedTree = balancedTreeResult.balancedTree;
        this.headerRowCount = balancedTreeResult.treeDept + 1;

        this.allColumns = this.getColumnsFromTree(this.originalBalancedTree);
        this.extractRowGroupColumns();
        this.createValueColumns();
        this.updateModel();
        this.ready = true;
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_EVERYTHING_CHANGED);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_EVERYTHING_CHANGED, event);
        this.eventService.dispatchEvent(Events.EVENT_NEW_COLUMNS_LOADED);
    }

    public isReady(): boolean {
        return this.ready;
    }

    private extractRowGroupColumns(): void {
        this.rowGroupColumns = [];
        // pull out the columns
        this.allColumns.forEach( (column: Column) => {
            if (typeof column.getColDef().rowGroupIndex === 'number') {
                this.rowGroupColumns.push(column);
            }
        });
        // then sort them
        this.rowGroupColumns.sort(function (colA: Column, colB: Column): number {
            return colA.getColDef().rowGroupIndex - colB.getColDef().rowGroupIndex;
        });
    }

    // called by headerRenderer - when a header is opened or closed
    public setColumnGroupOpened(passedGroup: ColumnGroup|string, newValue: boolean, instanceId?:number): void {
        var groupToUse: ColumnGroup = this.getColumnGroup(passedGroup, instanceId);
        if (!groupToUse) { return; }
        this.logger.log('columnGroupOpened(' + groupToUse.getGroupId() + ',' + newValue + ')');
        groupToUse.setExpanded(newValue);
        this.gridPanel.turnOnAnimationForABit();
        this.updateGroupsAndDisplayedColumns();
        var event = new ColumnChangeEvent(Events.EVENT_COLUMN_GROUP_OPENED).withColumnGroup(groupToUse);
        this.eventService.dispatchEvent(Events.EVENT_COLUMN_GROUP_OPENED, event);
    }

    // used by updateModel
    private getColumnGroupState(): any {
        var groupState: any = {};
        this.columnUtils.deptFirstDisplayedColumnTreeSearch(this.getAllDisplayedColumnGroups(), (child: ColumnGroupChild) => {
            if (child instanceof ColumnGroup) {
                var columnGroup = <ColumnGroup> child;
                var key = columnGroup.getGroupId();
                // if more than one instance of the group, we only record the state of the first item
                if (!groupState.hasOwnProperty(key)) {
                    groupState[key] = columnGroup.isExpanded();
                }
            }
        });
        return groupState;
    }

    // used by updateModel
    private setColumnGroupState(groupState: any): any {
        this.columnUtils.deptFirstDisplayedColumnTreeSearch(this.getAllDisplayedColumnGroups(), (child: ColumnGroupChild) => {
            if (child instanceof ColumnGroup) {
                var columnGroup = <ColumnGroup> child;
                var key = columnGroup.getGroupId();
                var shouldExpandGroup = groupState[key]===true && columnGroup.isExpandable();
                if (shouldExpandGroup) {
                    columnGroup.setExpanded(true);
                }
            }
        });
    }

    private updateModel() {
        // save opened / closed state
        var oldGroupState = this.getColumnGroupState();

        // following 3 methods are only called from here
        this.createGroupAutoColumn();
        var visibleColumns = this.updateVisibleColumns();
        this.buildAllGroups(visibleColumns);

        // restore opened / closed state
        this.setColumnGroupState(oldGroupState);

        // this is also called when a group is opened or closed
        this.updateGroupsAndDisplayedColumns();

        this.setFirstRightAndLastLeftPinned();
    }

    private updateGroupsAndDisplayedColumns() {
        this.updateGroups();
        this.updateDisplayedColumnsFromGroups();
    }

    private updateDisplayedColumnsFromGroups() {
        this.addToDisplayedColumns(this.displayedLeftColumnTree, this.displayedLeftColumns);
        this.addToDisplayedColumns(this.displayedRightColumnTree, this.displayedRightColumns);
        this.addToDisplayedColumns(this.displayedCentreColumnTree, this.displayedCenterColumns);
        this.setLeftValues();
    }

    private setLeftValues(): void {
        // go through each list of displayed columns
        var allColumns = this.allColumns.slice(0);
        [this.displayedLeftColumns,this.displayedRightColumns,this.displayedCenterColumns].forEach( columns => {
            var left = 0;
            columns.forEach( column => {
                column.setLeft(left);
                left += column.getActualWidth();
                _.removeFromArray(allColumns, column);
            });
        });
        // items left in allColumns are columns not displayed, so remove the left position. this is
        // important for the rows, as if a col is made visible, then taken out, then made visible again,
        // we don't want the animation of the cell floating in from the old position, whatever that was.
        allColumns.forEach( (column: Column) => {
            column.setLeft(null);
        });
    }

    private addToDisplayedColumns(displayedColumnTree: ColumnGroupChild[], displayedColumns: Column[]): void {
        displayedColumns.length = 0;
        this.columnUtils.deptFirstDisplayedColumnTreeSearch(displayedColumnTree, (child: ColumnGroupChild)=> {
            if (child instanceof Column) {
                displayedColumns.push(child);
            }
        });
    }

    // called from api
    public sizeColumnsToFit(gridWidth: any): void {
        // avoid divide by zero
        var allDisplayedColumns = this.getAllDisplayedColumns();

        if (gridWidth <= 0 || allDisplayedColumns.length === 0) {
            return;
        }

        var colsToNotSpread = _.filter(allDisplayedColumns, (column: Column): boolean => {
            return column.getColDef().suppressSizeToFit === true;
        });
        var colsToSpread = _.filter(allDisplayedColumns, (column: Column): boolean => {
            return column.getColDef().suppressSizeToFit !== true;
        });

        // make a copy of the cols that are going to be resized
        var colsToFireEventFor = colsToSpread.slice(0);

        var finishedResizing = false;
        while (!finishedResizing) {
            finishedResizing = true;
            var availablePixels = gridWidth - getTotalWidth(colsToNotSpread);
            if (availablePixels <= 0) {
                // no width, set everything to minimum
                colsToSpread.forEach( (column: Column) => {
                    column.setMinimum();
                });
            } else {
                var scale = availablePixels / getTotalWidth(colsToSpread);
                // we set the pixels for the last col based on what's left, as otherwise
                // we could be a pixel or two short or extra because of rounding errors.
                var pixelsForLastCol = availablePixels;
                // backwards through loop, as we are removing items as we go
                for (var i = colsToSpread.length - 1; i >= 0; i--) {
                    var column = colsToSpread[i];
                    var newWidth = Math.round(column.getActualWidth() * scale);
                    if (newWidth < column.getMinWidth()) {
                        column.setMinimum();
                        moveToNotSpread(column);
                        finishedResizing = false;
                    } else if (column.isGreaterThanMax(newWidth)) {
                        column.setActualWidth(column.getMaxWidth());
                        moveToNotSpread(column);
                        finishedResizing = false;
                    } else {
                        var onLastCol = i === 0;
                        if (onLastCol) {
                            column.setActualWidth(pixelsForLastCol);
                        } else {
                            pixelsForLastCol -= newWidth;
                            column.setActualWidth(newWidth);
                        }
                    }
                }
            }
        }

        this.setLeftValues();

        // widths set, refresh the gui
        colsToFireEventFor.forEach( (column: Column) => {
            var event = new ColumnChangeEvent(Events.EVENT_COLUMN_RESIZED).withColumn(column);
            this.eventService.dispatchEvent(Events.EVENT_COLUMN_RESIZED, event);
        });

        function moveToNotSpread(column: Column) {
            _.removeFromArray(colsToSpread, column);
            colsToNotSpread.push(column);
        }

        function getTotalWidth(columns: Column[]): number {
            var result = 0;
            for (var i = 0; i<columns.length; i++) {
                result += columns[i].getActualWidth();
            }
            return result;
        }
    }

    private buildAllGroups(visibleColumns: Column[]) {
        var leftVisibleColumns = _.filter(visibleColumns, (column)=> {
            return column.getPinned() === 'left';
        });

        var rightVisibleColumns = _.filter(visibleColumns, (column)=> {
            return column.getPinned() === 'right';
        });

        var centerVisibleColumns = _.filter(visibleColumns, (column)=> {
            return column.getPinned() !== 'left' && column.getPinned() !== 'right';
        });

        //// if pinning left, then group column is also always pinned left. if not
        //// pinning, then group column is either pinned left or center.
        //if (this.groupAutoColumn) {
        //    if (leftVisibleColumns.length > 0 || this.groupAutoColumn.isPinnedLeft()) {
        //        leftVisibleColumns.unshift(this.groupAutoColumn);
        //    } else {
        //        centerVisibleColumns.unshift(this.groupAutoColumn);
        //    }
        //}

        var groupInstanceIdCreator = new GroupInstanceIdCreator();
        this.displayedLeftColumnTree = this.displayedGroupCreator.createDisplayedGroups(
            leftVisibleColumns, this.originalBalancedTree, groupInstanceIdCreator);
        this.displayedRightColumnTree = this.displayedGroupCreator.createDisplayedGroups(
            rightVisibleColumns, this.originalBalancedTree, groupInstanceIdCreator);
        this.displayedCentreColumnTree = this.displayedGroupCreator.createDisplayedGroups(
            centerVisibleColumns, this.originalBalancedTree, groupInstanceIdCreator);
    }

    private updateGroups(): void {
        var allGroups = this.getAllDisplayedColumnGroups();
        this.columnUtils.deptFirstAllColumnTreeSearch(allGroups, (child: ColumnGroupChild)=> {
            if (child instanceof ColumnGroup) {
                var group = <ColumnGroup> child;
                group.calculateDisplayedColumns();
            }
        });
    }

    private createGroupAutoColumn(): void {

        // see if we need to insert the default grouping column
        var needAGroupColumn = this.rowGroupColumns.length > 0
            && !this.gridOptionsWrapper.isGroupSuppressAutoColumn()
            && !this.gridOptionsWrapper.isGroupUseEntireRow()
            && !this.gridOptionsWrapper.isGroupSuppressRow();

        this.groupAutoColumnActive = needAGroupColumn;

        // lazy create group auto-column
        if (needAGroupColumn && !this.groupAutoColumn) {
            // if one provided by user, use it, otherwise create one
            var autoColDef = this.gridOptionsWrapper.getGroupColumnDef();
            if (!autoColDef) {
                var localeTextFunc = this.gridOptionsWrapper.getLocaleTextFunc();
                autoColDef = {
                    headerName: localeTextFunc('group', 'Group'),
                    comparator: defaultGroupComparator,
                    valueGetter: (params: any) => {
                        if (params.node.group) {
                            return params.node.key;
                        } else if (params.data && params.colDef.field) {
                            return params.data[params.colDef.field];
                        } else {
                            return null;
                        }
                    },
                    suppressAggregation: true,
                    suppressRowGroup: true,
                    cellRenderer: 'group'
                };
            }
            // we never allow moving the group column
            autoColDef.suppressMovable = true;

            var colId = 'ag-Grid-AutoColumn';
            this.groupAutoColumn = new Column(autoColDef, colId);
            this.context.wireBean(this.groupAutoColumn);
        }
    }

    private updateVisibleColumns(): Column[] {
        var visibleColumns = _.filter(this.allColumns, column => column.isVisible() );

        if (this.groupAutoColumnActive) {
            visibleColumns.unshift(this.groupAutoColumn);
        }

        return visibleColumns;
    }

    private createValueColumns(): void {
        this.valueColumns = [];

        // override with columns that have the aggFunc specified explicitly
        for (var i = 0; i < this.allColumns.length; i++) {
            var column = this.allColumns[i];
            if (column.getColDef().aggFunc) {
                column.setAggFunc(column.getColDef().aggFunc);
                this.valueColumns.push(column);
            }
        }
    }

    private getWithOfColsInList(columnList: Column[]) {
        var result = 0;
        for (var i = 0; i<columnList.length; i++) {
            result += columnList[i].getActualWidth();
        }
        return result;
    }
}