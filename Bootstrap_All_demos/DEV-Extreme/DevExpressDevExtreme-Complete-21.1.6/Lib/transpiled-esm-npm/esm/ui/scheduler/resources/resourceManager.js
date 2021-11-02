import { wrapToArray, inArray } from '../../../core/utils/array';
import { grep } from '../../../core/utils/common';
import { isDefined } from '../../../core/utils/type';
import { deepExtendArraySafe } from '../../../core/utils/object';
import { each, map } from '../../../core/utils/iterator';
import { extend } from '../../../core/utils/extend';
import query from '../../../data/query';
import { compileGetter, compileSetter } from '../../../core/utils/data';
import { when, Deferred } from '../../../core/utils/deferred';
import { AgendaResourceProcessor } from './agendaResourceProcessor';
import { getDisplayExpr, getFieldExpr, getValueExpr, getWrappedDataSource } from './utils';
export class ResourceManager {
  constructor(resources) {
    this._resourceLoader = {};
    this.agendaProcessor = new AgendaResourceProcessor();
    this.setResources(resources);
  }

  _mapResourceData(resource, data) {
    var valueGetter = compileGetter(getValueExpr(resource));
    var displayGetter = compileGetter(getDisplayExpr(resource));
    return map(data, function (item) {
      var result = {
        id: valueGetter(item),
        text: displayGetter(item)
      };

      if (item.color) {
        result.color = item.color;
      }

      return result;
    });
  }

  _isMultipleResource(resourceField) {
    var result = false;
    each(this.getResources(), function (_, resource) {
      var field = getFieldExpr(resource);

      if (field === resourceField) {
        result = resource.allowMultiple;
        return false;
      }
    }.bind(this));
    return result;
  }

  getDataAccessors(field, type) {
    var result = null;
    each(this._dataAccessors[type], function (accessorName, accessors) {
      if (field === accessorName) {
        result = accessors;
        return false;
      }
    });
    return result;
  }

  setResources(resources) {
    this._resources = resources;
    this._dataAccessors = {
      getter: {},
      setter: {}
    };
    this._resourceFields = map(resources || [], function (resource) {
      var field = getFieldExpr(resource);
      this._dataAccessors.getter[field] = compileGetter(field);
      this._dataAccessors.setter[field] = compileSetter(field);
      return field;
    }.bind(this));
    this.agendaProcessor.initializeState(resources);
  }

  getResources() {
    return this._resources || [];
  }

  getResourcesData() {
    return this._resourcesData || [];
  }

  getEditors() {
    var result = [];
    var that = this;
    each(this.getResources(), function (i, resource) {
      var field = getFieldExpr(resource);

      var currentResourceItems = that._getResourceDataByField(field);

      result.push({
        editorOptions: {
          dataSource: currentResourceItems.length ? currentResourceItems : getWrappedDataSource(resource.dataSource),
          displayExpr: getDisplayExpr(resource),
          valueExpr: getValueExpr(resource)
        },
        dataField: field,
        editorType: resource.allowMultiple ? 'dxTagBox' : 'dxSelectBox',
        label: {
          text: resource.label || field
        }
      });
    });
    return result;
  }

  getResourceDataByValue(field, value) {
    var that = this;
    var result = new Deferred();
    each(this.getResources(), function (_, resource) {
      var resourceField = getFieldExpr(resource);

      if (resourceField === field) {
        var dataSource = getWrappedDataSource(resource.dataSource);
        var valueExpr = getValueExpr(resource);

        if (!that._resourceLoader[field]) {
          that._resourceLoader[field] = dataSource.load();
        }

        that._resourceLoader[field].done(function (data) {
          var filteredData = query(data).filter(valueExpr, value).toArray();
          delete that._resourceLoader[field];
          result.resolve(filteredData[0]);
        }).fail(function () {
          delete that._resourceLoader[field];
          result.reject();
        });

        return false;
      }
    });
    return result.promise();
  }

  setResourcesToItem(itemData, resources) {
    var resourcesSetter = this._dataAccessors.setter;

    for (var name in resources) {
      if (Object.prototype.hasOwnProperty.call(resources, name)) {
        var resourceData = resources[name];
        resourcesSetter[name](itemData, this._isMultipleResource(name) ? wrapToArray(resourceData) : resourceData);
      }
    }
  }

