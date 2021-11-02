import _extends from "@babel/runtime/helpers/esm/extends";
import Component from "./component";
export default class HeaderPanel extends Component {
  _setOptionsByReference() {
    super._setOptionsByReference();

    this._optionsByReference = _extends({}, this._optionsByReference, {
      dateHeaderData: true
    });
  }

}