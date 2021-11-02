import FileSystemProviderBase from '../../file_management/provider_base';
import FileSystemItem from '../../file_management/file_system_item';
import ObjectFileSystemProvider from '../../file_management/object_provider';
import RemoteFileSystemProvider from '../../file_management/remote_provider';
import CustomFileSystemProvider from '../../file_management/custom_provider';
import FileSystemError from '../../file_management/error';
import ErrorCode from '../../file_management/error_codes';
import { pathCombine, getEscapedFileName, getPathParts, getFileExtension } from '../../file_management/utils';
import { whenSome } from './ui.file_manager.common';
import { Deferred, when } from '../../core/utils/deferred';
import { find } from '../../core/utils/array';
import { extend } from '../../core/utils/extend';
import { equalByValue } from '../../core/utils/common';
import { isDefined } from '../../core/utils/type';
var DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME = 'Files';
export default class FileItemsController {
  constructor(options) {
    options = options || {};
    this._options = extend({}, options);
    this._isInitialized = false;
    this._dataLoading = false;
    this._dataLoadingDeferred = null;
    this._rootDirectoryInfo = this._createRootDirectoryInfo(options.rootText);
    this._currentDirectoryInfo = this._rootDirectoryInfo;
    this._defaultIconMap = this._createDefaultIconMap();

    this._setSecurityController();

    this._setProvider(options.fileProvider);

    this._initialize();
  }

  _setSecurityController() {
    this._securityController = new FileSecurityController({
      allowedFileExtensions: this._options.allowedFileExtensions,
      maxFileSize: this._options.uploadMaxFileSize
    });

    this._resetState();
  }

  setAllowedFileExtensions(allowedFileExtensions) {
    if (isDefined(allowedFileExtensions)) {
      this._options.allowedFileExtensions = allowedFileExtensions;
    }

    this._setSecurityController();

    this.refresh();
  }

  setUploadOptions(_ref) {
    var {
      maxFileSize,
      chunkSize
    } = _ref;

    if (isDefined(chunkSize)) {
      this._options.uploadChunkSize = chunkSize;
    }

    if (isDefined(maxFileSize)) {
      this._options.uploadMaxFileSize = maxFileSize;

      this._setSecurityController();

      this.refresh();
    }
  }

  _setProvider(fileProvider) {
    this._fileProvider = this._createFileProvider(fileProvider);

    this._resetState();
  }

  updateProvider(fileProvider, currentPath) {
    this._resetCurrentDirectory();

    this._setProvider(fileProvider);

    return this.refresh().then(() => this.setCurrentPath(currentPath));
  }

  _createFileProvider(fileProvider) {
    if (!fileProvider) {
      fileProvider = [];
    }

    if (Array.isArray(fileProvider)) {
      return new ObjectFileSystemProvider({
        data: fileProvider
      });
    }

    if (fileProvider instanceof FileSystemProviderBase) {
      return fileProvider;
    }

    switch (fileProvider.type) {
      case 'remote':
        return new RemoteFileSystemProvider(fileProvider);

      case 'custom':
        return new CustomFileSystemProvider(fileProvider);
    }

    return new ObjectFileSystemProvider(fileProvider);
  }

  setCurrentPath(path) {
    var pathParts = getPathParts(path);
    var rawPath = pathCombine(...pathParts);

    if (this.getCurrentDirectory().fileItem.relativeName === rawPath) {
      return new Deferred().resolve().promise();
    }

    return this._setCurrentDirectoryByPathParts(pathParts);
  }

  setCurrentPathByKeys(pathKeys) {
    if (equalByValue(this.getCurrentDirectory().fileItem.pathKeys, pathKeys, 0, true)) {
      return;
    }

    return this._setCurrentDirectoryByPathParts(pathKeys, true);
  }

  getCurrentPath() {
    var currentPath = '';
    var directory = this.getCurrentDirectory();

    while (directory && !directory.fileItem.isRoot()) {
      var escapedName = getEscapedFileName(directory.fileItem.name);
      currentPath = pathCombine(escapedName, currentPath);
      directory = directory.parentDirectory;
    }

    return currentPath;
  }

  getCurrentDirectory() {
    return this._currentDirectoryInfo;
  }

