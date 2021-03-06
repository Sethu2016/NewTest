"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var textCellEditor_1 = require("./textCellEditor");
var PopupTextCellEditor = (function (_super) {
    __extends(PopupTextCellEditor, _super);
    function PopupTextCellEditor() {
        _super.apply(this, arguments);
    }
    PopupTextCellEditor.prototype.isPopup = function () {
        return true;
    };
    return PopupTextCellEditor;
}(textCellEditor_1.TextCellEditor));
exports.PopupTextCellEditor = PopupTextCellEditor;
//# sourceMappingURL=popupTextCellEditor.js.map