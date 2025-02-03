class XExt {
    getInfo() {
      return {
        id: 'IndexedDBExtension',
        name: '晓晓的IndexedDB存储',
        color1: '#34495e',
        blocks: [
          {
            opcode: 'createDatabase',
            blockType: Scratch.BlockType.COMMAND,
            text: '创建数据库 [dbName]',
            arguments: {
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'storeData',
            blockType: Scratch.BlockType.COMMAND,
            text: '存储数据 [key] 为 [value] 到数据库 [dbName]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultValue',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'retrieveData',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取数据库 [dbName] 中的 [key] 数据',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'updateData',
            blockType: Scratch.BlockType.COMMAND,
            text: '更新数据库 [dbName] 中的 [key] 为 [value]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultValue',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'deleteData',
            blockType: Scratch.BlockType.COMMAND,
            text: '删除数据库 [dbName] 中的 [key]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'deleteDatabase',
            blockType: Scratch.BlockType.COMMAND,
            text: '删除数据库 [dbName]',
            arguments: {
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'getAllData',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取数据库 [dbName] 中的所有数据',
            arguments: {
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'uploadFile',
            blockType: Scratch.BlockType.COMMAND,
            text: '上传文件 [file] 到数据库 [dbName]',
            arguments: {
              file: {
                type: Scratch.ArgumentType.STRING,  // 将其修改为STRING类型，确保能够传递文件名等数据
                defaultValue: 'file',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'retrieveFile',
            blockType: Scratch.BlockType.REPORTER,
            text: '从数据库 [dbName] 获取文件 [fileKey]',
            arguments: {
              fileKey: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultFileKey',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'deleteFile',
            blockType: Scratch.BlockType.COMMAND,
            text: '删除文件 [fileKey] 从数据库 [dbName]',
            arguments: {
              fileKey: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultFileKey',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'updateFile',
            blockType: Scratch.BlockType.COMMAND,
            text: '更新文件 [fileKey] 为 [newFile] 到数据库 [dbName]',
            arguments: {
              fileKey: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultFileKey',
              },
              newFile: {
                type: Scratch.ArgumentType.STRING,  // 将其修改为STRING类型
                defaultValue: 'newFile',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
        ],
      };
    }
  
    // 创建数据库
    createDatabase(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('dataStore')) {
          db.createObjectStore('dataStore');
        }
        if (!db.objectStoreNames.contains('fileStore')) {
          db.createObjectStore('fileStore');
        }
      };
  
      request.onsuccess = function() {
        console.log('数据库创建成功');
      };
  
      request.onerror = function(event) {
        console.error('创建数据库失败:', event);
      };
    }
  
    // 存储数据
    storeData(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('dataStore')) {
          db.createObjectStore('dataStore');
        }
      };
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['dataStore'], 'readwrite');
        const store = transaction.objectStore('dataStore');
        store.put(args.value, args.key);
      };
  
      request.onerror = function(event) {
        console.error('存储数据失败:', event);
      };
    }
  
    // 获取数据
    retrieveData(args) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(args.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction(['dataStore'], 'readonly');
          const store = transaction.objectStore('dataStore');
          const requestData = store.get(args.key);
  
          requestData.onsuccess = function() {
            resolve(requestData.result || 'None');
          };
  
          requestData.onerror = function() {
            reject('获取数据失败');
          };
        };
      });
    }
  
    // 更新数据
    updateData(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['dataStore'], 'readwrite');
        const store = transaction.objectStore('dataStore');
        store.put(args.value, args.key);
      };
  
      request.onerror = function(event) {
        console.error('更新数据失败:', event);
      };
    }
  
    // 删除数据
    deleteData(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['dataStore'], 'readwrite');
        const store = transaction.objectStore('dataStore');
        store.delete(args.key);
      };
  
      request.onerror = function(event) {
        console.error('删除数据失败:', event);
      };
    }
  
    // 删除数据库
    deleteDatabase(args) {
      const request = indexedDB.deleteDatabase(args.dbName);
  
      request.onsuccess = function() {
        console.log('数据库删除成功');
      };
  
      request.onerror = function(event) {
        console.error('删除数据库失败:', event);
      };
    }
  
    // 获取所有数据
    getAllData(args) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(args.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction(['dataStore'], 'readonly');
          const store = transaction.objectStore('dataStore');
          let allData = [];
  
          store.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
              allData.push({ key: cursor.key, value: cursor.value });
              cursor.continue();
            } else {
              resolve(JSON.stringify(allData));
            }
          };
  
          store.openCursor().onerror = function(event) {
            reject('获取所有数据失败');
          };
        };
      });
    }
  
    // 上传文件到数据库
    uploadFile(args) {
      const file = args.file;
      const fileKey = file;  // 这里直接使用文件名作为键
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const fileData = event.target.result;
  
        const request = indexedDB.open(args.dbName, 1);
  
        request.onupgradeneeded = function(event) {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('fileStore')) {
            db.createObjectStore('fileStore');
          }
        };
  
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['fileStore'], 'readwrite');
            const store = transaction.objectStore('fileStore');
            store.put(fileData, fileKey);  // 将文件内容存储到数据库中，键为 fileKey
    
            transaction.oncomplete = function() {
              console.log('文件上传成功');
            };
    
            transaction.onerror = function(event) {
              console.error('文件上传失败:', event);
            };
          };
    
          request.onerror = function(event) {
            console.error('打开数据库失败:', event);
          };
        };
    
        reader.onerror = function(event) {
          console.error('文件读取失败:', event);
        };
    
        // 读取文件
        reader.readAsArrayBuffer(file);  // 假设文件是二进制文件，如果是文本文件可以使用 reader.readAsText(file);
      }
    
      // 从数据库获取文件
      retrieveFile(args) {
        return new Promise((resolve, reject) => {
          const request = indexedDB.open(args.dbName, 1);
    
          request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['fileStore'], 'readonly');
            const store = transaction.objectStore('fileStore');
            const requestData = store.get(args.fileKey);
    
            requestData.onsuccess = function() {
              resolve(requestData.result || '没有找到文件');
            };
    
            requestData.onerror = function() {
              reject('获取文件失败');
            };
          };
        });
      }
    
      // 删除文件
      deleteFile(args) {
        const request = indexedDB.open(args.dbName, 1);
    
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction(['fileStore'], 'readwrite');
          const store = transaction.objectStore('fileStore');
          store.delete(args.fileKey);
        };
    
        request.onerror = function(event) {
          console.error('删除文件失败:', event);
        };
      }
    
      // 更新文件
      updateFile(args) {
        const file = args.newFile;
        const fileKey = args.fileKey;
        const reader = new FileReader();
    
        reader.onload = function(event) {
          const fileData = event.target.result;
    
          const request = indexedDB.open(args.dbName, 1);
    
          request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['fileStore'], 'readwrite');
            const store = transaction.objectStore('fileStore');
            store.put(fileData, fileKey);  // 更新文件内容
    
            transaction.oncomplete = function() {
              console.log('文件更新成功');
            };
    
            transaction.onerror = function(event) {
              console.error('文件更新失败:', event);
            };
          };
    
          request.onerror = function(event) {
            console.error('打开数据库失败:', event);
          };
        };
    
        reader.onerror = function(event) {
          console.error('文件读取失败:', event);
        };
    
        reader.readAsArrayBuffer(file);  // 假设是二进制文件，若是文本文件可以使用 reader.readAsText(file);
      }
    }
    
    Scratch.extensions.register(new XExt());
    