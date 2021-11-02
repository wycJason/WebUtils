import { normalizeDataSourceOptions } from '../../../data/data_source/utils';
import { DataSource } from '../../../data/data_source/data_source';
export var getValueExpr = resource => resource.valueExpr || 'id';
export var getDisplayExpr = resource => resource.displayExpr || 'text';
export var getFieldExpr = resource => resource.fieldExpr || resource.field;
export var getWrappedDataSource = dataSource => {
  if (dataSource instanceof DataSource) {
    return dataSource;
  }

  var result = {
    store: normalizeDataSourceOptions(dataSource).store,
    pageSize: 0
  };

  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }

  return new DataSource(result);
};