  setCurrentDirectory(directoryInfo, checkActuality) {
    if (!directoryInfo) {
      return;
    }

    if (checkActuality) {
      directoryInfo = this._getActualDirectoryInfo(directoryInfo);
    }

    if (this._currentDirectoryInfo && this._currentDirectoryInfo === directoryInfo) {
      return;
    }

    var requireRaiseSelectedDirectory = this._currentDirectoryInfo.fileItem.key !== directoryInfo.fileItem.key;
    this._currentDirectoryInfo = directoryInfo;

    if (requireRaiseSelectedDirectory && this._isInitialized) {
      if (!this._dataLoading) {
        this._raiseDataLoading('navigation');
      }

      this._raiseSelectedDirectoryChanged(directoryInfo);
    }
  }

  _resetCurrentDirectory() {
    this._currentDirectoryInfo = this._rootDirectoryInfo;
  }

  getCurrentItems(onlyFiles) {
    return this._dataLoadingDeferred ? this._dataLoadingDeferred.then(() => this._getCurrentItemsInternal(onlyFiles)) : this._getCurrentItemsInternal(onlyFiles);
  }

  _getCurrentItemsInternal(onlyFiles) {
    var currentDirectory = this.getCurrentDirectory();
    var getItemsPromise = this.getDirectoryContents(currentDirectory);
    return getItemsPromise.then(items => {
      var separatedItems = this._separateItemsByType(items);

      currentDirectory.fileItem.hasSubDirectories = !!separatedItems.folders.length;
      return onlyFiles ? separatedItems.files : items;
    });
  }

  getDirectories(parentDirectoryInfo, skipNavigationOnError) {
    return this.getDirectoryContents(parentDirectoryInfo, skipNavigationOnError).then(itemInfos => itemInfos.filter(info => info.fileItem.isDirectory));
  }

  _separateItemsByType(itemInfos) {
    var folders = [];
    var files = [];
    itemInfos.forEach(info => info.fileItem.isDirectory ? folders.push(info) : files.push(info));
    return {
      folders,
      files
    };
  }

  getDirectoryContents(parentDirectoryInfo, skipNavigationOnError) {
    if (!parentDirectoryInfo) {
      return new Deferred().resolve([this._rootDirectoryInfo]).promise();
    }

    if (parentDirectoryInfo.itemsLoaded) {
      return new Deferred().resolve(parentDirectoryInfo.items).promise();
    }

    var dirKey = parentDirectoryInfo.getInternalKey();
    var loadItemsDeferred = this._loadedItems[dirKey];

    if (loadItemsDeferred) {
      return loadItemsDeferred;
    }

    loadItemsDeferred = this._getFileItems(parentDirectoryInfo, skipNavigationOnError).then(fileItems => {
      fileItems = fileItems || [];
      parentDirectoryInfo.items = fileItems.map(fileItem => fileItem.isDirectory && this._createDirectoryInfo(fileItem, parentDirectoryInfo) || this._createFileInfo(fileItem, parentDirectoryInfo));
      parentDirectoryInfo.itemsLoaded = true;
      return parentDirectoryInfo.items;
    });
    this._loadedItems[dirKey] = loadItemsDeferred;
    loadItemsDeferred.always(() => {
      delete this._loadedItems[dirKey];
    });
    return loadItemsDeferred;
  }