  getResourcesFromItem(itemData, wrapOnlyMultipleResources) {
    var result = null;

    if (!isDefined(wrapOnlyMultipleResources)) {
      wrapOnlyMultipleResources = false;
    }

    this._resourceFields.forEach(field => {
      each(itemData, (fieldName, fieldValue) => {
        var tempObject = {};
        tempObject[fieldName] = fieldValue;
        var resourceData = this.getDataAccessors(field, 'getter')(tempObject);

        if (isDefined(resourceData)) {
          if (!result) {
            result = {};
          }

          if (resourceData.length === 1) {
            resourceData = resourceData[0];
          }

          if (!wrapOnlyMultipleResources || wrapOnlyMultipleResources && this._isMultipleResource(field)) {
            this.getDataAccessors(field, 'setter')(tempObject, wrapToArray(resourceData));
          } else {
            this.getDataAccessors(field, 'setter')(tempObject, resourceData);
          }

          extend(result, tempObject);
          return true;
        }
      });
    });

    return result;
  }

  loadResources(groups) {
    var result = new Deferred();
    var that = this;
    var deferreds = [];
    each(this.getResourcesByFields(groups), function (i, resource) {
      var deferred = new Deferred();
      var field = getFieldExpr(resource);
      deferreds.push(deferred);
      getWrappedDataSource(resource.dataSource).load().done(function (data) {
        deferred.resolve({
          name: field,
          items: that._mapResourceData(resource, data),
          data: data
        });
      }).fail(function () {
        deferred.reject();
      });
    });

    if (!deferreds.length) {
      that._resourcesData = [];
      return result.resolve([]);
    }

    when.apply(null, deferreds).done(function () {
      var data = Array.prototype.slice.call(arguments);

      var mapFunction = function mapFunction(obj) {
        return {
          name: obj.name,
          items: obj.items,
          data: obj.data
        };
      };

      var isValidResources = that._isValidResourcesForGrouping(data);

      that._resourcesData = isValidResources ? data : [];
      result.resolve(isValidResources ? data.map(mapFunction) : []);
    }).fail(function () {
      result.reject();
    });
    return result.promise();
  }

  getResourcesByFields(fields) {
    return grep(this.getResources(), function (resource) {
      var field = getFieldExpr(resource);
      return inArray(field, fields) > -1;
    }.bind(this));
  }

  getResourceByField(field) {
    return this.getResourcesByFields([field])[0] || {};
  }

  getResourceColor(field, value) {
    var valueExpr = this.getResourceByField(field).valueExpr || 'id';
    var valueGetter = compileGetter(valueExpr);
    var colorExpr = this.getResourceByField(field).colorExpr || 'color';
    var colorGetter = compileGetter(colorExpr);
    var result = new Deferred();

    var resourceData = this._getResourceDataByField(field);

    var resourceDataLength = resourceData.length;
    var color;

    if (resourceDataLength) {
      for (var i = 0; i < resourceDataLength; i++) {
        if (valueGetter(resourceData[i]) === value) {
          color = colorGetter(resourceData[i]);
          break;
        }
      }

      result.resolve(color);
    } else {
      this.getResourceDataByValue(field, value).done(function (resourceData) {
        if (resourceData) {
          color = colorGetter(resourceData);
        }

        result.resolve(color);
      }).fail(function () {
        result.reject();
      });
    }

    return result.promise();
  }

  getResourceForPainting(groups) {
    var resources = this.getResources();
    var result;
    each(resources, function (index, resource) {
      if (resource.useColorAsDefault) {
        result = resource;
        return false;
      }
    });

    if (!result) {
      if (Array.isArray(groups) && groups.length) {
        resources = this.getResourcesByFields(groups);
      }

      result = resources[resources.length - 1];
    }

    return result;
  }

  createResourcesTree(groups) {
    var leafIndex = 0;

    function make(group, groupIndex, result, parent) {
      result = result || [];

      for (var i = 0; i < group.items.length; i++) {
        var currentGroupItem = group.items[i];
        var resultItem = {
          name: group.name,
          value: currentGroupItem.id,
          title: currentGroupItem.text,
          data: group.data && group.data[i],
          children: [],
          parent: parent ? parent : null
        };
        result.push(resultItem);
        var nextGroupIndex = groupIndex + 1;

        if (groups[nextGroupIndex]) {
          make.call(this, groups[nextGroupIndex], nextGroupIndex, resultItem.children, resultItem);
        }

        if (!resultItem.children.length) {
          resultItem.leafIndex = leafIndex;
          leafIndex++;
        }
      }

      return result;
    }

    return make.call(this, groups[0], 0);
  }

  _hasGroupItem(appointmentResources, groupName, itemValue) {
    var group = this.getDataAccessors(groupName, 'getter')(appointmentResources);

    if (group) {
      if (inArray(itemValue, group) > -1) {
        return true;
      }
    }

    return false;
  }

