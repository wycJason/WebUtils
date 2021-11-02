import _extends from "@babel/runtime/helpers/esm/extends";
import { InfernoComponent, InfernoEffect } from "@devextreme/vdom";
import { findDOMfromVNode } from "inferno";
import $ from "../../core/renderer";
import domAdapter from "../../core/dom_adapter";
import { getPublicElement } from "../../core/element";
import { removeDifferentElements } from "./utils";
import Number from "../../core/polyfills/number";
export class TemplateWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.renderTemplate = this.renderTemplate.bind(this);
  }

  renderTemplate() {
    var node = findDOMfromVNode(this.$LI, true);

    if (node) {
      var {
        parentNode
      } = node;

      if (parentNode) {
        var _this$props$model;

        parentNode.removeChild(node);
        var $parent = $(parentNode);
        var $children = $parent.contents();
        var {
          data,
          index
        } = (_this$props$model = this.props.model) !== null && _this$props$model !== void 0 ? _this$props$model : {
          data: {}
        };
        Object.keys(data).forEach(name => {
          if (data[name] && domAdapter.isNode(data[name])) {
            data[name] = getPublicElement($(data[name]));
          }
        });
        this.props.template.render(_extends({
          container: getPublicElement($parent),
          transclude: this.props.transclude
        }, !this.props.transclude ? {
          model: data
        } : {}, !this.props.transclude && Number.isFinite(index) ? {
          index
        } : {}));
        return () => {
          removeDifferentElements($children, $parent.contents());
          parentNode.appendChild(node);
        };
      }
    }

    return undefined;
  }

  createEffects() {
    return [new InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
  }

  updateEffects() {
    this._effects[0].update([this.props.template, this.props.model]);
  }

  componentWillUnmount() {}

  render() {
    return null;
  }

}