  _getFileItems(parentDirectoryInfo, skipNavigationOnError) {
    var loadItemsDeferred = null;

    try {
      loadItemsDeferred = this._fileProvider.getItems(parentDirectoryInfo.fileItem);
    } catch (error) {
      return this._handleItemLoadError(parentDirectoryInfo, error, skipNavigationOnError);
    }

    return when(loadItemsDeferred).then(fileItems => this._securityController.getAllowedItems(fileItems), errorInfo => this._handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError));
  }

  createDirectory(parentDirectoryInfo, name) {
    var tempDirInfo = this._createDirInfoByName(name, parentDirectoryInfo);

    var actionInfo = this._createEditActionInfo('create', tempDirInfo, parentDirectoryInfo);

    return this._processEditAction(actionInfo, () => this._fileProvider.createDirectory(parentDirectoryInfo.fileItem, name).done(info => {
      if (!parentDirectoryInfo.fileItem.isRoot()) {
        parentDirectoryInfo.fileItem.hasSubDirectories = true;
      }

      return info;
    }), () => this._resetDirectoryState(parentDirectoryInfo, true));
  }

  renameItem(fileItemInfo, name) {
    var actionInfo = this._createEditActionInfo('rename', fileItemInfo, fileItemInfo.parentDirectory, {
      itemNewName: name
    });

    return this._processEditAction(actionInfo, () => {
      if (!fileItemInfo.fileItem.isDirectory) {
        this._securityController.validateExtension(name);
      }

      return this._fileProvider.renameItem(fileItemInfo.fileItem, name);
    }, () => {
      var parentDirectory = this._getActualDirectoryInfo(fileItemInfo.parentDirectory);

      this._resetDirectoryState(parentDirectory);

      this.setCurrentDirectory(parentDirectory);
    });
  }

  moveItems(itemInfos, destinationDirectory) {
    var items = itemInfos.map(i => i.fileItem);

    var actionInfo = this._createEditActionInfo('move', itemInfos, destinationDirectory);

    return this._processEditAction(actionInfo, () => this._fileProvider.moveItems(items, destinationDirectory.fileItem), () => {
      destinationDirectory = this._getActualDirectoryInfo(destinationDirectory);
      itemInfos.forEach(itemInfo => this._resetDirectoryState(itemInfo.parentDirectory, true));

      this._resetDirectoryState(destinationDirectory);

      this.setCurrentDirectory(destinationDirectory);
      destinationDirectory.expanded = true;
    });
  }

  copyItems(itemInfos, destinationDirectory) {
    var items = itemInfos.map(i => i.fileItem);

    var actionInfo = this._createEditActionInfo('copy', itemInfos, destinationDirectory);

    return this._processEditAction(actionInfo, () => this._fileProvider.copyItems(items, destinationDirectory.fileItem), () => {
      destinationDirectory = this._getActualDirectoryInfo(destinationDirectory);

      this._resetDirectoryState(destinationDirectory);

      this.setCurrentDirectory(destinationDirectory);
      destinationDirectory.expanded = true;
    });
  }

  deleteItems(itemInfos) {
    var items = itemInfos.map(i => i.fileItem);
    var directory = itemInfos.length > 0 ? itemInfos[0].parentDirectory : null;

    var actionInfo = this._createEditActionInfo('delete', itemInfos, directory);

    return this._processEditAction(actionInfo, () => this._fileProvider.deleteItems(items), () => {
      itemInfos.forEach(itemInfo => {
        var parentDir = this._getActualDirectoryInfo(itemInfo.parentDirectory);

        this._resetDirectoryState(parentDir);

        this.setCurrentDirectory(parentDir);
      });
    });
  }

  processUploadSession(sessionInfo, uploadDirectoryInfo) {
    var itemInfos = this._getItemInfosForUploaderFiles(sessionInfo.files, uploadDirectoryInfo);

    var actionInfo = this._createEditActionInfo('upload', itemInfos, uploadDirectoryInfo, {
      sessionInfo
    });

    return this._processEditAction(actionInfo, () => sessionInfo.deferreds, () => this._resetDirectoryState(uploadDirectoryInfo, true));
  }

  uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    this._securityController.validateMaxFileSize(fileData.size);

    this._securityController.validateExtension(fileData.name);

    return when(this._fileProvider.uploadFileChunk(fileData, chunksInfo, destinationDirectory));
  }

  abortFileUpload(fileData, chunksInfo, destinationDirectory) {
    return when(this._fileProvider.abortFileUpload(fileData, chunksInfo, destinationDirectory));
  }

  getFileUploadChunkSize() {
    var chunkSize = this._options.uploadChunkSize;

    if (chunkSize && chunkSize > 0) {
      return chunkSize;
    }

    return this._fileProvider.getFileUploadChunkSize();
  }

  downloadItems(itemInfos) {
    var items = itemInfos.map(i => i.fileItem);

    this._fileProvider.downloadItems(items);
  }

  getItemContent(itemInfos) {
    var items = itemInfos.map(i => i.fileItem);
    return when(this._fileProvider.getItemsContent(items));
  }

  _handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError) {
    parentDirectoryInfo = this._getActualDirectoryInfo(parentDirectoryInfo);

    var actionInfo = this._createEditActionInfo('getItems', parentDirectoryInfo, parentDirectoryInfo);

    this._raiseEditActionStarting(actionInfo);

    this._raiseEditActionResultAcquired(actionInfo);

    this._raiseEditActionError(actionInfo, {
      errorCode: errorInfo.errorCode,
      errorText: errorInfo.errorText,
      fileItem: parentDirectoryInfo.fileItem,
      index: 0
    });

    this._resetDirectoryState(parentDirectoryInfo);

    parentDirectoryInfo.expanded = false;

    if (!skipNavigationOnError) {
      this.setCurrentDirectory(parentDirectoryInfo.parentDirectory);
    }

    return new Deferred().reject().promise();
  }

  _processEditAction(actionInfo, action, completeAction) {
    var actionResult = null;

    this._raiseEditActionStarting(actionInfo);

    try {
      actionResult = action();
    } catch (errorInfo) {
      this._raiseEditActionError(actionInfo, errorInfo);

      return new Deferred().reject().promise();
    }

    if (!Array.isArray(actionResult)) {
      actionResult = [actionResult];
    } else if (actionResult.length > 1) {
      actionInfo.singleRequest = false;
    }

    this._raiseEditActionResultAcquired(actionInfo);

    return whenSome(actionResult, info => this._raiseCompleteEditActionItem(actionInfo, info), errorInfo => this._raiseEditActionItemError(actionInfo, errorInfo)).then(() => {
      completeAction();

      this._raiseCompleteEditAction(actionInfo);
    });
  }

  _createEditActionInfo(name, targetItemInfos, directory, customData) {
    targetItemInfos = Array.isArray(targetItemInfos) ? targetItemInfos : [targetItemInfos];
    customData = customData || {};
    var items = targetItemInfos.map(itemInfo => itemInfo.fileItem);
    return {
      name,
      itemInfos: targetItemInfos,
      items,
      directory,
      customData,
      singleRequest: true
    };
  }

  _getItemInfosForUploaderFiles(files, parentDirectoryInfo) {
    var pathInfo = this._getPathInfo(parentDirectoryInfo);

    var result = [];

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var item = new FileSystemItem(pathInfo, file.name, false);

      var itemInfo = this._createFileInfo(item, parentDirectoryInfo);

      result.push(itemInfo);
    }

    return result;
  }

  refresh() {
    if (this._lockRefresh) {
      return this._refreshDeferred;
    }

    this._lockRefresh = true;
    return this._executeDataLoad(() => {
      return this._refreshDeferred = this._refreshInternal();
    }, 'refresh');
  }

  _refreshInternal() {
    var cachedRootInfo = {
      items: this._rootDirectoryInfo.items
    };

    var selectedKeyParts = this._getDirectoryPathKeyParts(this.getCurrentDirectory());

    this._resetDirectoryState(this._rootDirectoryInfo);

    return this._loadItemsRecursive(this._rootDirectoryInfo, cachedRootInfo).then(() => {
      var dirInfo = this._findDirectoryByPathKeyParts(selectedKeyParts);

      this.setCurrentDirectory(dirInfo);
      delete this._lockRefresh;
    });
  }

  _loadItemsRecursive(directoryInfo, cachedDirectoryInfo) {
    var _this = this;

    return this.getDirectories(directoryInfo).then(dirInfos => {
      var itemDeferreds = [];

      var _loop = function _loop(i) {
        var cachedItem = find(cachedDirectoryInfo.items, cache => dirInfos[i].fileItem.key === cache.fileItem.key);
        if (!cachedItem) return "continue";
        dirInfos[i].expanded = cachedItem.expanded;

        if (dirInfos[i].expanded) {
          itemDeferreds.push(_this._loadItemsRecursive(dirInfos[i], cachedItem));
        }
      };

      for (var i = 0; i < dirInfos.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }

      return whenSome(itemDeferreds);
    }, () => null);
  }

  _initialize() {
    var result = this._options.currentPathKeys && this._options.currentPathKeys.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);

    var completeInitialization = () => {
      this._isInitialized = true;

      this._raiseInitialized();
    };

    if (result) {
      when(result).always(completeInitialization);
    } else {
      completeInitialization();
    }
  }

  _setCurrentDirectoryByPathParts(pathParts, useKeys) {
    return this._executeDataLoad(() => this._setCurrentDirectoryByPathPartsInternal(pathParts, useKeys), 'navigation');
  }

  _setCurrentDirectoryByPathPartsInternal(pathParts, useKeys) {
    return this._getDirectoryByPathParts(this._rootDirectoryInfo, pathParts, useKeys).then(directoryInfo => {
      for (var info = directoryInfo.parentDirectory; info; info = info.parentDirectory) {
        info.expanded = true;
      }

      this.setCurrentDirectory(directoryInfo);
    });
  }

  _executeDataLoad(action, operation) {
    if (this._dataLoadingDeferred) {
      return this._dataLoadingDeferred.then(() => this._executeDataLoad(action, operation));
    }

    this._dataLoading = true;
    this._dataLoadingDeferred = new Deferred();

    if (this._isInitialized) {
      this._raiseDataLoading(operation);
    }

    return action().always(() => {
      var tempDeferred = this._dataLoadingDeferred;
      this._dataLoadingDeferred = null;
      this._dataLoading = false;
      tempDeferred.resolve();
    });
  }

  _getDirectoryByPathParts(parentDirectoryInfo, pathParts, useKeys) {
    if (pathParts.length < 1) {
      return new Deferred().resolve(parentDirectoryInfo).promise();
    }

    var fieldName = useKeys ? 'key' : 'name';
    return this.getDirectories(parentDirectoryInfo).then(dirInfos => {
      var subDirInfo = find(dirInfos, d => d.fileItem[fieldName] === pathParts[0]);

      if (!subDirInfo) {
        return new Deferred().reject().promise();
      }

      var restPathParts = [...pathParts].splice(1);
      return this._getDirectoryByPathParts(subDirInfo, restPathParts, useKeys);
    });
  }

  _getDirectoryPathKeyParts(directoryInfo) {
    var pathParts = [];

    while (directoryInfo && directoryInfo.parentDirectory) {
      pathParts.unshift(directoryInfo.fileItem.key);
      directoryInfo = directoryInfo.parentDirectory;
    }

    return pathParts;
  }

  _findDirectoryByPathKeyParts(keyParts) {
    var selectedDirInfo = this._rootDirectoryInfo;

    if (keyParts.length === 0) {
      return selectedDirInfo;
    }

    var i = 0;
    var newSelectedDir = selectedDirInfo;

    while (newSelectedDir && i < keyParts.length) {
      newSelectedDir = find(selectedDirInfo.items, info => info.fileItem.key === keyParts[i]);

      if (newSelectedDir) {
        selectedDirInfo = newSelectedDir;
      }

      i++;
    }

    return selectedDirInfo;
  }

  _getActualDirectoryInfo(directoryInfo) {
    var keys = this._getDirectoryPathKeyParts(directoryInfo);

    return this._findDirectoryByPathKeyParts(keys);
  }

  _createDirInfoByName(name, parentDirectoryInfo) {
    var dirPathInfo = this._getPathInfo(parentDirectoryInfo);

    var fileItem = new FileSystemItem(dirPathInfo, name, true);
    return this._createDirectoryInfo(fileItem, parentDirectoryInfo);
  }

  _createDirectoryInfo(fileItem, parentDirectoryInfo) {
    return extend(this._createFileInfo(fileItem, parentDirectoryInfo), {
      icon: 'folder',
      expanded: fileItem.isRoot(),
      items: []
    });
  }

  _createFileInfo(fileItem, parentDirectoryInfo) {
    return {
      fileItem,
      parentDirectory: parentDirectoryInfo,
      icon: this._getFileItemDefaultIcon(fileItem),

      getInternalKey() {
        return "FIK_".concat(this.fileItem.key);
      },

      getDisplayName() {
        return this.displayName || this.fileItem.name;
      }

    };
  }

  _resetDirectoryState(directoryInfo, isActualDirectoryRequired) {
    if (isActualDirectoryRequired) {
      directoryInfo = this._getActualDirectoryInfo(directoryInfo);
    }

    directoryInfo.itemsLoaded = false;
    directoryInfo.items = [];
  }

  _getFileItemDefaultIcon(fileItem) {
    if (fileItem.isDirectory) {
      return 'folder';
    }

    var extension = fileItem.getFileExtension();
    var icon = this._defaultIconMap[extension];
    return icon || 'doc';
  }

  _createDefaultIconMap() {
    var result = {
      '.txt': 'txtfile',
      '.rtf': 'rtffile',
      '.doc': 'docfile',
      '.docx': 'docxfile',
      '.xls': 'xlsfile',
      '.xlsx': 'xlsxfile',
      '.ppt': 'pptfile',
      '.pptx': 'pptxfile',
      '.pdf': 'pdffile'
    };
    ['.png', '.gif', '.jpg', '.jpeg', '.ico', '.bmp'].forEach(extension => {
      result[extension] = 'image';
    });
    return result;
  }

  _createRootDirectoryInfo(text) {
    var rootDirectory = new FileSystemItem(null, '', true);

    var result = this._createDirectoryInfo(rootDirectory, null);

    result.displayName = text || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
    return result;
  }

  setRootText(rootText) {
    this._rootDirectoryInfo.displayName = rootText || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
  }

  _raiseInitialized() {
    var e = {
      controller: this
    };

    if (this._options.onInitialized) {
      this._options.onInitialized(e);
    }
  }

  _raiseDataLoading(operation) {
    if (this._options.onDataLoading) {
      this._options.onDataLoading({
        operation
      });
    }
  }

  _raiseSelectedDirectoryChanged(directoryInfo) {
    var e = {
      selectedDirectoryInfo: directoryInfo
    };

    if (this._options.onSelectedDirectoryChanged) {
      this._options.onSelectedDirectoryChanged(e);
    }
  }

  _raiseEditActionStarting(actionInfo) {
    if (this._options.onEditActionStarting) {
      this._options.onEditActionStarting(actionInfo);
    }
  }

  _raiseEditActionResultAcquired(actionInfo) {
    if (this._options.onEditActionResultAcquired) {
      this._options.onEditActionResultAcquired(actionInfo);
    }
  }

  _raiseEditActionError(actionInfo, errorInfo) {
    if (this._options.onEditActionError) {
      this._options.onEditActionError(actionInfo, errorInfo);
    }
  }

  _raiseEditActionItemError(actionInfo, errorInfo) {
    if (this._options.onEditActionItemError) {
      this._options.onEditActionItemError(actionInfo, errorInfo);
    }
  }

  _raiseCompleteEditActionItem(actionInfo, info) {
    if (this._options.onCompleteEditActionItem) {
      this._options.onCompleteEditActionItem(actionInfo, info);
    }
  }

  _raiseCompleteEditAction(actionInfo) {
    if (this._options.onCompleteEditAction) {
      this._options.onCompleteEditAction(actionInfo);
    }
  }

  _resetState() {
    this._selectedDirectory = null;
    this._rootDirectoryInfo.items = [];
    this._loadedItems = {};
  }

  _getPathInfo(directoryInfo) {
    var pathInfo = [];

    for (var dirInfo = directoryInfo; dirInfo && !dirInfo.fileItem.isRoot(); dirInfo = dirInfo.parentDirectory) {
      pathInfo.unshift({
        key: dirInfo.fileItem.key,
        name: dirInfo.fileItem.name
      });
    }

    return pathInfo;
  }

  on(eventName, eventHandler) {
    var finalEventName = "on".concat(eventName);
    this._options[finalEventName] = eventHandler;
  }

}