  _createPlainResourcesByAppointmentAsync(rawAppointment) {
    return this.agendaProcessor.createListAsync(rawAppointment);
  }

  _getResourceDataByField(fieldName) {
    var loadedResources = this.getResourcesData();
    var currentResourceData = [];

    for (var i = 0, resourceCount = loadedResources.length; i < resourceCount; i++) {
      if (loadedResources[i].name === fieldName) {
        currentResourceData = loadedResources[i].data;
        break;
      }
    }

    return currentResourceData;
  }

  getResourceTreeLeaves(tree, appointmentResources, result) {
    result = result || [];

    for (var i = 0; i < tree.length; i++) {
      if (!this._hasGroupItem(appointmentResources, tree[i].name, tree[i].value)) {
        continue;
      }

      if (isDefined(tree[i].leafIndex)) {
        result.push(tree[i].leafIndex);
      }

      if (tree[i].children) {
        this.getResourceTreeLeaves(tree[i].children, appointmentResources, result);
      }
    }

    return result;
  }

  groupAppointmentsByResources(appointments, resources) {
    var tree = this.createResourcesTree(resources);
    var result = {};
    each(appointments, function (_, appointment) {
      var appointmentResources = this.getResourcesFromItem(appointment);
      var treeLeaves = this.getResourceTreeLeaves(tree, appointmentResources);

      for (var i = 0; i < treeLeaves.length; i++) {
        if (!result[treeLeaves[i]]) {
          result[treeLeaves[i]] = [];
        } // NOTE: check appointment before pushing


        result[treeLeaves[i]].push(deepExtendArraySafe({}, appointment, true));
      }
    }.bind(this));
    return result;
  }

  reduceResourcesTree(tree, existingAppointments, _result) {
    _result = _result ? _result.children : [];
    var that = this;
    tree.forEach(function (node, index) {
      var ok = false;
      var resourceName = node.name;
      var resourceValue = node.value;
      var resourceTitle = node.title;
      var resourceData = node.data;
      var resourceGetter = that.getDataAccessors(resourceName, 'getter');
      existingAppointments.forEach(function (appointment) {
        if (!ok) {
          var resourceFromAppointment = resourceGetter(appointment);

          if (Array.isArray(resourceFromAppointment)) {
            if (resourceFromAppointment.indexOf(resourceValue) > -1) {
              _result.push({
                name: resourceName,
                value: resourceValue,
                title: resourceTitle,
                data: resourceData,
                children: []
              });

              ok = true;
            }
          } else {
            if (resourceFromAppointment === resourceValue) {
              _result.push({
                name: resourceName,
                value: resourceValue,
                title: resourceTitle,
                data: resourceData,
                children: []
              });

              ok = true;
            }
          }
        }
      });

      if (ok && node.children && node.children.length) {
        that.reduceResourcesTree(node.children, existingAppointments, _result[index]);
      }
    });
    return _result;
  }

  getResourcesDataByGroups(groups) {
    var resourcesData = this.getResourcesData();

    if (!groups || !groups.length) {
      return resourcesData;
    }

    var fieldNames = {};
    var currentResourcesData = [];
    groups.forEach(group => {
      each(group, (name, value) => fieldNames[name] = value);
    });
    var resourceData = resourcesData.filter(_ref => {
      var {
        name
      } = _ref;
      return isDefined(fieldNames[name]);
    });
    resourceData.forEach(data => currentResourcesData.push(extend({}, data)));
    currentResourcesData.forEach(currentResource => {
      var {
        items,
        data,
        name: resourceName
      } = currentResource;
      var resource = this.getResourceByField(resourceName);
      var valueExpr = getValueExpr(resource);
      var filteredItems = [];
      var filteredData = [];
      groups.filter(group => isDefined(group[resourceName])).forEach(group => {
        each(group, (name, value) => {
          if (!filteredItems.filter(item => item.id === value && item[valueExpr] === name).length) {
            var currentItems = items.filter(item => item.id === value);
            var currentData = data.filter(item => item[valueExpr] === value);
            filteredItems.push(...currentItems);
            filteredData.push(...currentData);
          }
        });
      });
      currentResource.items = filteredItems;
      currentResource.data = filteredData;
    });
    return currentResourcesData;
  }

  _isValidResourcesForGrouping(resources) {
    var result = resources.reduce((isValidResources, currentResource) => {
      return isValidResources && currentResource.items.length > 0;
    }, true);
    return result;
  }

}