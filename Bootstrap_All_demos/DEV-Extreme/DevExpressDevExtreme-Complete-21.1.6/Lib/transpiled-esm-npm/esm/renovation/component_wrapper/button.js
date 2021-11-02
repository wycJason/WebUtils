import ValidationEngine from "../../ui/validation_engine";
import Component from "./component";
export default class Button extends Component {
  _init() {
    super._init();

    this._addAction("onSubmit", this._getSubmitAction());
  }

  getProps() {
    var props = super.getProps();
    props.validationGroup = this._validationGroupConfig;
    return props;
  }

  _getSubmitAction() {
    var needValidate = true;
    var validationStatus = "valid";
    return this._createAction(_ref => {
      var {
        event,
        submitInput
      } = _ref;

      if (needValidate) {
        var validationGroup = this._validationGroupConfig;

        if (validationGroup) {
          var {
            complete,
            status
          } = validationGroup.validate();
          validationStatus = status;

          if (status === "pending") {
            needValidate = false;
            this.option("disabled", true);
            complete.then(_ref2 => {
              var {
                status
              } = _ref2;
              needValidate = true;
              this.option("disabled", false);
              validationStatus = status;
              validationStatus === "valid" && submitInput.click();
            });
          }
        }
      }

      validationStatus !== "valid" && event.preventDefault();
      event.stopPropagation();
    });
  }

  get _validationGroupConfig() {
    return ValidationEngine.getGroupConfig(this._findGroup());
  }

  _findGroup() {
    var $element = this.$element();
    return this.option("validationGroup") || ValidationEngine.findGroup($element, this._modelByElement($element));
  }

}