class FileSecurityController {
  constructor(options) {
    var defaultOptions = {
      allowedFileExtensions: [],
      maxFileSize: 0
    };
    this._options = extend(defaultOptions, options);
    this._extensionsMap = {};

    this._allowedFileExtensions.forEach(extension => {
      this._extensionsMap[extension.toUpperCase()] = true;
    });
  }

  getAllowedItems(items) {
    if (this._allowedFileExtensions.length === 0) {
      return items;
    }

    return items.filter(item => item.isDirectory || this._isValidExtension(item.name));
  }

  validateExtension(name) {
    if (!this._isValidExtension(name)) {
      throw new FileSystemError(ErrorCode.WrongFileExtension, null);
    }
  }

  validateMaxFileSize(size) {
    if (this._maxFileSize && size > this._maxFileSize) {
      throw new FileSystemError(ErrorCode.MaxFileSizeExceeded, null);
    }
  }

  _isValidExtension(name) {
    if (this._allowedFileExtensions.length === 0) {
      return true;
    }

    var extension = getFileExtension(name).toUpperCase();
    return this._extensionsMap[extension];
  }

  get _allowedFileExtensions() {
    return this._options.allowedFileExtensions;
  }

  get _maxFileSize() {
    return this._options.maxFileSize;
  }

}